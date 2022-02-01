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
    logOutUser(state, action) {
      state.user = UserInitialState;
    },
    userEmail(state, action) {
      state.user.email = action.payload;
    },

    //only saga action
    loginUser: (state, action) => {},
    refreshToken: () => {},
    fetchFormations: () => {},
  },
});

export const {
  userEmail,
  loginUser,
  fetchFormations,
  loginSuccess,
  logOutUser,
  refreshToken,
  loginFailed,
} = userSlice.actions;

export const userSelector = (state) => state.userReducer.user;

export default userSlice.reducer;
