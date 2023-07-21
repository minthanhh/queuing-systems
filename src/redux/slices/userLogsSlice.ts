import { db } from "@/configs/firebase.config"
import { IUserLogs } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Timestamp, addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"


interface UserLogsState {
    userLogs: IUserLogs[]
    error: null | string
}

const initialState: UserLogsState = {
    error: null,
    userLogs: []
}

const convertStringFromTimeStamp = (time: Timestamp) => {
    const date = new Date(
        time.seconds * 1000 + time.nanoseconds / 1000000
     );

     const seconds = date.getSeconds();
     const hours = date.getHours();
     const datetime = date.toLocaleDateString('vi-VI', {
        timeZone: 'Asia/Ho_Chi_Minh',
     });

     return `${hours}:${seconds} - ${datetime}`;
}

export const getUserLogs = createAsyncThunk('userLogs/getUserLogs', async (_, thunk) => {
    try {
        const coll = collection(db, 'user-logs')
        const docSnap = await getDocs(coll)
        const data = docSnap.docs.map(doc => {
            const { impactTime } = doc.data() as IUserLogs
            return { ...doc.data(), impactTime: convertStringFromTimeStamp(impactTime as Timestamp), uid: doc.id } as IUserLogs
        })
        return data
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

export const createUserLog = createAsyncThunk('userLogs/createUserLog', async (data: IUserLogs, thunk) => {
    try {
        const coll = collection(db, 'user-logs')
        const createdUserLog = { ...data, impactTime: serverTimestamp() } as IUserLogs
        await addDoc(coll, createdUserLog)
        return createdUserLog
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

const userLogsSlice = createSlice({
    name: 'userLogs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createUserLog.fulfilled, (state, action) => {
            state.userLogs.push(action.payload)
        })

        builder.addCase(getUserLogs.fulfilled, (state, action) => {
            if (action.payload) {
                state.userLogs = action.payload
            }
        })
    },
})

export default userLogsSlice.reducer