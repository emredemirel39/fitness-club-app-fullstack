import React from 'react'
import Schedule from '../../../components/Schedule';

const CalendarPage: React.FC= () => {
  return (
    <div className='flex flex-col items-center'>
        <h1 className='cursor-default font-bold text-2xl mb-4'>Weekly Schedule</h1>
        <Schedule/>
    </div>
  )
}

export default CalendarPage;