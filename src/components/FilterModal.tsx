import { useEffect, useState } from "react";
import { getCarTypes, getTags } from "../api/carsApi";
import styles from "./FilterModal.module.css";

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: { carType?: string; tags?: string }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose, onApply }) => {
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCarType, setSelectedCarType] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const types = await getCarTypes();
        const tagsData = await getTags();
        setCarTypes(types);
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleApply = () => {
    onApply({
      carType: selectedCarType,
      tags: selectedTags.join(","),
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCarType("");
    setSelectedTags([]);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Filter By</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <svg
              className={styles.closeIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Car Type</h3>
          <div className={styles.options}>
            {carTypes.map((type) => (
              <button
                key={type}
                className={`${styles.option} ${
                  selectedCarType === type ? styles.selected : ""
                }`}
                onClick={() => setSelectedCarType(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Tags</h3>
          <div className={styles.options}>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`${styles.option} ${
                  selectedTags.includes(tag) ? styles.selected : ""
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.clearButton} onClick={handleClear}>
            Clear
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;