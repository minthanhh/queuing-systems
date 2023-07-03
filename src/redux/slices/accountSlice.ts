import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs, or, query, where } from "firebase/firestore"
import { db } from "../../configs/firebase.config"
import { IAccount } from "../../types"
import createTimeAndConvertToVi from "../../helpers/convert"

interface AccountState {
    accounts: IAccount[]
}

const initialState: AccountState = {
    accounts: [],
}

export const addAccount = createAsyncThunk('account/addAccount', async (_account: IAccount, {rejectWithValue}) => {
    try {
        const accountExist = await getDocs(query(collection(db, 'manager-accounts'), 
            or(
                where('email', '==', _account.email),
                where('phone', '==', _account.phone),
                where('username', '==', _account.username)
            )))

        if (accountExist) {
            return
        } else {
            const account = {
                ..._account,
                createdAt: createTimeAndConvertToVi(),
                updatedAt: createTimeAndConvertToVi()
            }
    
            await addDoc(collection(db, 'manager-accounts'), account)
    
            const createdAccount = { ...account  }  
            return createdAccount
        }
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getAccounts = createAsyncThunk('account/getAccounts', async () => {
    try {
        const coll = collection(db, 'manager-accounts')
        const snaps = await getDocs(coll)
        return snaps.docs.map(doc => ({ uid: doc.id,...doc.data() as IAccount})) 
    } catch (err) {
        console.log(err)
    }
})

const AccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(getAccounts.fulfilled, (state, action) => {
        if (action.payload) {
            state.accounts = action.payload
        }
      })
      builder.addCase(addAccount.fulfilled, (state, action) => {
        if (action.payload) {
            state.accounts.push(action.payload)
        }
      })
    },
})

export default AccountSlice.reducer

