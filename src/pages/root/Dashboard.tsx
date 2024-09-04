import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { Article1, Article2, Article3, Article4 } from '@/assets'
import { Article, Aside } from '@/components'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { getAllResult } from '@/redux/slices/countSlice'
import { getMonth, getDays, getWeeks } from '@/redux/slices/chartSlice'
import ChartLine from '@/components/Chart/ChartLine'
import { ChartData, Point } from 'chart.js/auto'
import { Link } from 'react-router-dom'
import timeStatistics from '@/helpers/time'

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const [changeTime, setChangeTime] = useState<string>('days')
    const [isLoading, setIsLoading] = useState(false)
    const { all, fulfilled, pending, rejected } = useAppSelector((state: RootState) => state.count.giveNumber)
    const chart = useAppSelector((state: RootState) => state.chart)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getAllResult()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    useEffect(() => {
        dispatch(getMonth())
    }, [dispatch])

    useEffect(() => {
        dispatch(getDays())
    }, [dispatch])

    useEffect(() => {
        dispatch(getWeeks())
    }, [dispatch])

    const data = [
        {
            label: 'Số thứ tự đã cấp',
            icon: Article1,
            quantity: all,
            color: 'bg-[#e8effe]',
            query: '/give-number?selected=all',
        },
        {
            label: 'Số thứ tự đã cấp',
            icon: Article2,
            quantity: fulfilled,
            color: 'bg-[#e1f7e6]',
            query: '/give-number?selected=fulfilled',
        },
        {
            label: 'Số thứ tự đang chờ',
            icon: Article3,
            quantity: pending,
            color: 'bg-[#fff3e9]',
            query: '/give-number?selected=pending',
        },
        {
            label: 'Số thứ tự đã bỏ qua',
            icon: Article4,
            quantity: rejected,
            color: 'bg-[#fee9e9]',
            query: '/give-number?selected=rejected',
        },
    ]

    const line: ChartData<'line', (number | Point | null)[], unknown> = {
        labels: timeStatistics()[changeTime],
        datasets: [
            {
                data: chart[changeTime],
                fill: true,
                backgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart

                    if (!context.chart.chartArea) {
                        return
                    }

                    const gradientBg = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    gradientBg.addColorStop(0, '#CEDDFF')
                    gradientBg.addColorStop(1, '#ceddff00')

                    return gradientBg
                },
                borderColor: '#5185f7',
                borderWidth: 1,
                pointBorderColor: 'white',
                pointBorderWidth: 1,
                pointBackgroundColor: '#5185f7',
                tension: 0.4,
                animation: {
                    duration: 500,
                    delay: 50,
                    easing: 'easeInOutExpo',
                },
            },
        ],
    }

    const handleChangeSelectTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChangeTime(e.target.value)
    }

    if (isLoading) {
        return <div>Loading</div>
    }

    return (
        <div className="flex w-[calc(100%_-_427px)] h-[calc(100%_-_58px)] overflow-hidden">
            <div className="px-6 mt-2 flex-1">
                <h2 className="text-primaryColor font-bold text-2xl leading-9 mb-2">Biều đồ cấp số</h2>
                <div className="flex items-center gap-[13px]">
                    {data.map((item, index) => (
                        <Link key={index} className="block w-1/4" to={item.query as string}>
                            <Article icon={item.icon} color={item.color} label={item.label} quantity={item.quantity} />
                        </Link>
                    ))}
                </div>
                <div className="w-full mt-2">
                    <ChartLine chartData={line} changeTime={changeTime} onChange={handleChangeSelectTime} />
                </div>
            </div>
            <Aside />
        </div>
    )
}

export default Dashboard
