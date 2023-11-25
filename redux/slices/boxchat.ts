import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

const initialState = {
  userPick: {
    skinToneCode: "",
  },
  chatControl: {
    isBotConverOneDone: false,
    isUpdatedImage: false,
    isUserPickedColor: false,
  },
  conversation: [{}],
};

export const appSlice = createSlice({
  name: "botchat",
  initialState,
  reducers: {
    setSkinToneCode: (state, action) => {
      state.userPick.skinToneCode = action.payload;
    },
    setIsBotConverOneDone: (state, action) => {
      state.chatControl.isBotConverOneDone = action.payload;
    },
    setIsUpdatedImage: (state, action) => {
        state.chatControl.isUpdatedImage = action.payload;
    },
    setIsUserPickedColor: (state, action) => {
      state.chatControl.isUserPickedColor = action.payload;
    },
    setConversation: (state, action) => {
      state.conversation.push(action.payload);
    }
  },
});

export const { setSkinToneCode, setIsBotConverOneDone, setIsUserPickedColor, setIsUpdatedImage, setConversation} =
  appSlice.actions;
export default appSlice.reducer;
