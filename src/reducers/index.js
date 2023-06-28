import BarangReducer from "./barang";

import { combineReducers } from "redux";

const myReducer = combineReducers({
  barangs: BarangReducer,
});

export default myReducer;
