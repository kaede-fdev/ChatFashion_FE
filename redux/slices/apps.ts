import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";


const initialState = {
    isDarkMode: false,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            if(!state.isDarkMode) {
                localStorage.setItem('theme', JSON.stringify("light"));
                setCookie('theme', 'light');
              } else {
                localStorage.removeItem('theme');
                setCookie('theme', '', {maxAge:0})
              } 
        },
        setIsDarkMode: (state,action) => {
            state.isDarkMode = action.payload;
        }
        
    }
})

export const {toggleDarkMode, setIsDarkMode} = appSlice.actions;
export default appSlice.reducer;