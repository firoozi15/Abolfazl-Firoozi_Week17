export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);
    case "DELETE_SELECTED_CONTACTS":
      return state.filter((contact) => !action.payload.includes(contact.id));
    case "UPDATE_CONTACT":
      return state.map((contact) => {
        if (contact.id === action.payload.id){
          return action.payload
        }
        return contact
      });
    default:
      return state;
  }
};

export const initialState = JSON.parse(localStorage.getItem("contacts")) || [];
