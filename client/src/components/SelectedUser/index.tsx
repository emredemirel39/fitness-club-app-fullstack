import React from 'react'
import { deleteUser, fetchAllUsers } from '../../slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import styles from './SelectedUser.module.scss';

interface IProps {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectedUser : React.FC<IProps> = ({modal, setModal}) => {

    const users = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const handleDelete = async () => {

        await dispatch(deleteUser(`users/${users.selectedUser?._id as string}`));
        await dispatch(fetchAllUsers());
        setModal(false);
    };
    
  return (
    <div className='w-full flex flex-col gap-14 lg:w-96'>
        <div className="w-full flex flex-col gap-8 items-start">
            {
                <>
                    <h1 className='text-center font-bold uppercase w-full'>{users.selectedUser?.firstName} {users.selectedUser?.lastName}</h1>
                    <p><b>Role:</b> {users.selectedUser?.role}</p>
                    <p><b>Email:</b> {users.selectedUser?.email}</p>
                    <p><b>Phone Number:</b> {users.selectedUser?.phoneNumber}</p>
                </>
            }
        </div>
        <div className="flex flex-col gap-7">
            <a href={`mailto:${users.selectedUser?.email}`} className={styles.linkBtn} >Send Mail</a>
            <a href={`tel:${users.selectedUser?.phoneNumber}`} className={styles.linkBtn} >Call User</a>
            {
                users.currentUser?.role === 'member' || users.currentUser?.role === 'trainer' 
                ? ''
                : users.currentUser?.role === 'manager' && users.selectedUser?.role === 'admin' 
                    ? ''
                    : <button onClick={() => handleDelete()} className={styles.deleteBtn}>Delete User</button>
            }
        </div>
    </div>
  )
}

export default SelectedUser