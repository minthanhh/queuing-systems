import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore"
import { db } from "@/configs/firebase.config"
import {  ServiceType, IGiveNumber, IOrderNumberAndState, IReport } from "@/types"
import defaultExpiryDateAndTime from "@/helpers/date"


export type Service = {
    serviceId: string
    fullName: string
    email: string,
    phone: string,
}

interface NumberState {
    listGiveNumbers: IGiveNumber[],
    error: string | null
    orderAndState: IOrderNumberAndState[]
    reports: IReport[]
}

const initialState: NumberState = {
    listGiveNumbers: [],
    error: null,
    orderAndState: [],
    reports: []
}

type Counter = {
    count: number
}

export const newNumber = createAsyncThunk('number/newNumber', async (service: Service, { rejectWithValue }) => {
    try {
        const docRef = doc(db, "services", service.serviceId);
        const docSnap = await getDoc(docRef);
        const {  to, prefix, from, name  } = docSnap.data() as ServiceType

        const counterRef = doc(db, "counter", service.serviceId);
        const counterSnape = await getDoc(counterRef);
        if (!counterSnape.exists()) return
        const { count } = counterSnape.data() as Counter
        const coll = collection(db, "give-numbers");

        let result = {
            customerName: service.fullName,
            email: service.email,
            phone: service.phone,
            serviceName: name,
            status: 'pending',
            grantTime: defaultExpiryDateAndTime(),
            expiryTime: defaultExpiryDateAndTime(18, 0),
            serviceId: service.serviceId,
            source: 'Hệ thống'

        }

        if (count <= Number(to)) {
            if (count !== Number(from)) {
                const counting = prefix + count.toString().padStart(4, '0')
    
                const ref = await addDoc(coll, {
                    customerName: service.fullName || '',
                    email: service.email,
                    phone: service.phone || '',
                    status: 'pending',
                    serviceName: name,
                    grantTime: defaultExpiryDateAndTime(),
                    expiryTime: defaultExpiryDateAndTime(18, 0),
                    orderNumber: counting,
                    serviceId: service.serviceId,
                    source: 'Hệ thống'
                })
    
                await setDoc(counterRef, {
                    count: count + 1
                })

                result = { ...result, uid: ref.id, orderNumber: counting} as IGiveNumber
            } else {
                const counting = prefix + Number(from).toString().padStart(4, '0')

                const ref = await addDoc(coll, {
                    customerName: service.fullName || '',
                    email: service.email,
                    phone: service.phone || '',
                    status: 'pending',
                    serviceName: name,
                    grantTime: defaultExpiryDateAndTime(),
                    expiryTime: defaultExpiryDateAndTime(18, 0),
                    orderNumber: counting,
                    serviceId: service.serviceId,
                    source: 'Hệ thống'
                })

                await setDoc(counterRef, {
                    count: count + 1
                })

                result = { ...result, uid: ref.id, orderNumber: counting} as IGiveNumber
            }

            return result as IGiveNumber
        } else {
            return rejectWithValue({message: 'Số đã được cấp hết vui lòng chọn dịch vụ khác'})
        }
        
       
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const getGiveNumbers = createAsyncThunk('number/getGiveNumbers', async () => {
    try {
        const coll = collection(db, 'give-numbers')
        const snap = await getDocs(coll)

        if (!snap.empty) return 

        return snap.docs.map(doc => ({ uid: doc.id, ...doc.data()}))
    } catch (err) {
        console.log(err)
    }
})

export const getOrderNumberAndState = createAsyncThunk('number/getOrderNumberAndState', async (serviceId : string) => {
    try {   
        console.log(serviceId)
        const coll = collection(db, 'give-numbers')
        const q = query(coll, where('serviceId', '==', serviceId), orderBy('orderNumber', 'asc'))
        const snap = await getDocs(q)

        const data = snap.docs.map(doc => {
            const { orderNumber, status } = doc.data()
            return ({ uid: doc.id, orderNumber, status} as IOrderNumberAndState)
        })

        return data
    } catch (err) {
        console.log(err)
    }
})

export const getPickFieldNumber = createAsyncThunk('number/getPickFieldNumber', async () => {
    try {
        const coll = collection(db, 'give-numbers')
        const sort = orderBy('orderNumber', 'asc')
        const q = query(coll, sort)
        const snapShot = await getDocs(q) 

        const data = snapShot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as IReport))

        return data
    } catch (err) {
        console.log(err)
    }
})



const NumberSlice = createSlice({
    name: 'number',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(newNumber.fulfilled, (state, action) => {
           if (action.payload) {
            state.listGiveNumbers.push(action.payload)
           } 
        })

        builder.addCase(getOrderNumberAndState.fulfilled, (state, action) => {
            if (action.payload) {
                state.orderAndState = action.payload
            }
        })

        builder.addCase(getPickFieldNumber.fulfilled, (state, action) => {
            if (action.payload) {
                state.reports = action.payload
            }
        })
    }
})

export default NumberSlice.reducer