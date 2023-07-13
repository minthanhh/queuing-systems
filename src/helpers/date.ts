export default function defaultExpiryDateAndTime (hours?: number, minutes?: number) {
    const currentDate = new Date()

    if (hours !== undefined && minutes !== undefined) {
        currentDate.setHours(hours)
        currentDate.setMinutes(minutes)

        const date = currentDate.toLocaleDateString('vi-VI', { timeZone: 'Asia/Ho_Chi_Minh'})
        // const time = currentDate.toLocaleTimeString('vi-VI', { timeZone: 'Asia/Ho_Chi_Minh'})
    
        let getHours = currentDate.getHours()
        let getMinutes: number | string = currentDate.getMinutes()
        if (getMinutes === 0) {
            getMinutes = currentDate.getMinutes().toString().padStart(2, '0')
        } else {
            getMinutes = currentDate.getMinutes()
        }
    
        return `${getHours}:${getMinutes} - ${date}`
    } else {
        const date = currentDate.toLocaleDateString('vi-VI', { timeZone: 'Asia/Ho_Chi_Minh'})
        const getHours = currentDate.getHours()
        const getMinutes = currentDate.getMinutes()

        return `${getHours}:${getMinutes} - ${date}`
    }
}


