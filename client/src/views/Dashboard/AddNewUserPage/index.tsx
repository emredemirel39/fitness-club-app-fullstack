import React, { useEffect, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit';
import { addNewUser, fetchAllUsers } from '../../../slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../store'
import { IAddNewUser } from '../../../types';
import { validateConditions } from '../../../utils';
import styles from './AddNewUserPage.module.scss'

const AddNewUserPage = () => {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const initialState = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phoneNumber: '',
        role: '',
    }

    const [ form, setForm ] = useState<IAddNewUser>(initialState);
    const [ isAdded, setIsAdded ] = useState<boolean>(false);

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let isValid = true;
        const successMessage = 'New user added!';

        switch (isValid) {

            case form.firstName.match(validateConditions.firstName) === null :
                isValid = false
                alert('Firstname is invalid') 
                break;
            case form.lastName.match(validateConditions.lastName) === null :
                isValid = false
                alert('Lastname is invalid') 
                break;
            case form.email.match(validateConditions.email) === null :
                isValid = false
                alert('Email is invalid') 
                break;
            case form.role === '' :
                isValid = false
                alert('Role is shouldn\'t be empty') 
                break;
            case form.phoneNumber.match(validateConditions.phoneNumber) === null :
                isValid = false
                alert('Phone number is invalid') 
                break;
            default:
                isValid = true
                e.currentTarget.reset()
                
                try {
                    
                    // Default password of new added users is his firstname
                    const response = await dispatch(addNewUser({...form, password: form.firstName}));

                    const originalPromiseResult = await unwrapResult(response);
                    //https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
                    // console.log(originalPromiseResult)
                    
                    
                    if (response.payload.status !== true) {
                        // catched error from response
                        throw originalPromiseResult;  
                        
                    } else if (response.payload.status === true) {
                        // when response is successed
                        alert(successMessage);
                        setIsAdded(!isAdded);
                    }


                } catch (error: any) {
                    // catched error from response
                    alert(error.response.data.message);
                }
                break;
        };
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [isAdded]);

  return (
    <>
        {
            user.currentUser?.role === 'member' || user.currentUser?.role === 'trainer'
            ? ''
            : (
                <div className='flex flex-col items-center justify-center w-full '>
        <h1 className='font-bold cursor-default text-2xl'>Add New User</h1>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <div className={styles.formRow}>
                <div className={styles.inputBox}>
                    <label className={styles.inputLabel}>First Name</label>
                    <input className={styles.input} onChange={e => handleChange(e)} type="text" name='firstName' />
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.inputLabel}>Last Name</label>
                    <input className={styles.input} onChange={e => handleChange(e)} type="text" name='lastName' />
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.inputBox}>
                    <label className={styles.inputLabel} >Phone Number</label>
                    <input className={styles.input} onChange={e => handleChange(e)} type="text" name='phoneNumber' />
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.inputLabel} >E-mail</label>
                    <input className={styles.input} onChange={e => handleChange(e)} type="text" name='email' />
                </div>      
            </div>
            <div>
                <div className='w-full flex justify-center'>
                    <select className={styles.select} onChange={e => handleChange(e)} defaultValue='none' name="role">
                        <option disabled value='none'>Select a Role</option>
                        <option value="admin">Admin</option>
                        <option value="trainer">Trainer</option>
                        <option value="member">Member</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <button className={styles.submitBtn}>Add New User</button>
            </div>
        </form>
    </div>
            )
        }
    </>
  )
}

export default AddNewUserPage;