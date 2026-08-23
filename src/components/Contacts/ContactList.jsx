import styles from "./ContactList.module.css";
import ContactCard from "./ContactCard";

function ContactList({
  contacts,
  selectContactForEdit,
  addContactListForDelete,
  selectedContacts
}) {
  if (contacts.length < 1) {
    return (
      <div className={styles.contactsList}>
        <p className={styles.noMember}>No contacts found</p>
      </div>
    );
  }
  return (
    <div className={styles.contactsList}>
      {contacts.map((contact) => {
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
