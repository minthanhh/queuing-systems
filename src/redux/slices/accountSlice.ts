import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, doc, getDocs, or, query, setDoc, updateDoc, where } from "firebase/firestore"
import { auth, db } from "@/configs/firebase.config"
import { IAccount } from "@/types"
import createTimeAndConvertToVi from "@/helpers/convert"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

interface AccountState {
    accounts: IAccount[]
    error: {} | null
}

const initialState: AccountState = {
    accounts: [],
    error: null
}

export const addAccount = createAsyncThunk('account/addAccount', async (_account: IAccount, { rejectWithValue }) => {
    try {
        const accountExist = await getDocs(query(collection(db, 'manager-accounts'),
            or(
                where('email', '==', _account.email),
                where('phone', '==', _account.phone),
                where('username', '==', _account.username)
            )))

        if (!accountExist.empty) {
            return rejectWithValue({ message: 'Email, tên người dùng hoặc số điện thoại đã được sử dụng!' })
        } else {
            const account = {
                ..._account,
                createdAt: createTimeAndConvertToVi(),
                updatedAt: createTimeAndConvertToVi()
            }

            const { user } = await createUserWithEmailAndPassword(auth, account.email, account.password)
            if (user && auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: account.fullName,
                })
            }
            await setDoc(doc(db, 'manager-accounts', user.uid), account)

            const createdAccount = { uid: user.uid, ...account }
            return createdAccount
        }
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const updateAccount = createAsyncThunk('account/updateAccount', async (data: IAccount, { rejectWithValue }) => {
    try {
        const accountRef = doc(db, 'manager-accounts', data.uid as string)
        await updateDoc(accountRef, { ...data })
        const updatedAccount = { ...data }

        return updatedAccount
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getAccounts = createAsyncThunk('account/getAccounts', async () => {
    try {
        const coll = collection(db, 'manager-accounts')
        const snaps = await getDocs(coll)
        return snaps.docs.map(doc => ({ uid: doc.id, ...doc.data() as IAccount }))
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
        builder.addCase(addAccount.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(updateAccount.fulfilled, (state, action) => {
           state.accounts = [...state.accounts].map(account => {
            if (account.email === action.payload.email) {
                return action.payload
            }
            return account
           })
        })
    },
})

export default AccountSlice.reducer

