import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Store/AuthReducer";



const Store = configureStore({
    reducer: {
        Auth: AuthReducer,
    }

})

export default Store

