import React, { useEffect, useState } from 'react'
import { deleteEvent, fetchAllEvents } from '../../slices/scheduleSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { IScheduleEvent } from '../../types'
import { converterShortenedDayToExtended, getAllChildrenElements } from '../../utils'

type Props = {
  modal: boolean,
  scheduleTimesRef: React.RefObject<HTMLDivElement>,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ScheduleEvent: React.FC<Props> = ({modal, setModal, scheduleTimesRef}) => {

  // Global state
  const event = useAppSelector(state => state.schedule);
  const { selectedScheduleEvent } = event;
  const users = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [ isDeleted, setIsDeleted ] = useState(false);

  const handleDelete = async () => {

    if (selectedScheduleEvent?._id !== '') { // if clicked element is not empty

      await dispatch(deleteEvent(selectedScheduleEvent?._id as string));
      await dispatch(fetchAllEvents());
      setIsDeleted(!isDeleted)

    }
    setModal(false)
  };

  useEffect(() => {

    // Parent element of schedule table events
    const allSchedueElements = getAllChildrenElements(scheduleTimesRef);

    allSchedueElements.forEach(e => {

      // we are found DOM element that hour and day data matches deleted events data

      if (e.getAttribute('data-hour') === selectedScheduleEvent?.hour && e.getAttribute('data-day') === selectedScheduleEvent.day) {
          
        e.dataset.trainer = '';
        e.dataset._id = '';
        e.dataset.lesson = '';
        e.textContent = '';
      }
    });

    // check this operation every time we are fetching all events (after we are sending delete request)
  }, [isDeleted]);

  return (
      <div className='flex flex-col items-start p-8 gap-4'>
          <div className='w-full flex justify-center'>
            {
              selectedScheduleEvent?.lesson !== '' && <h4 className='text-2xl font-bold uppercase'>{selectedScheduleEvent?.lesson}</h4>
            }
          </div>
        <p><b>Day: </b>{converterShortenedDayToExtended(selectedScheduleEvent?.day as string)}</p>

        <p><b>Hour: </b>{selectedScheduleEvent?.hour}</p>


        <p><b>Lesson: </b>{selectedScheduleEvent?.lesson}</p>

        <p><b>Trainer: </b>{selectedScheduleEvent?.trainer}</p>

        <div className='w-full flex justify-center'>
            {
              users.currentUser?.role === 'admin' || users.currentUser?.role === 'manager'
              ? (
                  <button className='px-3 py-2 bg-rose-700 hover:bg-rose-600 text-white' type='button' onClick={() => handleDelete()}>Delete</button>
              ) : ''
            }
        </div>
      </div>
  )
}

export default ScheduleEvent