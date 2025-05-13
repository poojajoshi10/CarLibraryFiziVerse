import { useEffect, useState } from "react";
import { getCarTypes, getTags, createCar } from "../api/carsApi";
import styles from "./CreateCarModal.module.css";

interface CreateCarModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCarModal: React.FC<CreateCarModalProps> = ({ onClose, onSuccess }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const types = await getCarTypes();
        const tagsData = await getTags();
        setCarTypes(types);
        setAvailableTags(tagsData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!name) newErrors.name = "Name is required";
    if (name.length > 50) newErrors.name = "Name must be 50 characters or less";
    if (description.length > 200)
      newErrors.description = "Description must be 200 characters or less";
    if (!carType) newErrors.carType = "Car type is required";
    if (!["automatic", "manual"].includes(carType.toLowerCase()))
      newErrors.carType = "Car type must be 'automatic' or 'manual'";
    if (tags.length === 0) newErrors.tags = "At least one tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagToggle = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await createCar({
        imageUrl,
        name,
        description,
        carType,
        tags,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating car:", error);
      setErrors({ submit: "Failed to create car. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Car</h2>
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
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={styles.input}
              placeholder="Enter image URL"
            />
            {errors.imageUrl && <p className={styles.error}>{errors.imageUrl}</p>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Enter car name"
              maxLength={50}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              placeholder="Enter description (optional)"
              maxLength={200}
            />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Car Type</label>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className={styles.select}
            >
              <option value="">Select car type</option>
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.carType && <p className={styles.error}>{errors.carType}</p>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tags</label>
            <div className={styles.tags}>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tag} ${
                    tags.includes(tag) ? styles.selected : ""
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {errors.tags && <p className={styles.error}>{errors.tags}</p>}
          </div>
          {errors.submit && <p className={styles.error}>{errors.submit}</p>}
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.submitButton}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Car"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCarModal;