import { Column, ColumnDef, Table as TableType } from '@tanstack/react-table'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { utils, writeFileXLSX } from 'xlsx'

import { IReport } from '@/types'
import { ActionCondition } from '@/components/Columns'
import { Manager, Table } from '@/components'
import { DownloadIcon, ArrowIcon } from '@/assets'
import Skeleton from 'react-loading-skeleton'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { getPickFieldNumber } from '@/redux/slices/numberSlice'
import { RootState } from '@/redux/store'
import { SerializedError } from '@reduxjs/toolkit'

const Report = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const dispatch = useAppDispatch()
    const { reports } = useAppSelector((state: RootState) => state.number)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPickFieldNumber())
            .then(() => {
                setIsLoading(false)
            })
            .catch((err: SerializedError) => {})
    }, [dispatch])

    // const handleJsonFileDownload = () => {
    //    const reportsJson = reports;

    //    // create file in browser
    //    const fileName = 'reports.json'; //or fileName: reports
    //    const data = new Blob([JSON.stringify(reportsJson)], {
    //       type: 'text/json',
    //    });
    //    const jsonURL = window.URL.createObjectURL(data);

    //    // create "a" HTLM element with href to file
    //    const link = document.createElement('a') as HTMLAnchorElement;
    //    document.body.appendChild(link);
    //    link.href = jsonURL;
    //    link.setAttribute('download', fileName); // or link.download = fileName + ".json";
    //    link.click();
    //    // clean up "a" element & remove ObjectURL
    //    document.body.removeChild(link);
    //    URL.revokeObjectURL(jsonURL);
    // };

    const handleDownload = useCallback(() => {
        const ws = utils.json_to_sheet(reports)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, ws, 'Data')
        writeFileXLSX(wb, 'SheetReports.xlsx')
    }, [reports])

    const columns = useMemo<ColumnDef<IReport>[]>(
        () => [
            {
                header: (props) => <SelectFilter props={props} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} header="Số thứ tự" />,

                accessorKey: 'orderNumber',
            },
            {
                header: 'Tên dịch vụ',
                accessorKey: 'serviceName',
            },
            {
                header: 'Thời gian cấp',
                accessorKey: 'grantTime',
            },
            {
                header: 'Tình trạng',
                accessorKey: 'status',
                cell: (cell) => ActionCondition(cell),
            },
            {
                header: 'Nguồn cấp',
                accessorKey: 'source',
            },
        ],
        [globalFilter],
    )
    return (
        <div className="w-full mt-4">
            <div className="w-[320px] pl-6 mb-4">
                <h3 className="font-semibold text-base leading-6 text-[#282739] mb-1">Chọn thời gian</h3>
            </div>
            <div className="flex items-start gap-6">
                <Table columns={columns} data={reports} globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter} isLoading={isLoading} />

                {isLoading ? (
                    <div className="flex flex-col gap-1 px-1 bg-white shadow-lg text-center py-3 rounded-s-lg">
                        <Skeleton width={28} height={28} />
                        <Skeleton width={72} height={20} />
                    </div>
                ) : (
                    <Manager label="Tải về" type="download" icon={DownloadIcon} onClick={handleDownload} path="" />
                )}
            </div>
        </div>
    )
}

export default Report

interface Props<T> {
    table: TableType<T>
    column: Column<T, unknown>
}

interface SelectFilterProps<T> {
    props: Props<T>
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
    globalFilter: string
    header: string
}

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        square: true,
        elevation: 1,
        sx: {
            '&::-webkit-scrollbar': {
                width: 4,
                height: 64,
            },
            '&::-webkit-scrollbar-track': {},
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ffc89b',
                borderRadius: 8,
            },
            '&& .Mui-selected': {
                backgroundColor: '#fff2e7',
            },
        },
        style: {
            width: 226,
            borderRadius: 8,
        },
    },
}

const SelectFilter = <T,>({ props: { column, table }, setGlobalFilter, globalFilter, header }: SelectFilterProps<T>) => {
    const options = useMemo(() => {
        const options: { label: string; value: string }[] = []

        table.getPreFilteredRowModel().flatRows.forEach((row) => {
            const obj = row.getValue<T>(column.id)
            options.push({ label: obj as string, value: obj as string })
        })
        return [...options]
    }, [column.id, table])

    return (
        <div className="flex items-center w-full z-50">
            <FormControl fullWidth>
                <InputLabel id="orderNumberLabel">{header}</InputLabel>
                <Select
                    labelId="orderNumberLabel"
                    id="orderNumber"
                    label={header}
                    IconComponent={ArrowIconComponent}
                    value={globalFilter ?? ''}
                    onChange={(e: SelectChangeEvent) => setGlobalFilter(e.target.value)}
                    MenuProps={MenuProps}
                    style={{
                        overflow: 'hidden',
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                    }}>
                    <MenuItem className="text-left px-12 py-[11px] hover:bg-[#fff2e7] transition-all ease-in duration-150" value="">
                        Tât cả
                    </MenuItem>
                    {options.map((option, index) => (
                        <MenuItem className="text-left px-12 py-[11px] hover:bg-[#fff2e7] transition-all ease-in duration-150" key={`${option.value}-${index}`} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

const ArrowIconComponent = () => {
    return (
        <>
            <img src={ArrowIcon} alt="" />
        </>
    )
}
