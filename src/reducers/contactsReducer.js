export const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const initialState = JSON.parse(localStorage.getItem("contacts")) || [];
