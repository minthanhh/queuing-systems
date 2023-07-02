import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ServiceType } from "../../types"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../configs/firebase.config"


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
    },
})

export default ServiceSlice.reducer