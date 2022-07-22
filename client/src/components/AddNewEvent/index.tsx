import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { BsFillCalendar2PlusFill } from 'react-icons/bs'
import { fetchAllEvents, postNewEvent } from '../../slices/scheduleSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { ICreateEventForm } from '../../types'
import { converterShortenedDayToExtended, days, getAllChildrenElements, hours } from '../../utils'

type Props = {
    modal: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    scheduleTimesRef: React.RefObject<HTMLDivElement>,
}

const AddNewEvent: React.FC<Props> = ({modal, setModal, scheduleTimesRef}) => {

    const event = useAppSelector(state => state.schedule);
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const initialState: ICreateEventForm = {
        hour: '',
        day: '',
        lesson: '',
        trainer: ''
    };

    const [ form, setForm ] = useState<ICreateEventForm>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.currentTarget.reset();

        let isValid = true;
        switch (isValid) {
            case form.day === '' :
                isValid = false;
                alert('Day should\'nt be empty!');
                break;
            case form.hour === '' :
                isValid = false;
                alert('Hour should\'nt be empty!');
                break;
            case form.lesson?.match(/^.{2,13}$/) === null :
                isValid = false;
                alert(`Lesson name should be between 2-13 characters!`);
                break;
            case form.trainer === '' :
                isValid = false;
                alert(`Trainer shouldn't be empty!`);
                break;
            default:

                try {

                    const response = await dispatch(postNewEvent(form));

                    if (response.payload.status !== true) {

                        // to catch error from response
                        const originalPromiseResult = await unwrapResult(response);
                        throw originalPromiseResult; 

                        //https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
                        // console.log(originalPromiseResult)
                        
                    } else {

                        // if response is ok
                        await dispatch(fetchAllEvents());
                        setModal(false)

                    }
                    
                } catch (error: any) {
                    alert(error.response.data.message);
                }
                break;
        };
    };

    useEffect(() => {

        // Parent element of schedule table events
        const allSchedueElements = getAllChildrenElements(scheduleTimesRef);
    
        allSchedueElements.forEach(e => {
    
          // we are found DOM element that hour and day data matches added events data
    
          if (e.getAttribute('data-hour') === event.addedScheduleEvent?.hour && e.getAttribute('data-day') === event.addedScheduleEvent.day) {
              
            e.dataset.trainer = event.addedScheduleEvent.trainer as string;
            e.dataset._id = event.addedScheduleEvent._id as string;
            e.dataset.lesson = event.addedScheduleEvent.lesson as string;
            e.textContent = e.getAttribute('data-lesson');
          }
        });
    
        // check this operation every time updating addedScheduleEvent (after we are sending post request)
      }, [event.addedScheduleEvent]);

  return (
        <form className='flex flex-col items-start p-8 gap-4' onSubmit={e => handleSubmit(e)}>
            <div className='flex gap-4 items-center'>
                <label className='font-bold'>Day</label>
                <select defaultValue='default' className='border-gray-300 border-solid border-2 p-2 bg-cyan-50 focus:bg-teal-100' onChange={e => handleChange(e)} name="day">
                    <option disabled value="default">Select day</option>
                    {
                        days.map((d) => <option value={d} key={d}>{converterShortenedDayToExtended(d)}</option>)
                    }
                </select>
            </div>
            <div className='flex gap-4 items-center'>
                <label className='font-bold'>Hour</label>
                <select defaultValue='default' className='border-gray-300 border-solid border-2 p-2 bg-cyan-50 focus:bg-teal-100' onChange={e => handleChange(e)} name="hour">
                    <option disabled value="default">Select hour</option>
                    {
                        hours.map((h) => <option value={h} key={h}>{h}</option>)
                    }
                </select>
            </div>
            <div className='flex gap-4 items-center'>
                <label className='font-bold'>Lesson</label>
                <input className='border-gray-300 border-solid border-2 p-2 bg-cyan-50 focus:bg-teal-100' onChange={e => handleChange(e)} type="text" name='lesson' />
            </div>
            <div className='flex gap-4 items-center'>
                <label className='font-bold'>Trainer</label>
                <select className='border-gray-300 border-solid border-2 p-2 bg-cyan-50 focus:bg-teal-100' onChange={e => handleChange(e)} defaultValue='default' name="trainer">
                    <option disabled value="default">Select trainer</option>
                    {
                        user.allUser?.filter( u => u.role === 'trainer')
                        .map((u, i) => <option key={i} value={`${u.firstName} ${u.lastName}`}>{u.firstName} {u.lastName}</option> )
                    }
                </select>
            </div>
            <div className='flex justify-center w-full'>
                <button 
                    className='px-3 py-2 gap-2 bg-green-600 hover:bg-green-400 text-white flex justify-center items-center'
                >
                    <BsFillCalendar2PlusFill />
                    Add Event
                </button>
            </div>
        </form>
  )
}

export default AddNewEvent