import React, { useState } from 'react'
import { HiUser } from 'react-icons/hi';
import Modal from '../../../components/Modal';
import SearchBar from '../../../components/SearchBar';
import SelectedUser from '../../../components/SelectedUser';
import { setSelectedUser } from '../../../slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { IUser } from '../../../types';
import styles from './AllUsersPage.module.scss';

const AllUsersPage = () => {

  const users = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [ filter, setFilter ] = useState<string>('');
  const [ modal, setModal ] = useState<boolean>(false);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setSelectedUser(null))
    setFilter(e.currentTarget.value);
  };

  const handleSelect = (user: IUser) => {
    dispatch(setSelectedUser(user));
    setModal(true);
  }

  const renderCondition = (u: IUser): boolean => {

    let returnedElement: boolean = false

    switch (users.currentUser?.role) {

      case 'member':
        returnedElement = u.role !== 'member' && u.role !== 'admin'
        break;

      case 'trainer':
        returnedElement = u.role !== 'admin'
        break;

        case 'admin':
          returnedElement = u.role !== 'foo'
          break;

        case 'manager':
          returnedElement = u.role !== 'foo'
          break;
    }

    return returnedElement
  }

  return (
    <div className='flex flex-col items-center h-screen w-full gap-6 max-w-full'>
      <h1 className='font-bold text-2xl cursor-default'>All Users</h1>
      <div className='w-full flex justify-center items-center'>
        <SearchBar modal={modal} setModal={setModal} />
      </div>
      <div className={styles.filterBtnsBox}>
        <button onClick={e => handleFilter(e)} value='' className={styles.filterBtns} >All</button>
        {
          users.currentUser?.role !== 'member' && <button onClick={e => handleFilter(e)} value='member' className={styles.filterBtns}>Members</button>
        }
        <button onClick={e => handleFilter(e)} value='trainer' className={styles.filterBtns}>Trainers</button>
        <button onClick={e => handleFilter(e)} value='manager' className={styles.filterBtns}>Managers</button>
        {
          users.currentUser?.role === 'manager' || users.currentUser?.role === 'admin' 
          ? <button onClick={e => handleFilter(e)} value='admin' className={styles.filterBtns}>Admins</button>
          : ''
        }
      </div>
      <ul className={styles.filteredUserContainer}>
          {
            filter === '' 
            ? users.allUser?.filter(u => u._id !== users.currentUser?._id)
              .filter(u => renderCondition(u))
              .map(user => (
                <li onClick={() => handleSelect(user)} key={user._id}>
                <div className={styles.userBox}>
                  <HiUser size='3em' className='fill-cyan-900' />
                  <h4 className='font-bold uppercase'>{user.firstName} {user.lastName}</h4>
                  <p><b>Role:</b> {user.role}</p>
                </div>
            </li>
            ))


            : users.allUser?.filter(u => u._id !== users.currentUser?._id)
            .filter(u => renderCondition(u))
            .filter(user => user.role === filter)
            .map(user => (
              <li onClick={() => handleSelect(user)} key={user._id}>
                  <div className={styles.userBox}>
                    <HiUser size='3em' className='fill-cyan-900' />
                    <h4 className='font-bold uppercase'>{user.firstName} {user.lastName}</h4>
                    <p><b>Role:</b> {user.role}</p>
                  </div>
              </li>
            ))
          }
      </ul>
      <Modal modal={modal} setModal={setModal}>
        <SelectedUser modal={modal} setModal={setModal} />
      </Modal>
    </div>
  )
}

export default AllUsersPage