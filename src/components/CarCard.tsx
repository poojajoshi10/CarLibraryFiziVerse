import { Car } from "../types";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
  onClick: () => void;
  onDelete: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick, onDelete }) => {
  return (
    <div className={styles.card}>
      <img
        src={car.imageUrl || "https://via.placeholder.com/150"}
        alt={car.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title} onClick={onClick}>
          {car.name}
        </h3>
        <p className={styles.description}>{car.description}</p>
        <div className={styles.tags}>
          {car.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(car.id)}
        >
          <svg
            className={styles.deleteIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M9 7v12m6-12v12M3 7h18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarCard;