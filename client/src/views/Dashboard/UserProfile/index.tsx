import React, { createRef, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import styles from './UserProfile.module.scss';
import { IUpdateUserConfig, IUser } from '../../../types';
import Modal from '../../../components/Modal';
import ChangePassword from '../../../components/ChangePassword';
import { updateUser } from '../../../slices/usersSlice';
import { validateConditions } from '../../../utils';
import { unwrapResult } from '@reduxjs/toolkit';

const UserProfile = () => {

  interface IUserInfo {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phoneNumber: string | null
  };

  const initialState: IUserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();

  const [ userInfo, setUserInfo ] = useState<IUserInfo>(initialState);
  const [ modal, setModal ] = useState<boolean>(false);
  const [ isReadOnly, setIsReadOnly ] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  const inputResetToDefault = () => {
    setUserInfo({
      firstName: user.currentUser?.firstName as string,
      lastName: user.currentUser?.lastName as string,
      email: user.currentUser?.email as string,
      phoneNumber: user.currentUser?.phoneNumber as string
    })
  }

  const handleEdit = () => {

    setIsReadOnly(!isReadOnly);
    inputResetToDefault()
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config: IUpdateUserConfig = {
      endpoint: `users/${user.currentUser?._id as string}`,
      body: userInfo
    };

    if (isReadOnly === true) {
      // do nothing
    } else {

      let isValid = true;
      const successMessage = 'Your info updated!';

      switch (isValid) {
        case userInfo.firstName?.match(validateConditions.firstName) === null :
          isValid = false
          alert('Firstname is invalid!')
          break;
        case userInfo.lastName?.match(validateConditions.lastName) === null :
          isValid = false
          alert('Lastname is invalid') 
          break;
        case userInfo.email?.match(validateConditions.email) === null :
            isValid = false
            alert('Email is invalid') 
            break;
        case userInfo.phoneNumber?.match(validateConditions.phoneNumber) === null :
            isValid = false
            alert('Phone number is invalid') 
            break;
        default:
          isValid = true;

          try {
            
            const response = await dispatch(updateUser(config));
            
            if (response.payload.status !== true) {

              // to catch error from response

              //https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
              // console.log(originalPromiseResult)

              const originalPromiseResult = await unwrapResult(response);
              throw originalPromiseResult;  
              
            } else if (response.payload.status === true) {

              // when response is ok

              alert(successMessage);
              setIsReadOnly(!isReadOnly);
            }

          } catch (error: any) {
            alert(error.response.data.message);
          }

          break;
      };

    };
  }

  useEffect(() => { 
    setUserInfo({
      firstName: user.currentUser?.firstName as string,
      lastName: user.currentUser?.lastName as string,
      email: user.currentUser?.email as string,
      phoneNumber: user.currentUser?.phoneNumber as string
    })
  }, [])

  return (
    <div className='flex flex-col items-center w-full h-full gap-8 mt-2'>   
        <h1 className='text-2xl font-bold cursor-default'>{`Welcome ${user.currentUser?.firstName}`}</h1>
        <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-12 w-full justify-center items-center h-full ' >
          <div className={styles.infoWrapper}>
            <div className={styles.inputWrapper} >
              <div className={styles.inputBox} >
                <label className={styles.inputLabel} >First Name</label>
                <input onChange={e => handleChange(e)} readOnly={isReadOnly}  className={`${styles.input} ${!isReadOnly && styles.inputActive}`} name='firstName' type="text" value={userInfo.firstName as string} />
              </div>
              <div className={styles.inputBox}>
                <label className={styles.inputLabel} >Last Name</label>
                <input onChange={e => handleChange(e)} readOnly={isReadOnly}  className={`${styles.input} ${!isReadOnly && styles.inputActive}`} name='lastName' type="text" value={userInfo.lastName as string} />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.inputBox}>
                <label className={styles.inputLabel} >E-mail</label>
                <input onChange={e => handleChange(e)} readOnly={isReadOnly}  className={`${styles.input} ${!isReadOnly && styles.inputActive}`} name='email' type="text" value={userInfo.email as string} />
              </div>
              <div className={styles.inputBox}>
                <label className={styles.inputLabel} >Phone Number</label>
                <input onChange={e => handleChange(e)} readOnly={isReadOnly}  className={`${styles.input} ${!isReadOnly && styles.inputActive}`} name='phoneNumber' type="text" value={userInfo.phoneNumber as string} />
              </div>
            </div>
          </div>
          <div className={styles.btnBox} >
            <button type='button' onClick={() => handleEdit()} className={`${styles.btn} bg-cyan-900 hover:bg-teal-700 w-44 `} >{isReadOnly ? 'Edit' : 'Cancel Edit'}</button>
            <button type='button' onClick={() => setModal(true)} className={`${styles.btn} bg-cyan-900 hover:bg-teal-700`} >Change Password</button>
            <button type='submit' className={`${styles.btn} bg-green-600 hover:bg-green-400`}  >Save Changes</button>
          </div>
        </form>
        <Modal modal={modal} setModal={setModal} >
          <ChangePassword modal={modal} setModal={setModal} />
        </Modal>
    </div>
  )
}

export default UserProfile