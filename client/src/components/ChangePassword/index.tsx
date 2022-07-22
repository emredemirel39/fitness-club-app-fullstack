import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { updatePassword } from '../../slices/usersSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { IUpdateUserConfig } from '../../types'
import { validateConditions } from '../../utils'

type Props = {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword: React.FC<Props> = ({modal, setModal}) => {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [ passwordFirst, setPasswordFirst ] = useState<string>('');
    const [ passwordSecond, setPasswordSecond ] = useState<string>('');

    const handleChangePassword= async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        e.currentTarget.reset();

        const config: IUpdateUserConfig = {
            endpoint: `users/${user.currentUser?._id}/changePassword`,
            body: {
                password: passwordFirst
            }
        };

        if (passwordFirst === passwordSecond) {
            
            let isValid = true;
            const successMessage = 'Password changed!';

            switch (isValid) {
                case passwordFirst.match(validateConditions.password) === null :
                    isValid = false;
                    alert('Password must between 2-13 characters!')
                    break;
    
                default:
                    isValid = true;

                    try {

                        const response = await dispatch(updatePassword(config));

                        if (response.payload.status !== true) {

                            // to catch error from response

                            const originalPromiseResult = await unwrapResult(response);
                            throw originalPromiseResult; 

                            //https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
                            // console.log(originalPromiseResult)
                            
                        } else {
                            alert(successMessage);
                            setModal(false);
                        }
                        
                    } catch (error: any) {
                        alert(error.response.data.message)
                    };
                    break;
            };

        } else {
            alert('Passwords are not same!');
        };
    };

  return (
    <form onSubmit={e => handleChangePassword(e)} className='flex flex-col w-fit h-96 items-center justify-around lg:w-[48rem]'>
        <h1 className='font-bold lg:text-2xl' >Change Password</h1>
        <div className='flex flex-col items-around gap-14 lg:flex-row' >
            <input 
            onChange={e => setPasswordFirst(e.target.value)} 
            className='bg-cyan-50 focus:bg-teal-100 border-gray-300 border-solid border-2 p-2 lg:w-64' 
            placeholder='Enter your new password' 
            type="password" 
            name='passwordFirst' 
            />
            <input 
            onChange={e => setPasswordSecond(e.target.value)} 
            className='bg-cyan-50 focus:bg-teal-100 border-gray-300 border-solid border-2 p-2 lg:w-64' 
            placeholder='Enter your new password' 
            type="password" 
            name='passwordSecond'
            />
        </div>
        <button className='px-3 py-2 w-fit text-white bg-green-600 hover:bg-green-400' >Change Password</button>
    </form>
  )
}

export default ChangePassword