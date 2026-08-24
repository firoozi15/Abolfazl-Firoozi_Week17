import { useState } from "react";
import styles from "./ConfirmModal.module.css";
import warningIcon from "../assets/icons/warning.svg";

function ConfirmModal({ confirmFunction, message, closeModal }) {
  const [isClosing, setisClosing] = useState(false);
  return (
    <div
      onAnimationEnd={() => {
        isClosing && closeModal();
      }}
      className={`${styles.confirmModal} ${isClosing && styles.hide}`}
    >
      <div className={styles.form}>
        <div className={styles.formMain}>
          <img width="25%" src={warningIcon} alt="warningIcon" />
          <h2>{message}</h2>
          <div className={styles.modalButtons}>
            <button
              onClick={() => setisClosing(true)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmFunction();
                setisClosing(true);
              }}
              className={styles.confirmButton}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
