import { createContext, useState } from "react";

import { useReducer } from "react";
import { reducer, initialState } from "../reducers/contactsReducer.js";

export const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [contactsReducerState, dispatch] = useReducer(reducer, initialState);

  const [searchValue, setSearchValue] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const saveToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const showToastNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const clearSearch = () => {
    setSearchValue("");
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

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });

    const updatedContacts = contactsReducerState.filter(
      (contact) => contact.id !== id,
    );
    saveToLocalStorage(updatedContacts);

    showToastNotification("success", "Contact deleted successfully");
    clearSearch();
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

  const deleteContactsSelected = (selectedContacts) => {
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
  };

  return (
    <ContactsContext.Provider
      value={{
        contactsReducerState,
        addContact,
        searchValue,
        setSearchValue,
        showNotification,
        notificationMessage,
        notificationType,
        showToastNotification,
        clearSearch,
        setShowNotification,
        deleteContact,
        updateContact,
        deleteContactsSelected,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
