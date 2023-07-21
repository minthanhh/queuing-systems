import { db } from "@/configs/firebase.config";
import timeStatistics from "@/helpers/time";
import { IGiveNumber } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

interface StatisticState {
  [key: string]: number[]
}

const initialState: StatisticState = {
  months: [],
  days: [],
  weeks: []
}


const getWeeksInMonthFromDateString = (month: number, year: number) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const totalDays = lastDayOfMonth.getDate();
  const firstMonday = firstDayOfMonth.getDay() === 0 ? 2 : 9 - firstDayOfMonth.getDay();

  const weeks = [];
  let currentWeek = 1;

  let currentDay = firstMonday;
  while (currentDay <= totalDays) {
    const startOfWeek = currentDay;
    currentDay += 6;
    const endOfWeek = Math.min(currentDay, totalDays);

    weeks.push({
      weekNumber: currentWeek,
      startDate: startOfWeek,
      endDate: endOfWeek,
    });

    currentWeek++;
    currentDay += 1;
  }

  return weeks;
}

export const getWeeks = createAsyncThunk('statistic/getWeeks', async (_, thunk) => {
  try {
    const currentDateUTC = new Date()
    const vietnamTimeOffset = 7 * 60 * 60 * 1000;
    const currentDateVietnam = new Date(currentDateUTC.getTime() + vietnamTimeOffset);
    const month = currentDateVietnam.getMonth() + 1;
    const year = currentDateVietnam.getFullYear() 
    const coll = collection(db, 'give-numbers')
    const querySnapshot = await getDocs(coll);
    const data = querySnapshot.docs.map((doc) => doc.data() as IGiveNumber)
    const filterMonths = [...data].filter((item) => item.grantTime.split(' - ')[1].includes(`/${month}/`))
    const weeks = getWeeksInMonthFromDateString(month, year)

     const getDaysForWeeks = weeks.map(week => {
      const { endDate, startDate } = week
      
      const checkDaysForWeeks = [...filterMonths].filter(item => {
        const number = item.grantTime.split(' - ')[1].split('/')[0] 
        return Number(number) >= startDate && Number(number) <= endDate
      })      
      return checkDaysForWeeks.length
    })

    return getDaysForWeeks   
  } catch (err) {
      return thunk.rejectWithValue(err)
  }
})

export const getMonth = createAsyncThunk('statistic/getMonth', async (_, thunk) => {
  try {

    const REGEX_MONTH = 12
    const coll = collection(db, 'give-numbers')
    const querySnapshot = await getDocs(coll);
    let list: number[] = []
    const data = querySnapshot.docs.map((doc) => doc.data() as IGiveNumber)
    Array(REGEX_MONTH).fill({}).forEach((_, idx) => {
      ++idx;
      const test = [...data].filter((item) => {
        return item.grantTime.includes(`/${String(idx)}/`)
      })

      list.push(test.length)
    })

    return list
  } catch (err) {
    return thunk.rejectWithValue(err)
  }
})

export const getDays = createAsyncThunk('statistic/getDays', async (_, thunk) => {
    try {
        const currentDateUTC = new Date()
        const vietnamTimeOffset = 7 * 60 * 60 * 1000;
        const currentDateVietnam = new Date(currentDateUTC.getTime() + vietnamTimeOffset);
        const month = currentDateVietnam.getMonth() + 1;
        const year = currentDateVietnam.getFullYear()
        const { days } = timeStatistics() as { months: number[], days: number[] }
        const coll = collection(db, 'give-numbers')
        const querySnapshot = await getDocs(coll);
        let validDays: number[] = []
        const data = querySnapshot.docs.map((doc) => doc.data() as IGiveNumber)
        const daysInJulyWithoutSatSun = days
        daysInJulyWithoutSatSun.forEach(number => {
            const text = `${number.toString().padStart(2, '0')}/${month}/${year}`
            const test = [...data].filter(current => current.grantTime.includes(text))
            validDays.push(test.length)
        })

        return validDays
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMonth.fulfilled, (state, action) => {
      state.months = action.payload
    })

    builder.addCase(getDays.fulfilled, (state, action) => {
        if (action.payload) {
            state.days = action.payload
        }
    })

    builder.addCase(getWeeks.fulfilled, (state, action) => {
        if (action.payload) {
          state.weeks = action.payload
        }
    })
  }
})

export default statisticSlice.reducer