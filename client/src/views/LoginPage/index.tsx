import { useState } from 'react';
import { useNavigate } from 'react-router';
import { setIsLoggedIn, userLogin } from '../../slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { ILoginForm } from '../../types';
import styles from './LoginPage.module.scss';

const LoginPage = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const initialState: ILoginForm = {
        phoneNumber: '',
        password: '',
    }

    const [ form, setForm ] = useState<ILoginForm>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setForm({...form, [e.target.name]: e.target.value});
    };
    

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            
            const response = await dispatch(userLogin({
                phoneNumber: form.phoneNumber,
                password: form.password
            }));

            if (await response.payload.status) {
                dispatch(setIsLoggedIn(true))
                navigate('/dashboard')
            }
        } catch (error) {
            alert('Phone number or password is invalid!');
        }
    }

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-[#1d0e15]'>
        <form onSubmit={(e) => handleLogin(e)} className='w-fit h-fit bg-gray-500/10 px-3 py-3.5 flex flex-col items-center gap-6'>
            <div className={styles.inputBox}>
                <label className='text-white'>Phone Number</label>
                <input onChange={e => handleChange(e)} name='phoneNumber' className='bg-cyan-50 focus:bg-teal-100 pl-1' type="text" />
            </div>
            <div className={styles.inputBox}>
                <label className='text-white'>Password</label>
                <input onChange={e => handleChange(e)} name='password' className='obg-cyan-50 focus:bg-teal-100 pl-1' type="password" />
            </div>
            <div className='flex flex-col lg:flex-row w-full lg:justify-around gap-4 text-white'>
                <button type='submit'>Login</button>
                <button onClick={() => navigate('/')} type='button'>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage;