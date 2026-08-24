import styles from "./ContactList.module.css";
import ContactCard from "./ContactCard";

import { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";

function ContactList({
  selectContactForEdit,
  addContactListForDelete,
  selectedContacts,
}) {
  const { contactsReducerState, searchValue, selectedCategory } =
    useContext(ContactsContext);

  const filterByCategory = (name) => {
    return contactsReducerState.filter((contact) => {
      if (name === "All") return true;

      return contact.category === name;
    });
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

  const displayedContacts = searchValue
    ? filteredContacts(searchValue)
    : filterByCategory(selectedCategory);

  if (displayedContacts.length < 1) {
    return (
      <div className={styles.contactsList}>
        <p className={styles.noMember}>No contacts found</p>
      </div>
    );
  }
  return (
    <div className={styles.contactsList}>
      {displayedContacts.map((contact) => {
        return (
          <ContactCard
            key={contact.id}
            contact={contact}
            selectContactForEdit={selectContactForEdit}
            addContactListForDelete={addContactListForDelete}
            selectedContacts={selectedContacts}
          />
        );
      })}
    </div>
  );
}

export default ContactList;
