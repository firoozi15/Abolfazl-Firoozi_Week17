import { useState } from "react";

import Contacts from "./components/Contacts";
import Header from "./components/Header";
import ConfirmModal from "./components/ConfirmModal";
import categories from "./constants/categories.js";
import Notification from "./components/Notification.jsx";

import { useReducer } from "react";
import { reducer, initialState } from "./reducers/contactsReducer.js";

let NotificationMessage;
let NotificationType;

function App() {
  const [contactsReducerState, dispatch] = useReducer(reducer, initialState);
  const [showNotification, setShowNotification] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) || [];
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const saveToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const deleteContactsSelected = () => {
    if (showConfirm === false) setShowConfirm(true);
    else {
      const updatedContacts = contacts.filter(
        (contact) => !selectedContacts.includes(contact.id),
      );

      setContacts(updatedContacts);
      saveToLocalStorage(updatedContacts);
      showToastNotification("success", `${selectedContacts.length} Contacts deleted successfully`);
      clearSearch();
    }
  };

  const addContactListForDelete = (checked, id) => {
    if (checked) setSelectedContacts((prev) => [...prev, id]);
    else
      setSelectedContacts(
        selectedContacts.filter((contactId) => contactId !== id),
      );
  };

  const setFilterCategory = (name) => {
    setSelectedCategory(name);
  };

  const filterByCategory = (name) => {
    return contacts.filter((contact) => {
      if (name === "All") return true;

      return contact.category === name;
    });
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    saveToLocalStorage(updatedContacts);
    clearSearch();
    showToastNotification("success", "Contact deleted successfully");
  };
  const addContact = (contact) => {
    const contactId =
      contactsReducerState.length === 0
        ? 1
        : contactsReducerState[contactsReducerState.length - 1].id + 1;
    const newContact = { ...contact, id: contactId };
    dispatch({ type: "ADD_CONTACT", payload: newContact });
    const newContacts = [...contactsReducerState, newContact];
    saveToLocalStorage(newContacts);
    showToastNotification("success", "Contact added successfully");
    clearSearch();
  };
  const updateContact = (updatedContact) => {
    const newContacts = contacts.map((contact) => {
      if (contact.id === updatedContact.id) {
        showToastNotification("success", "Contact updated successfully");
        return updatedContact;
      }
      return contact;
    });

    setContacts(newContacts);
    saveToLocalStorage(newContacts);
    clearSearch();
  };

  const searchContact = (searchValue) => {
    setSearchValue(searchValue);
  };

  const filteredContacts = (searchValue) => {
    const value = searchValue.toLowerCase();

    return contacts.filter((contact) => {
      return (
        contact.firstName.toLowerCase().includes(value) ||
        contact.lastName.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        contact.phone.includes(searchValue)
      );
    });
  };

  const clearSearch = () => {
    setSearchValue("");
    setFilterCategory("All");
    setSelectedContacts([]);
  };

  let displayedContacts;

  if (searchValue) {
    displayedContacts = filteredContacts(searchValue);
  } else {
    displayedContacts = filterByCategory(selectedCategory);
  }

  const showToastNotification = (type, message) => {
    NotificationType = type;
    NotificationMessage = message;
    setShowNotification(true);
  };

  const closeToastNotification = () => setShowNotification(false);

  return (
    <>
      <Header
        searchContact={searchContact}
        searchValue={searchValue}
        clearSearch={clearSearch}
      />
      <Contacts
        contacts={contactsReducerState}
        addContact={addContact}
        deleteContact={deleteContact}
        updateContact={updateContact}
        categories={categories}
        setFilterCategory={setFilterCategory}
        addContactListForDelete={addContactListForDelete}
        selectedContacts={selectedContacts}
        deleteContactsSelected={deleteContactsSelected}
        selectedCategory={selectedCategory}
        showToastNotification={showToastNotification}
      />
      {showConfirm && (
        <ConfirmModal
          confirmFunction={deleteContactsSelected}
          message={`do you want to delete ${selectedContacts.length} contact ?`}
          closeModal={() => {
            setShowConfirm(false);
          }}
        />
      )}
      {showNotification && (
        <Notification
          type={NotificationType}
          title={NotificationMessage}
          closeNotification={closeToastNotification}
        />
      )}
    </>
  );
}

export default App;
