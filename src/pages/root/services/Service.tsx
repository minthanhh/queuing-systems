// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AddSquare, SearchIcon } from '@/assets'
import { Manager, Table } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import SelectCustome from '@/components/Select/Select'
import { ColumnDef } from '@tanstack/react-table'
import { ServiceType } from '@/types'
import { ActionDetail, ActionUpdate, ActiveState } from '@/components/Columns'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { getServices } from '@/redux/slices/serviceSlice'
import { RootState } from '@/redux/store'

const Service = () => {
    const [selected, setSelected] = useState('all')
    const [globalFilter, setGlobalFilter] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    let { services } = useAppSelector((state: RootState) => state.service)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getServices()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    const options = useMemo(
        () => [
            { type: 'all', label: 'Tất cả' },
            { type: 'active', label: 'Hoạt động' },
            { type: 'in-active', label: 'Ngưng hoạt động' },
        ],
        [],
    )
    const columns = useMemo<ColumnDef<ServiceType>[]>(
        () => [
            {
                header: 'Mã dịch vụ',
                accessorKey: 'id',
            },
            {
                header: 'Tên dịch vụ ',
                accessorKey: 'name',
            },
            {
                header: 'Mô tả',
                accessorKey: 'description',
            },
            {
                header: 'Trạng thái hoạt động',
                accessorKey: 'status',
                cell: ActiveState,
            },
            {
                header: '',
                accessorKey: 'detail',
                cell: (cell) => ActionDetail(cell, 'services/detail-service'),
            },
            {
                header: '',
                accessorKey: 'update',
                cell: (cell) => ActionUpdate(cell, 'services/update-service'),
            },
        ],
        [],
    )

    if (selected === 'active') {
        services = services.filter((item) => item.status === selected)
    }

    if (selected === 'in-active') {
        services = services.filter((item) => item.status === selected)
    }

    return (
        <div className="w-full">
            <div className="mt-4 pl-6">
                <h2 className="text-primaryColor font-bold leading-9 text-2xl mb-4">Quản lý dịch vụ</h2>
                <div className="flex items-center justify-between mb-4 mr-[106px]">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <h6 className="leading-6 font-semibold text-base text-[#282739] mb-1">Từ khoá</h6>
                            <SelectCustome onChange={(e) => setSelected(e.target.value)} options={options} value={selected} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h6 className="leading-6 font-semibold text-base text-[#282739] mb-1">Từ khoá</h6>
                        <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
                            <input value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} className="outline-none" type="text" placeholder="Nhập từ khóa" />
                            <img src={SearchIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-6">
                <Table columns={columns} data={services} onGlobalFilterChange={setGlobalFilter} globalFilter={globalFilter} isLoading={isLoading} />
                <Manager icon={AddSquare} label="Thêm dịch vụ" path="/services/add-service" />
            </div>
        </div>
    )
}

export default Service

// const DropdownIndicator = (props: DropdownIndicatorProps) => {
//    return (
//       <components.DropdownIndicator {...props} className="p-0">
//          <img src={DropDown} alt="" />
//       </components.DropdownIndicator>
//    );
// };

// <div className="flex w-full">
//          <div className="mt-4 flex-1">
//             <h2 className="text-primaryColor px-6 font-bold text-2xl leading-9 mb-4">
//                Danh sách thiết bị
//             </h2>
//             <div className="flex items-center px-6 justify-between mb-4 mr-[108px]">
//                <div className="flex items-center gap-6">
//                   <div>
//                      <h6 className="mb-1 text-[#282739]">
//                         Trạng thái hoạt động
//                      </h6>
//                      <Select
//                         defaultValue={{ label: 'Tất cả' }}
//                         options={[
//                            { label: 'Tất cả' },
//                            { label: 'Hoạt động' },
//                            { label: 'Ngưng hoạt động' },
//                         ]}
//                         components={{
//                            IndicatorSeparator: null,
//                         }}
//                         classNames={{
//                            control: () => 'border-[#d4d4d7] border-[1.5px]',
//                            input: () => 'text-[#535261] w-[300px]',
//                            option: () =>
//                               'text-base font-normal leading-6 text-[#535261] hover:bg-[#fff2e7]',
//                         }}
//                      />
//                   </div>
//                   <div>
//                      <h6 className="mb-1 text-[#282739]">Chọn thời gian</h6>
//                   </div>
//                </div>
//                <div>
//                   <h6>Từ khoá</h6>
//                   <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
//                      <input
//                         className="outline-none"
//                         type="text"
//                         placeholder="Nhập từ khóa"
//                      />
//                      <img src={SearchIcon} alt="" />
//                   </div>
//                </div>
//             </div>

//             <div className="flex items-start">
//                <Manager
//                   icon={AddSquare}
//                   label="Thêm dịch vụ"
//                   path="/services/add-service"
//                />
//             </div>
//          </div>
//       </div>
