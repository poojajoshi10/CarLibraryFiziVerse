import { useEffect, useState } from "react";
import { Car } from "../types";
import { getCarById } from "../api/carsApi";
import styles from "./CarDetailsModal.module.css";

interface CarDetailsModalProps {
  carId: string | null;
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ carId, onClose }) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (carId) {
      const fetchCarDetails = async () => {
        try {
          setLoading(true);
          const data = await getCarById(carId);
          setCar(data);
        } catch (error) {
          console.error("Error fetching car details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCarDetails();
    }
  }, [carId]);

  if (!carId || !car) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
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
        <h2 className={styles.title}>{car.name}</h2>
        <img
          src={car.imageUrl || "https://via.placeholder.com/400x200"}
          alt={car.name}
          className={styles.image}
        />
        <span
          className={`${styles.transmissionTag} ${
            car.carType.toLowerCase() === "automatic"
              ? styles.automatic
              : styles.manual
          }`}
        >
          {car.carType.toUpperCase()}
        </span>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Description</h3>
          <p className={styles.description}>{car.description}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Specifications</h3>
          <div className={styles.specs}>
            {car.engine && (
              <span className={styles.spec}>Engine: {car.engine}</span>
            )}
            {car.displacement && (
              <span className={styles.spec}>Displacement: {car.displacement}</span>
            )}
            {car.fuelType && (
              <span className={styles.spec}>Fuel Type: {car.fuelType}</span>
            )}
            {car.mileage && (
              <span className={styles.spec}>Mileage (ARAI): {car.mileage}</span>
            )}
            {car.topSpeed && (
              <span className={styles.spec}>Top Speed: {car.topSpeed}</span>
            )}
            {car.maxPower && (
              <span className={styles.spec}>Max Power: {car.maxPower}</span>
            )}
            {car.emissionStandard && (
              <span className={styles.spec}>Emission Standard: {car.emissionStandard}</span>
            )}
          </div>
        </div>
        <p className={styles.lastUpdated}>
          Last Updated: {new Date(car.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CarDetailsModal;