import { createContext, useState, useEffect } from "react";

import { useReducer } from "react";
import { reducer, initialState } from "../reducers/contactsReducer.js";

export const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [contacts, dispatch] = useReducer(reducer, initialState);

  const [searchValue, setSearchValue] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const showToastNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSelectedCategory("All");
  };

  const addContact = (contact) => {
    const contactId =
      contacts.length === 0 ? 1 : contacts[contacts.length - 1].id + 1;
    const newContact = { ...contact, id: contactId };
    dispatch({ type: "ADD_CONTACT", payload: newContact });
    showToastNotification("success", "Contact added successfully");
    clearSearch();
  };

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    showToastNotification("success", "Contact deleted successfully");
    clearSearch();
  };

  const updateContact = (updatedContact) => {
    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
    showToastNotification("success", "Contact updated successfully");
    clearSearch();
  };

  const deleteContactsSelected = (selectedContacts) => {
    dispatch({ type: "DELETE_SELECTED_CONTACTS", payload: selectedContacts });
    showToastNotification(
      "success",
      `${selectedContacts.length} Contacts deleted successfully`,
    );
    clearSearch();
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
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
        setSelectedCategory,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
