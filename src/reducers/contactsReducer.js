export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);
    case "DELETE_SELECTED_CONTACTS":
      return state.filter((contact) => !action.payload.includes(contact.id))
    default:
      return state;
  }
};

export const initialState = JSON.parse(localStorage.getItem("contacts")) || [];
