import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./reducers/counter";
import userReducer from "./reducers/user";
// import eventFormReducer from "./reducers/eventForm";
import { devToolsEnhancer } from "redux-devtools-extension";
import storageLocal from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  // version: 1,
  storage: storageLocal,
  // if you do not want to persist this part of the state
  // blacklist: ["counter"],
};

const reducer = combineReducers({
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore(
  {
    reducer: persistedReducer,
  },
  devToolsEnhancer()
);
