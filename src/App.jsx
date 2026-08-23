import { useContext, useState } from "react";
import { ContactsContext } from "./context/ContactsContext.jsx";

import Contacts from "./components/Contacts";
import Header from "./components/Header";
import categories from "./constants/categories.js";
import Notification from "./components/Notification.jsx";

function App() {
  const { contactsReducerState, searchValue } = useContext(ContactsContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const setFilterCategory = (name) => {
    setSelectedCategory(name);
  };

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

  let displayedContacts;

  if (searchValue) {
    displayedContacts = filteredContacts(searchValue);
  } else {
    displayedContacts = filterByCategory(selectedCategory);
  }

  return (
    <>
      <Header />
      <Contacts
        contacts={displayedContacts}
        categories={categories}
        setFilterCategory={setFilterCategory}
        selectedCategory={selectedCategory}
      />
      <Notification />
    </>
  );
}

export default App;
