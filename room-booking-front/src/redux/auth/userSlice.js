import { createSlice } from "@reduxjs/toolkit";

const UserInitialState = {
  isAuthenticated: false,
  username: null,
  access_token: null,
  companyId: null,
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState: { user: UserInitialState },
  reducers: {
    loginFailed: (state) => {
      state.user = UserInitialState;
    },
    loginSuccess: (state, action) => {
      state.user = {
        isAuthenticated: true,
        userId: action.payload._id,
        companyId: action.payload.company,
        username: action.payload.username,
        access_token: action.payload.access_token,
      };
    },
    logOutUser(state) {
      state.user = UserInitialState;
    },

    //only saga action
    loginUser: (state, action) => {},
  },
});

export const { loginFailed, loginSuccess, logOutUser, loginUser } =
  userSlice.actions;

export const userSelector = (state) => state.userReducer.user;

export default userSlice.reducer;
