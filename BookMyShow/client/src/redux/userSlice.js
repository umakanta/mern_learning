import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
        name: "users",
        initialState: {
            users: null,
        },
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload;
            }
        }
    }
);


export const { setUser } = userSlice.actions;
export default userSlice.reducer;
