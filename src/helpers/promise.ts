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
        const coll = collection(db, 'manager-accounts');
        const q = query(coll, where('role', '==', 'manager'));
        const snapShot = await getCountFromServer(q);
        return snapShot.data().count;
    };

    const getCountUsersRolesAccountant = async (): Promise<number> => {
        const coll = collection(db, 'manager-accounts');
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

export { getCountAllUserRoles }


