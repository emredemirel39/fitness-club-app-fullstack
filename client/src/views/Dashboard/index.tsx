// Packages
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { MdMenu, MdLogout } from "react-icons/md";
import { HiUser, HiUserAdd, HiUserGroup } from "react-icons/hi";
import { ImCalendar } from "react-icons/im";

// Styles
import styles from './Dashboard.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAllUsers, setIsLoggedIn, userLogout } from '../../slices/usersSlice';
import { fetchAllEvents } from '../../slices/scheduleSlice';


const Dashboard = () => {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const [ menu, setMenu ] = useState<boolean>(false);

    const handleMenu = (e : React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) :void => {
        e.preventDefault();
        setMenu(!menu);
    };

    const handleClickNavLinks = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) :void => {

        // Don't allow to change sidebar size in desktop when clicked to navlinks
        window.screen.width < 1024 && setMenu(!menu)
    };

    const handleLogout = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        navigate('/');
        dispatch(userLogout());
        sessionStorage.removeItem('token');
        dispatch(setIsLoggedIn(false))
    }

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchAllEvents());
    }, []);

  return (
    <React.Fragment>
        {
            user.isLoggedIn ? (
                <React.Fragment>
                    <header className={styles.header} >
                <div className={styles.headerWrapper}>
                    <MdMenu onClick={e => handleMenu(e)} className='cursor-pointer fill-white' size='3em' />
                    <h4 className='cursor-pointer text-white text-3xl'>LOGO</h4>
                    <MdLogout onClick={(e) => handleLogout(e)} className='cursor-pointer fill-white' size="3em" />
                </div>
        </header>
        <main className={styles.main}>

            <aside className={`${styles.sideMenu} ${menu ? `${styles.sideMenuActive}` : `${styles.sideMenuDeactive}` }`}>
                <nav className='flex flex-col gap-12'>
                    <Link className={styles.sideMenuLinks} onClick={handleClickNavLinks} to='/dashboard' >
                        {menu ? <> <HiUser size='1.3em' className='fill-white'/> My Profile</> : <HiUser size='1.3em' className='fill-white'/>}
                    </Link>
                    <Link className={styles.sideMenuLinks} onClick={handleClickNavLinks} to='/dashboard/calendar'>
                        {menu ? <><ImCalendar size='1.3em' className='fill-white' />Calendar</> : <ImCalendar size='1.3em' className='fill-white' />}
                    </Link>
                    <Link className={styles.sideMenuLinks} onClick={handleClickNavLinks} to='/dashboard/all-users' >
                        {menu ? <><HiUserGroup size='1.3em' className='fill-white' /> All Users</> : <HiUserGroup size='1.3em' className='fill-white' />}
                    </Link>
                    {
                        user.currentUser?.role === 'member' || user.currentUser?.role === 'trainer'
                        ? ''
                        : (
                            <Link className={styles.sideMenuLinks} onClick={handleClickNavLinks} to='/dashboard/add-new-user' >
                                {menu ? <><HiUserAdd size='1.3em' className='fill-white' />Add New User</> : <HiUserAdd size='1.3em' className='fill-white' />}
                            </Link>
                        )
                    }
                </nav>            
            </aside>

            <section className={`${styles.bodySection} ${menu ? `${styles.bodySectionMenuActive}` : `${styles.bodySectionMenuDeactive}`}`}>
                <div>
                    <Outlet/>
                </div>
            </section>        

        </main>
                </React.Fragment>
            )
            : <Navigate to='/login'/>
        }
    </React.Fragment>
  )
}

export default Dashboard