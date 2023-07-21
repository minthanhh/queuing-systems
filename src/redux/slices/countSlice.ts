import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllTotalCount, getTotalResults } from "@/helpers/promise"

interface CountState {
    device: {
        total: number
        active: number
        unactive: number
    },
    service: {
        total: number
        active: number
        unactive: number
    },
    giveNumber: {
        all: number,
        pending: number,
        rejected: number,
        fulfilled: number
    }
   
}

const initialState: CountState = {
    device: {
        total: 0,
        active: 0,
        unactive: 0
    },
    service: {
        total: 0,
        active: 0,
        unactive: 0
    },
    giveNumber: {
        all: 0,
        pending: 0,
        rejected: 0,
        fulfilled: 0
    }
}



export const getAllResult = createAsyncThunk('number/getAllResult', async (_, thunk) => {
    try {
        const { 
            resultAllGiveNumber,
            resultSequenceIsWaiting,
            resultSequenceNumberUsed, 
            resultSquenceNumberOmitted  
        } = await getTotalResults()

        return { 
            all: resultAllGiveNumber, 
            pending: resultSequenceIsWaiting, 
            rejected: resultSquenceNumberOmitted, 
            fulfilled: resultSequenceNumberUsed 
        }
    } catch (err) {
        thunk.rejectWithValue(err)
    }
})

export const getTotalCounts = createAsyncThunk('/', async (_, thunk) => {
    try {
        const { device, service  } = await getAllTotalCount()
        return { device, service} 
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})



const CountSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {},
    extraReducers(builder) {
        
        builder.addCase(getAllResult.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumber = action.payload
            }
        })

        builder.addCase(getTotalCounts.fulfilled, (state, action) => {
            if (action.payload) {
                state.device = action.payload.device
                state.service = action.payload.service
            }
        })
    },
})

export default CountSlice.reducer