import ContactForm from "./Contacts/ContactForm";
import styles from "./Contacts.module.css";
import ContactList from "./Contacts/ContactList";
import { useState } from "react";

function Contacts() {
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
          selectedContact={selectedContact}
          clearSelectedContact={clearSelectedContact}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      </div>
      <ContactList
        selectContactForEdit={selectContactForEdit}
        addContactListForDelete={addContactListForDelete}
        selectedContacts={selectedContacts}
      />
    </main>
  );
}

export default Contacts;
