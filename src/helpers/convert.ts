import { Timestamp } from "firebase/firestore"

const locales = 'vi-VI'
const timeZone = 'Asia/Ho_Chi_Minh'

const createTimeAndConvertToVi = () => {
    return Timestamp.now().toDate().toLocaleString(locales, { timeZone})
}


export default createTimeAndConvertToVi