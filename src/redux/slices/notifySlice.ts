import { db } from "@/configs/firebase.config";
import { INotify } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Timestamp, addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";


interface NotifyState {
    notifies: INotify[]
    error: null | string
}

const initialState: NotifyState = {
    notifies: [],
    error: null
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

export const getNotifies = createAsyncThunk('notify/getNotifies', async (_, thunk) => {
    try {
        const coll = collection(db, 'notifies')
        const q = query(coll, orderBy('createdAt', 'desc'), limit(10))
        const docSnap = await getDocs(q)
        const data = docSnap.docs.map((doc) => {
            const { createdAt } = doc.data() as INotify
            return { ...doc.data(), uid: doc.id, createdAt: convertStringFromTimeStamp(createdAt as Timestamp) as string} as INotify
        })
        return data 
    } catch (err) {
        thunk.rejectWithValue(err)
    }
})

export const createNotify = createAsyncThunk('notify/createNotify', async (data: INotify, thunk) => {
    try {
        const coll = collection(db, 'notifies')
        const createdNotify = { ...data, createdAt: Timestamp.now() } as INotify
        await addDoc(coll, createdNotify)
        return { ...createdNotify, createdAt: convertStringFromTimeStamp(Timestamp.now())} as INotify

    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

const notifySlice = createSlice({   
    name: 'notify',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNotify.fulfilled, (state, action) => {
            if (action.payload) {
                state.notifies.unshift(action.payload)
            }
        })

        builder.addCase(getNotifies.fulfilled, (state, action) => {
            if (action.payload) {
                state.notifies = action.payload
            }
        })
    },
})

export default notifySlice.reducer