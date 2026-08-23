import { useEffect, useState } from "react";

import styles from "./ContactForm.module.css";
import closeIcon from "../../assets/icons/close.svg";
import trashIcon from "../../assets/icons/trash.svg";
import addUserIcon from "../../assets/icons/add_user.svg";
import { validateContact } from "../../utils/validation";
import ConfirmModal from "../ConfirmModal";
import CategoryButtons from "../CategoryButtons";
import contactFields from "../../constants/contactFields";

import { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext.jsx";

function ContactForm({
  categories,
  selectedCategory,
  selectedContact,
  clearSelectedContact,
  setFilterCategory,
  selectedContacts,
  setSelectedContacts,
  showToastNotification,
}) {
  const { addContact, updateContact, deleteContactsSelected } =
    useContext(ContactsContext);
  const [isClosing, setisClosing] = useState(false);
  const [showEditConfirm, setEditShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "",
  });
  const closeModal = () => {
    setShowDeleteConfirm(false);
    setEditShowConfirm(false);
  };

  useEffect(() => {
    if (selectedContact) {
      setContact({
        id: selectedContact.id,
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        email: selectedContact.email,
        phone: selectedContact.phone,
        category: selectedContact.category,
      });
      setShowModal(true);
    }
  }, [selectedContact]);

  const saveDataHandler = () => {
    const isError = validateContact(contact);
    if (isError) {
      showToastNotification("error", isError);
      return;
    }

    selectedContact ? updateContact(contact) : addContact(contact);
    setisClosing(true);
    clearSelectedContact();
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      category: "",
    });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [name]: value });
  };
  return (
    <>
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        setFilterCategory={setFilterCategory}
      />
      <div className={styles.buttons}>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className={`${styles.button} ${styles.deleteUser} ${selectedContacts.length !== 0 && styles.showDeleteButton}`}
        >
          <img className={styles.trashIcon} src={trashIcon} alt="deleteAll" />
        </button>
        <button
          onClick={() => setShowModal(true)}
          className={`${styles.button} ${styles.adduser}`}
        >
          <img className={styles.addUserIcon} src={addUserIcon} alt="addUser" />
        </button>
      </div>
      {showModal && (
        <div
          onAnimationEnd={() => {
            isClosing && setShowModal(false);
            setisClosing(false);
          }}
          className={`${styles.contactForm} ${isClosing && styles.hide}`}
        >
          <div className={styles.form}>
            <div className={styles.formHeader}>
              <h3>{selectedContact ? "Edit User" : "Add User"}</h3>
              <img
                onClick={() => setEditShowConfirm(true)}
                src={closeIcon}
                alt="closeIcon"
                className={styles.closeIcon}
              />
            </div>
            <div className={styles.formMain}>
              {contactFields.map((input) => (
                <div className={styles.inputGroup} key={input.name}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={contact[input.name]}
                    onChange={changeHandler}
                  />
                </div>
              ))}
              <div className={styles.inputGroup}>
                <label htmlFor="input-category">Category</label>
                <select
                  id="input-category"
                  name="category"
                  value={contact.category}
                  onChange={changeHandler}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.formButtons}>
              <button
                onClick={() => setEditShowConfirm(true)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={() => saveDataHandler()}
                className={styles.saveButton}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditConfirm && (
        <ConfirmModal
          closeModal={closeModal}
          message={"Do you want to cancel editing?"}
          confirmFunction={() => {
            setisClosing(true);
            clearSelectedContact();
            setContact({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              category: "",
            });
          }}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmModal
          confirmFunction={() => {
            deleteContactsSelected(selectedContacts);
            setSelectedContacts([]);
          }}
          message={`do you want to delete ${selectedContacts.length} contact ?`}
          closeModal={() => {
            setShowDeleteConfirm(false);
          }}
        />
      )}
    </>
  );
}

export default ContactForm;
