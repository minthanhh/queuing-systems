import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

interface IAllUserRoles {
    countUserRolesAdmin: number, 
    countUserRolesManager: number
    countUserRolesAccountant: number
}

const getCountAllUserRoles = async (): Promise<IAllUserRoles> => {
    const coll = collection(db, 'manager-accounts');

    const getCountUserRolesAdmin = async (): Promise<number> => {
        const q = query(coll, where('role', '==', 'admin'));
        const snapShot = await getCountFromServer(q);
        return snapShot.data().count;
    };

    const getCountUsersRolesManager = async (): Promise<number> => {
        const q = query(coll, where('role', '==', 'manager'));
        const snapShot = await getCountFromServer(q);
        return snapShot.data().count;
    };

    const getCountUsersRolesAccountant = async (): Promise<number> => {
        const q = query(coll, where('role', '==', 'accountant'));
        const snapShot = await getCountFromServer(q);
        return snapShot.data().count;
    };

    const [countUserRolesAdmin, countUserRolesManager, countUserRolesAccountant] = await Promise.all([
        getCountUserRolesAdmin(),
        getCountUsersRolesManager(),
        getCountUsersRolesAccountant()
    ]);
 
    return { countUserRolesAdmin, countUserRolesManager, countUserRolesAccountant };
}


const coll = collection(db, 'give-numbers')

const getAllGiveNumber = async () => {
    const snapShot = await getCountFromServer(coll);
    return snapShot.data().count
}

const getSequenceNumberUsed = async () => {
    const q = query(coll, where('status','==','fulfilled'))
    const snapShot = await getCountFromServer(q);
    return snapShot.data().count
}

const getSequenceIsWaiting = async () => {
    const q = query(coll, where('status','==','pending'))
    const snapShot = await getCountFromServer(q);
    return snapShot.data().count
}

const getSequenceNumberOmitted = async () => {
    const q = query(coll, where('status','==','rejected'))
    const snapShot = await getCountFromServer(q);
    return snapShot.data().count
}

const getTotalResults = async () => {
    const getAllGiveNumberPromise = getAllGiveNumber()
    const getSequenceNumberUsedPromise = getSequenceNumberUsed()
    const getSequenceIsWaitingPromise = getSequenceIsWaiting()
    const getSequenceNumberOmittedPromise = getSequenceNumberOmitted()

    const [resultAllGiveNumber, resultSequenceNumberUsed, resultSequenceIsWaiting, resultSquenceNumberOmitted] = await Promise.all([
        getAllGiveNumberPromise,
        getSequenceNumberUsedPromise,
        getSequenceIsWaitingPromise,
        getSequenceNumberOmittedPromise
    ]);
 
    return { resultAllGiveNumber, resultSequenceNumberUsed, resultSequenceIsWaiting, resultSquenceNumberOmitted };
}


const getAllTotal = async (collName: string) => {
    const coll = collection(db, collName) 

    const totalActive = async () => {
        const q = query(coll, where('status','==', 'active'))
        const querySpanShot = await getCountFromServer(q)
        return querySpanShot.data().count 
    }

    const totalUnActive = async () => {
        const q = query(coll, where('status','==', 'in-active'))
        const querySpanShot = await getCountFromServer(q)
        return querySpanShot.data().count
    }

    const totalAll = async () => {
        const querySpanShot = await getCountFromServer(coll)
        return querySpanShot.data().count
    }

    const [resultTotalActive, resultTotalUnActive, resultTotal] = await Promise.all([
        totalActive(), 
        totalUnActive(), 
        totalAll()
    ])

    return { active: resultTotalActive, unactive: resultTotalUnActive, total: resultTotal }
}

const getAllTotalCount = async () => {
    const resultDevice = getAllTotal('devices')
    const resultService = getAllTotal('services')

    const [device, service] = await Promise.all([
        resultDevice,
        resultService
    ])
    return { device, service}
}


export { getCountAllUserRoles, getTotalResults, getAllTotalCount }


