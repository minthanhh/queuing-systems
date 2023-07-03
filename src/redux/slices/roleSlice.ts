import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../configs/firebase.config"
import { IRole } from "../../types"

interface RoleState {
    roles: IRole[]
}

const initialState: RoleState = {
    roles: [],
}

export const getRoles = createAsyncThunk('role/getRoles', async () => {
    const qn = await getDocs(collection(db, 'manager-roles')) 
    const roles = qn.docs.map(doc => ({ uid: doc.id,...doc.data() as IRole})) 
    return roles
})


const RoleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(getRoles.fulfilled, (state, action) => {
        if (action.payload) {
            state.roles = action.payload
        }
      })
    },
})

export default RoleSlice.reducer

