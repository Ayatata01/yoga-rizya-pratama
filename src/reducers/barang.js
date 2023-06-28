const BarangReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_BARANGS":
      return state;
    case "SET_BARANGS":
      return action.barangs;
    default:
      return state;
  }
};

export default BarangReducer;
