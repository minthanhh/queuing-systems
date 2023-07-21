interface StatisticState {
    [key: string]: number[]
}

const timeStatistics = (): StatisticState  => {
    const currentDateUTC = new Date()
    const vietnamTimeOffset = 7 * 60 * 60 * 1000;
    const currentDateVietnam = new Date(currentDateUTC.getTime() + vietnamTimeOffset);
    const month = currentDateVietnam.getMonth() + 1;
    const year = currentDateVietnam.getFullYear()

    const getDaysInMonth = (year: number, month: number) => {
        const daysInMonth = new Date(year, month, 0).getDate()
        const daysArray = [];
    
        for (let day = 1; day <= Number(daysInMonth); day++) {
           const date = new Date(year, month - 1, day); // month - 1 because months are zero-based in JavaScript
           const dayOfWeek = date.getDay();
    
           // Check if the day is not Saturday (6) and not Sunday (0)
           if (dayOfWeek !== 0 && dayOfWeek !== 6) {
              daysArray.push(date.getDate());
           }
        }
    
        return daysArray;
    };

    const getWeeksInMonthFromDateString = (year: number, month: number) => {
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const totalDays = lastDayOfMonth.getDate();
      const firstMonday =
        firstDayOfMonth.getDay() === 0 ? 2 : 9 - firstDayOfMonth.getDay();

      const weeks = [];
      let currentWeek = 1;

      let currentDay = firstMonday;
      while (currentDay <= totalDays) {
        weeks.push(currentWeek);
        currentWeek++;
        currentDay += 7;
      }

      return weeks;
    }

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return { months, days: getDaysInMonth(year, month), weeks: getWeeksInMonthFromDateString(year, month) }
}

export default timeStatistics