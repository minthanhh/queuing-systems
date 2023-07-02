import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../types"

interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        logout(state, action) {

        }
    }
})


export const { login, logout} = UserSlice.actions
export default UserSlice.reducer