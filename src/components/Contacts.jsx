import ContactForm from "./Contacts/ContactForm";
import styles from "./Contacts.module.css";
import ContactList from "./Contacts/ContactList";
import { useState } from "react";

function Contacts({
  contacts,
  categories,
  selectedCategory,
  setFilterCategory,
  showToastNotification,
}) {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const selectContactForEdit = (contact) => setSelectedContact(contact);
  const clearSelectedContact = () => setSelectedContact(null);

  const addContactListForDelete = (checked, id) => {
    if (checked) setSelectedContacts((prev) => [...prev, id]);
    else
      setSelectedContacts(
        selectedContacts.filter((contactId) => contactId !== id),
      );
  };
  return (
    <main className={styles.main}>
      <div className={styles.mainHeader}>
        <ContactForm
          categories={categories}
          selectedCategory={selectedCategory}
          setFilterCategory={setFilterCategory}
          selectedContact={selectedContact}
          clearSelectedContact={clearSelectedContact}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
          showToastNotification={showToastNotification}
        />
      </div>
      <ContactList
        contacts={contacts}
        selectContactForEdit={selectContactForEdit}
        addContactListForDelete={addContactListForDelete}
        selectedContacts={selectedContacts}
      />
    </main>
  );
}

export default Contacts;
