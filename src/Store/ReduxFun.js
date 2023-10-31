import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Store/AuthReducer";
import Mailreducer from "./Mailreducer";



const Store = configureStore({
    reducer: {
        Auth: AuthReducer,
        Mail: Mailreducer
    }

})

export default Store

