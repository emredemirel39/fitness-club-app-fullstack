import React, { createRef, useEffect, useState } from 'react';
import { BsFillCalendar2PlusFill } from 'react-icons/bs'
import { fetchAllEvents, selectEvent } from '../../slices/scheduleSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { IScheduleEvent } from '../../types';
import { hours, days, getAllChildrenElements } from '../../utils';
import AddNewEvent from '../AddNewEvent';
import Modal from '../Modal';
import ScheduleEvent from '../ScheduleEvent';
import styles from './Schedule.module.scss';

const Schedule = () => {

  const scheduleTimesRef = createRef<HTMLDivElement>();

  const schedule = useAppSelector(state => state.schedule);
  const users = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const initialState: IScheduleEvent = {
    hour: '',
    day: '',
    lesson: '',
    trainer: '',
    _id: ''
  };

  const [ selectedFromSchedule, setSelectedFromSchedule ] = useState<IScheduleEvent>(initialState)
  const [ modalScheduleEvent, setModalScheduleEvent ] = useState<boolean>(false);
  const [ modalAddNewEvent, setModalAddNewEvent ] = useState<boolean>(false);

  const handleSelect = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    setSelectedFromSchedule({
      hour: e.currentTarget.getAttribute('data-hour'),
      day: e.currentTarget.getAttribute('data-day'),
      trainer: e.currentTarget.getAttribute('data-trainer'),
      lesson: e.currentTarget.getAttribute('data-lesson'),
      _id: e.currentTarget.getAttribute('data-_id')
    });

    setModalScheduleEvent(true)

  };

  useEffect(() => {
    // We reached all boxes in the schedule
    const allSchedueElements = getAllChildrenElements(scheduleTimesRef);

    allSchedueElements.forEach(e => {

      // we are found DOM element that hour and day data matches deleted events data after delete request

      if (e.getAttribute('data-hour') === schedule.deletedScheduleEvent?.hour && e.getAttribute('data-day') === schedule.deletedScheduleEvent?.day) {
          
        e.dataset.trainer = '';
        e.dataset._id = '';
        e.dataset.lesson = '';
        e.textContent = '';
      }
    });
  }, [schedule.deletedScheduleEvent])

  useEffect(() => {
    // We reached all boxes in the schedule ==> scheduleTimesRef.current?.childNodes.forEach(child => child.childNodes.forEach(child => console.log(child.textContent)));

    dispatch(fetchAllEvents());

    const allSchedueElements = getAllChildrenElements(scheduleTimesRef);

      allSchedueElements.forEach(e => {

        schedule.allSchedule?.forEach(data => {

          // if hour and day of the data from database and data from DOM are matches, we are setting id, lesson and trainer data to element

          if (e.getAttribute('data-hour') === data.hour && e.getAttribute('data-day') === data.day) {
            
            e.dataset.trainer = data.trainer as string;
            e.dataset._id = data._id as string;
            e.dataset.lesson = data.lesson as string;
            e.textContent = e.getAttribute('data-lesson');
          }
        });
      });

      // set the information of the clicked element to the global state
      dispatch(selectEvent(selectedFromSchedule));

  }, [selectedFromSchedule]);

  return (
    <div className='flex flex-col w-full items-center gap-10' >
        <div className={styles.scheduleContainer}>
          <div className={styles.scheduleHourTitlesCol}>
            {/* Empty Box in the left corner of the table */}
            <div className='h-14 lg:h-16 w-20 lg:w-32'></div>
            {/* Schedule hour titles wrapper */}
            <div className={styles.scheduleHourTitlesWrap}>
              {
                hours.map((hour, i) => <div key={i} className={styles.scheduleHourTitles}>{hour}</div> )
              }
            </div>
          </div>

          <div className='flex flex-col w-full items-center'>
              <div className={styles.scheduleDayTitlesRow}>
                {
                  days.map((day, i) => (
                    <span 
                      className={styles.scheduleDayTitles} 
                      key={i}>{day}
                    </span>
                  ))
                }
              </div>
              {/* Schedule Main info Wrappaer */}
              <div ref={scheduleTimesRef} className={styles.scheduleAllEventsWrap}>
                {
                  hours.map((hour, i) =>(
                    <div className={styles.scheduleAllEventsRow} key={hour}>
                      {days.map((day, i) => (
                        <div 
                          key={i}
                          className={styles.scheduleAllEvents}
                          data-day={day} 
                          data-hour={hour}
                          data-trainer=''
                          data-lesson=''
                          data-_id='' 
                          onClick={e => handleSelect(e)}
                        > 
                        </div>
                      ))}
                    </div>
                  ))
                }
              </div>
          </div>
        </div>
        <div>
                {
                  users.currentUser?.role === 'admin' || users.currentUser?.role === 'manager'
                  ? (
                    <button className={styles.addEventBtn} onClick={() => setModalAddNewEvent(true)}>
                      <BsFillCalendar2PlusFill />
                      Add New Event
                    </button>
                  )
                  : ''
                }
        </div>
        <Modal modal={modalScheduleEvent} setModal={setModalScheduleEvent} >
          <ScheduleEvent modal={modalScheduleEvent} setModal={setModalScheduleEvent} scheduleTimesRef={scheduleTimesRef} />
        </Modal>
        <Modal modal={modalAddNewEvent} setModal={setModalAddNewEvent}>
          <AddNewEvent scheduleTimesRef={scheduleTimesRef} modal={modalAddNewEvent} setModal={setModalAddNewEvent}/>
        </Modal>
    </div>
  )
}

export default Schedule