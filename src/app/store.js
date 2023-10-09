import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../features/cake/cakeSlice";
import icecreamReducer from "../features/icecream/icecreamSlice";
import usersReducer from "../features/user/userSlice";
const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    users: usersReducer,
  },
});

export default store;
