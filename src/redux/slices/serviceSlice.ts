import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { IService, ServiceType } from "@/types"
import { db } from "@/configs/firebase.config"


interface ServiceState {
    services: ServiceType[]
}

const initialState: ServiceState = {
    services: [],
}

export const getServices = createAsyncThunk('service/getServices', async () => {
    try {
        const qn = await getDocs(collection(db, 'services')) 
        const services = qn.docs.map(doc => ({ uid: doc.id,...doc.data() as ServiceType})) 
        return services
    } catch (err) {
        console.log(err)
    }
})

export const addService = createAsyncThunk('service/AddService', async (_service: ServiceType, { rejectWithValue }) => {
    try {
        const ref = await addDoc(collection(db, 'services'), { ..._service, status: 'active'})
        const createdSerivce = { ..._service, status: 'active', uid: ref.id}

        await setDoc(doc(db, 'counter', ref.id), {
            count: Number(_service.from)
        })


        console.log(createdSerivce)

        return createdSerivce
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const updateService = createAsyncThunk('service/updateService', async (data: IService, { rejectWithValue }) => {
    try {
        const ref = doc(db, 'services', data.uid as string)
        await updateDoc(ref, { ...data })
        const updatedService = { ...data }

        await setDoc(doc(db, 'counter', ref.id), {
            count: Number(data.from)
        })

        return updatedService
    } catch (err) {
        return rejectWithValue(err)
    }
})


const ServiceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(getServices.fulfilled, (state, action) => {
        if (action.payload) {
            state.services = action.payload
        }
      })

      builder.addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload)
      })

      builder.addCase(updateService.fulfilled, (state, action) => {
        state.services = [...state.services].map(account => {
         if (account.id === action.payload.id) {
             return action.payload
         }
         return account
        })
     })
    },
})

export default ServiceSlice.reducer