import styles from "./DeleteConfirmationModal.module.css";

interface DeleteConfirmationModalProps {
  carName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  carName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Delete Car</h2>
        <p className={styles.message}>
          Are you sure you want to delete <strong>{carName}</strong>? This action cannot be undone.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;