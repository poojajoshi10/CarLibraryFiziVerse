import { useEffect, useState } from "react";
import CarCard from "./components/CarCard";
import CarDetailsModal from "./components/CarDetailsModal";
import FilterModal from "./components/FilterModal";
import CreateCarModal from "./components/CreateCarModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { Car } from "./types";
import { getCars, deleteCar } from "./api/carsApi";
import styles from "./App.module.css";
import LogoIcon from "./assets/logo.svg";

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ carType?: string; tags?: string }>({});
  const [sort, setSort] = useState<{ sortBy?: string; sortOrder?: "ASC" | "DESC" }>({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars(
          search,
          filters.carType,
          filters.tags,
          sort.sortBy,
          sort.sortOrder
        );
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [search, filters, sort]);

  const handleCarClick = (carId: string) => {
    setSelectedCarId(carId);
  };

  const handleCloseModal = () => {
    setSelectedCarId(null);
  };

  const handleApplyFilters = (newFilters: { carType?: string; tags?: string }) => {
    setFilters(newFilters);
  };

  const handleSortSelect = (sortBy: string, sortOrder: "ASC" | "DESC") => {
    setSort({ sortBy, sortOrder });
    setShowSortDropdown(false);
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      await deleteCar(carId);
      setCars((prev) => prev.filter((car) => car.id !== carId));
      setShowDeleteModal(null);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleCreateSuccess = async () => {
    const data = await getCars(
      search,
      filters.carType,
      filters.tags,
      sort.sortBy,
      sort.sortOrder
    );
    setCars(data);
  };

  return (
    <div className={styles.app}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={LogoIcon} alt="DriveSphere Logo" className={styles.logoIcon} />
          <h1>DriveSphere</h1>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>
            Home
          </a>
          <a href="#" className={`${styles.navLink} ${styles.active}`}>
            Car Library
          </a>
          <a href="#" className={styles.navLink}>
            Services
          </a>
          <a href="#" className={styles.navLink}>
            Special Offers
          </a>
          <a href="#" className={styles.navLink}>
            Recycle Bin
          </a>
        </div>
        <button className={styles.contactButton}>Contact Us</button>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <svg
              className={styles.searchIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search a car"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.actionButtons}>
            <button
              className={styles.filterButton}
              onClick={() => setShowFilterModal(true)}
            >
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
            <div className={styles.sortWrapper}>
              <button
                className={styles.sortButton}
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <svg
                  className={styles.icon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h18M3 8h18M3 12h18"
                  />
                </svg>
                Sort
              </button>
              {showSortDropdown && (
                <div className={styles.sortDropdown}>
                  <button
                    className={styles.sortOption}
                    onClick={() => handleSortSelect("name", "ASC")}
                  >
                    Car Name (A-Z)
                  </button>
                  <button
                    className={styles.sortOption}
                    onClick={() => handleSortSelect("name", "DESC")}
                  >
                    Car Name (Z-A)
                  </button>
                  <button
                    className={styles.sortOption}
                    onClick={() => handleSortSelect("createdAt", "DESC")}
                  >
                    Creation Date (Newest First)
                  </button>
                  <button
                    className={styles.sortOption}
                    onClick={() => handleSortSelect("createdAt", "ASC")}
                  >
                    Creation Date (Oldest First)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Exercise Cards</h2>

        {loading ? (
          <div className={styles.loading}>
            <p>Loading cars...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => handleCarClick(car.id)}
                onDelete={(carId) => setShowDeleteModal(carId)}
              />
            ))}
          </div>
        )}

        <button
          className={styles.addButton}
          onClick={() => setShowCreateModal(true)}
        >
          <svg
            className={styles.addIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Car
        </button>
      </div>

      <CarDetailsModal carId={selectedCarId} onClose={handleCloseModal} />
      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilters}
        />
      )}
      {showCreateModal && (
        <CreateCarModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          carName={cars.find((car) => car.id === showDeleteModal)?.name || ""}
          onConfirm={() => handleDeleteCar(showDeleteModal)}
          onCancel={() => setShowDeleteModal(null)}
        />
      )}
    </div>
  );
};

export default App;