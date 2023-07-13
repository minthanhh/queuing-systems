import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { signOut } from 'firebase/auth'
import { IUser } from "@/types"
import { auth } from "@/configs/firebase.config"


interface AuthState {
    profile: IUser | null
}

const initialState: AuthState = {
    profile: null,
}

export const login = createAsyncThunk('user/login', async (_user: IUser | null, {rejectWithValue}) => {
    try {
      return _user
    } catch (err) {
       return rejectWithValue(err)
    }
})

export const logout = createAsyncThunk('user/logout', async () => {
    try {
        await signOut(auth)
        return null
    } catch (err) {
        console.log(err)
    }
})



const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile = action.payload
            }
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            if (action.payload === null) {
                state.profile = action.payload
            }
        })
    },
})


export default UserSlice.reducer