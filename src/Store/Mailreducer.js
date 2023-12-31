import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mails: [],
    totalQuantity: 0,
    changed: false,
    
}


const MailSlice = createSlice({
    name: "mail",
    initialState,
    reducers: {
        addMail(state, action) { 
            let newMail = action.payload;
            state.mails.push({ ...newMail, quantity: 1 });
            state.changed = true;
            
        },
        renderedMail(state,action)
        {
            let newMail = action.payload;
            state.mails.push({ newMail });
        },
        clearMail(state)
        {
            state.mails = [];
            state.totalQuantity = 0;
            state.changed = false;
        },
        settotal(state)
        {
            if (state.totalQuantity === 0)
            {
                state.totalQuantity = 0;
            }
            else
            {
                state.totalQuantity = state.totalQuantity - 1;
            }
        },
        totalAdd(state) {
            state.totalQuantity = state.totalQuantity + 1;
        },
        removeMail(state, action)
        {
            state.mails = state.mails.filter((email) => {
                return email.id !== action.payload
            })
            state.changed = true;
        }

    }
})

export const MailActions = MailSlice.actions;

export default MailSlice.reducer;


