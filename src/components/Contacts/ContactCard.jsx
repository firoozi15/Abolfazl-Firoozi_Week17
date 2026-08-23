import { useState } from "react";

import styles from "./ContactCard.module.css";
import ConfirmModal from "../ConfirmModal";

import { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext.jsx";

function ContactCard({
  contact,
  selectContactForEdit,
  addContactListForDelete,
  selectedContacts,
}) {
  const { deleteContact } = useContext(ContactsContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const closeModal = () => setShowConfirm(false);
  return (
    <>
      <div key={contact.id} className={styles.contact}>
        <input
          type="checkbox"
          checked={selectedContacts.includes(contact.id)}
          onChange={(event) =>
            addContactListForDelete(event.target.checked, contact.id)
          }
        />
        <div className={styles.fullName}>
          <p>{contact.firstName}</p>
          <p>{contact.lastName}</p>
        </div>
        <p className={styles.category}>{contact.category}</p>
        <div className={styles.phone_email}>
          <p className={styles.phone}>{contact.phone}</p>
          <p className={styles.email}>{contact.email}</p>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => selectContactForEdit(contact)}
            className={styles.edit}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setShowConfirm(true);
            }}
            className={styles.delete}
          >
            Delete
          </button>
        </div>
      </div>
      {showConfirm && (
        <ConfirmModal
          closeModal={closeModal}
          message={"do you want to delete ?"}
          confirmFunction={() => {
            deleteContact(contact.id);
          }}
        />
      )}
    </>
  );
}

export default ContactCard;
