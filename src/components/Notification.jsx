import styles from "./Notification.module.css";
import successIcon from "../assets/icons/success.svg";
import errorIcon from "../assets/icons/error.svg";
import infoIcon from "../assets/icons/info.svg";
import warningIcon from "../assets/icons/warning.svg";

import { useContext } from "react";
import { ContactsContext } from "../context/ContactsContext.jsx";

function Notification() {
  const {
    showNotification,
    notificationMessage: title,
    notificationType: type,
    setShowNotification,
  } = useContext(ContactsContext);

  const icons = {
    success: successIcon,
    error: errorIcon,
    info: infoIcon,
    warning: warningIcon,
  };

  if (!showNotification) return null;

  return (
    <div
      className={`${styles.notification} ${styles[type]}`}
      onAnimationEnd={() => setShowNotification(false)}
    >
      <div className={styles.icon}>
        <img src={icons[type]} alt="icon" />
      </div>
      <div className={styles.text}>
        <h5>{title}</h5>
      </div>
    </div>
  );
}

export default Notification;
