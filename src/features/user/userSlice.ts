import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UserState {
    login: string | undefined;
}

export const userSlice = createSlice({
    name: "user",
    initialState: { login: undefined } as UserState,
    reducers: {
        signIn: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        signOut: (state) => {
            state.login = undefined;
        }
    }
});

export const { signIn, signOut } = userSlice.actions;

export const selectLogin = (state: RootState) => state.user.login;

export default userSlice.reducer;
