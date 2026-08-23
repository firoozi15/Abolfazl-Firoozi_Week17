import { useContext, useState } from "react";
import { ContactsContext } from "./context/ContactsContext.jsx";

import Contacts from "./components/Contacts";
import Header from "./components/Header";
import ConfirmModal from "./components/ConfirmModal";
import categories from "./constants/categories.js";
import Notification from "./components/Notification.jsx";

function App() {
  const {
    contactsReducerState,
    searchValue,
    setSearchValue,
    showNotification,
    notificationMessage,
    notificationType,
    showToastNotification,
    clearSearch,
    setShowNotification,
  } = useContext(ContactsContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");


  const deleteContactsSelected = () => {
    if (showConfirm === false) setShowConfirm(true);
    else {
      dispatch({
        type: "DELETE_SELECTED_CONTACTS",
        payload: selectedContacts,
      });

      const updatedContacts = contactsReducerState.filter(
        (contact) => !selectedContacts.includes(contact.id),
      );
      saveToLocalStorage(updatedContacts);

      showToastNotification(
        "success",
        `${selectedContacts.length} Contacts deleted successfully`,
      );
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
    return contactsReducerState.filter((contact) => {
      if (name === "All") return true;

      return contact.category === name;
    });
  };
  
  const updateContact = (updatedContact) => {
    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });

    const newContacts = contactsReducerState.map((contact) => {
      if (contact.id === updatedContact.id) {
        showToastNotification("success", "Contact updated successfully");
        return updatedContact;
      }
      return contact;
    });
    saveToLocalStorage(newContacts);

    clearSearch();
  };

  const searchContact = (searchValue) => {
    setSearchValue(searchValue);
  };

  const filteredContacts = (searchValue) => {
    const value = searchValue.toLowerCase();

    return contactsReducerState.filter((contact) => {
      return (
        contact.firstName.toLowerCase().includes(value) ||
        contact.lastName.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        contact.phone.includes(searchValue)
      );
    });
  };

  let displayedContacts;

  if (searchValue) {
    displayedContacts = filteredContacts(searchValue);
  } else {
    displayedContacts = filterByCategory(selectedCategory);
  }

  const closeToastNotification = () => setShowNotification(false);

  return (
    <>
      <Header
        searchContact={searchContact}
        searchValue={searchValue}
        clearSearch={clearSearch}
      />
      <Contacts
        contacts={displayedContacts}
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
          type={notificationType}
          title={notificationMessage}
          closeNotification={closeToastNotification}
        />
      )}
    </>
  );
}

export default App;
