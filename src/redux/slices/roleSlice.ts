import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/configs/firebase.config"
import { IRole } from "@/types"
import { getCountAllUserRoles } from "@/helpers/promise"

interface RoleState {
    roles: IRole[]
}

const initialState: RoleState = {
    roles: [],
}

export const getRoles = createAsyncThunk('role/getRoles', async () => {
    const { countUserRolesAccountant, countUserRolesAdmin, countUserRolesManager } = await getCountAllUserRoles()
    const qn = await getDocs(collection(db, 'manager-roles')) 
    const roles = qn.docs.map(doc => {
        const { role  } = doc.data() as IRole
        if (role === 'admin') {
            return ({ uid: doc.id, ...doc.data() as IRole, usersUsing: countUserRolesAdmin})
        }
        if (role === 'manager') {
            return ({ uid: doc.id, ...doc.data() as IRole, usersUsing: countUserRolesManager})
        }
        return ({ uid: doc.id, ...doc.data() as IRole, usersUsing: countUserRolesAccountant})
    }) 
    return roles
})


const RoleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(getRoles.fulfilled, (state, action) => {
        if (action.payload) {
            console.log(action.payload)

            state.roles = action.payload
        }
      })
    },
})

export default RoleSlice.reducer

