export const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);
    default:
      return state;
  }
};

export const initialState = JSON.parse(localStorage.getItem("contacts")) || [];
