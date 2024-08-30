import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isSiggnedIn: false, role:"user" },
    reducers: {
        SignIn(state){
            state.isSiggnedIn = true;
        },
        logout(state){
            state.isSiggnedIn = false;
        },
        changeRole(state, action){
            const role = action.payload;
            state.role = role;
        },
    }, 
});
export const authAction = authSlice.actions;
export default authSlice.reducer;