import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, doc, getCountFromServer, getDoc, query, where } from "firebase/firestore"
import { db } from "@/configs/firebase.config"
import { ICoupons, ServiceType } from "@/types"
// import defaultExpiryDateAndTime from "@/helpers/date"

export type Service = {
    serviceId: string
    fullName: string
    email: string,
    phone: string,
}


interface NumberState {
    coupons: ICoupons[]
}

const initialState: NumberState = {
    coupons: []
}


export const newNumber = createAsyncThunk('number/newNumber', async (service: Service, { rejectWithValue }) => {
    try {
        const docRef = doc(db, "services", service.serviceId);
        const docSnap = await getDoc(docRef);
        const {  to  } = docSnap.data() as ServiceType
        const toNumber = Number(to)
        // const fromNumber = Number(from)
        
        const coll = collection(db, "give-numbers");
        const q = query(coll, where('serviceId', '==', service.serviceId))
        const snapshot = await getCountFromServer(q);
        const count = snapshot.data().count + 1
        
        if (count <= toNumber) {
            console.log(count.toString().padStart(4, '0')) 
            // const data = await addDoc(coll, {
            //     fullName: service.fullName || '',
            //     email: service.email,
            //     phone: service.phone || '',
            //     status: 'pending',
            //     grantTime: defaultExpiryDateAndTime(),
            //     expiryDate: defaultExpiryDateAndTime(18, 0),
            //     count,
            //     serviceId: service.serviceId
            // })
        } else {
            console.log('not count', 0o1 + 1)  
        }

        
        
       


        // const docRef = doc(db, 'services', service.serviceId)
        // const docSnap = await getDoc(docRef)

        // if (docSnap.exists()) {
        //     const { from, to, name, id } = docSnap.data() as ServiceType


           

        //     const fromNumber = Number(id + from)
        //     const toNumber = Number(id + to)

        //     const grantNumberExist = await getDocs(query(collection(db, 'coupons'), where('granNumber', '==', String(fromNumber))))

        //     let coupons: ICoupons;

        //     if (grantNumberExist && fromNumber < toNumber) {
        //         coupons = {
        //             fullName: service.fullName || '',
        //             email: service.email,
        //             phone: service.phone || '',
        //             serviceName: name,
        //             grantNumber: fromNumber + 1,
        //             status: 'pending',
        //             grantTime: defaultExpiryDateAndTime(),
        //             expiryDate: defaultExpiryDateAndTime(18, 0)

        //         }
        //     } else {
        //         coupons = {
        //             fullName: service.fullName || '',
        //             email: service.email,
        //             phone: service.phone || '',
        //             serviceName: name,
        //             grantNumber: fromNumber,
        //             status: 'pending',
        //             grantTime: defaultExpiryDateAndTime(),
        //             expiryDate: defaultExpiryDateAndTime(18, 0)
        //         }
        //     }

        //     const data = await addDoc(collection(db, 'coupons'), coupons)
        //     const newNumber = { uid: data.id, ...coupons as ICoupons }
        //     return newNumber
        // } else {
        //     return rejectWithValue('No such document!')
        // }
    } catch (err) {
        return rejectWithValue(err)
    }
})

const NumberSlice = createSlice({
    name: 'number',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(newNumber.fulfilled, (state, action) => {
            // if (action.payload) {
            //     state.coupons.push(action.payload)
            // }
        })
    }
})

export default NumberSlice.reducer