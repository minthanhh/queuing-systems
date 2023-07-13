import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { ServiceType } from "@/types"
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
        const ref = await addDoc(collection(db, 'services'), _service)
        const createdSerivce = { ..._service, uid: ref.id}

        return createdSerivce
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
    },
})

export default ServiceSlice.reducer