import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mails: [],
    totalQuantity: 0,
    
}


const MailSlice = createSlice({
    name: "mail",
    initialState,
    reducers: {
        addMail(state, action) { 
            let newMail = action.payload;
            state.mails.push({ ...newMail, quantity: 1 });
            if (newMail.read===false) {
                state.totalQuantity = state.totalQuantity + 1;
            }
            
        },
        clearMail(state)
        {
            state.mails = [];
        },
        settotal(state)
        {
            state.totalQuantity = state.totalQuantity - 1;
        }

    }
})

export const MailActions = MailSlice.actions;

export default MailSlice.reducer;


