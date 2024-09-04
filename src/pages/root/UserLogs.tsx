import { useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { IUserLogs } from '@/types'
import { Table } from '@/components'
import { SearchIcon } from '@/assets'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/redux/store'
import { getUserLogs } from '@/redux/slices/userLogsSlice'

const UserLogs = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const dispatch = useAppDispatch()
    const { userLogs } = useAppSelector((state: RootState) => state.userLogs)

    useEffect(() => {
        setIsLoading(true)

        dispatch(getUserLogs())
            .then(() => {
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }, [dispatch])

    const columns = useMemo<ColumnDef<IUserLogs>[]>(
        () => [
            {
                header: 'Tên đăng nhập',
                accessorKey: 'username',
            },
            {
                header: 'Thời gian tác động',
                accessorKey: 'impactTime',
            },
            {
                header: 'IP thực hiện',
                accessorKey: 'ipDone',
            },
            {
                header: 'Thao tác thực hiện',
                accessorKey: 'operations',
            },
        ],
        [],
    )

    return (
        <div className="w-full">
            <div className="pl-6 pr-[105px] flex justify-end mb-4">
                <div className="w-[260px]">
                    <h6>Từ khoá</h6>
                    <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
                        <input value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} className="outline-none" type="text" placeholder="Nhập từ khóa" />
                        <img src={SearchIcon} alt="" />
                    </div>
                </div>
            </div>
            <Table columns={columns} data={userLogs} globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter} className="pr-[105px]" isLoading={isLoading} />
        </div>
    )
}

export default UserLogs
