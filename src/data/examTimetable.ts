export type TimetableEntry = {
    day: string
    time: string
    subject: string
}

export const examTimetables: Record<string, TimetableEntry[]> = {
    'Primary (I–V)': [
        { day: 'Monday', time: '09:00 - 10:00', subject: 'Mathematics' },
        { day: 'Tuesday', time: '09:00 - 10:00', subject: 'English' },
        { day: 'Wednesday', time: '09:00 - 10:00', subject: 'Tamil' },
        { day: 'Thursday', time: '09:00 - 10:00', subject: 'Environmental Science' },
        { day: 'Friday', time: '09:00 - 10:00', subject: 'Art & Craft' },
    ],
    'Middle (VI–VIII)': [
        { day: 'Monday', time: '09:00 - 10:30', subject: 'Mathematics' },
        { day: 'Tuesday', time: '09:00 - 10:30', subject: 'Science' },
        { day: 'Wednesday', time: '09:00 - 10:30', subject: 'English' },
        { day: 'Thursday', time: '09:00 - 10:30', subject: 'Social Science' },
        { day: 'Friday', time: '09:00 - 10:30', subject: 'Computer Science' },
    ],
    'High School (IX–X)': [
        { day: 'Monday', time: '09:00 - 11:00', subject: 'Mathematics' },
        { day: 'Tuesday', time: '09:00 - 11:00', subject: 'Science' },
        { day: 'Wednesday', time: '09:00 - 11:00', subject: 'English' },
        { day: 'Thursday', time: '09:00 - 11:00', subject: 'Social Science' },
        { day: 'Friday', time: '09:00 - 11:00', subject: 'Second Language' },
    ],
    'Hr. Sec. (XI–XII)': [
        { day: 'Monday', time: '09:00 - 12:00', subject: 'Physics' },
        { day: 'Tuesday', time: '09:00 - 12:00', subject: 'Chemistry' },
        { day: 'Wednesday', time: '09:00 - 12:00', subject: 'Mathematics / Biology' },
        { day: 'Thursday', time: '09:00 - 12:00', subject: 'English' },
        { day: 'Friday', time: '09:00 - 12:00', subject: 'Computer Science / Commerce' },
    ],
}

export default examTimetables
