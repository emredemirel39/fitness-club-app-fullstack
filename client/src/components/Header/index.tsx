import React, { useEffect, useState } from 'react'
import { HiMenu, HiUser } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Header= () => {

  const [ headerBg, setHeaderBg ] = useState<boolean>(false);
  const [ mobileNav, setMobileNav ] = useState<boolean>(false);

  const changeBg = () => {
    if (window.scrollY >= 64) { // height of header
      setHeaderBg(true);
    } else {
      setHeaderBg(false)
    }
  }

  window.addEventListener('scroll', changeBg);

  const handleMobileMenu = () => {
    setMobileNav(!mobileNav);
    
  };

  const handleClickMobileNavLinks = () => {
    setMobileNav(false)
  }

  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = 'hidden'
    } else if (!mobileNav) {
      document.body.style.overflow = 'auto'
    }
  }, [mobileNav])

  return (
    <header>
    <div className={`${headerBg && 'bg-[#1d0e15]/75 backdrop-blur'} ${mobileNav && 'overflow-hidden'} z-50 fixed top-0 h-16 w-full flex justify-between items-center shadow p-2 lg:p-6`}>
      <Link to='login'>
        <HiUser size='2em' className='fill-white' />
      </Link>
      <h1 className='text-2xl text-white'><a href="#hero">LOGO</a></h1>
        <HiMenu onClick={() => handleMobileMenu()} size='2em' className='fill-white cursor-pointer lg:hidden'/>
        <nav className='hidden lg:block '>
            <ul className='flex justify-center font-bold items-center lg:gap-4 text-white'>
                <li><a href="#hero">home</a></li>
                <li><a href="#about">about</a></li>
                <li><a href="#courses">courses</a></li>
            </ul>
        </nav>
    </div>
      {
            mobileNav && (
              <nav>
                <ul className={`w-screen h-screen flex flex-col justify-center items-center gap-20 bg-[#1d0e15] text-white text-3xl lg:hidden fixed z-100  ${mobileNav && 'overflow-hidden'}`} >
                  <li onClick={() => handleClickMobileNavLinks()}><a href="#hero">Home</a></li>
                  <li onClick={() => handleClickMobileNavLinks()}><a href="#about">About</a></li>
                  <li onClick={() => handleClickMobileNavLinks()}><a href="#courses">Courses</a></li>
                </ul>
              </nav>
            )
          }
    </header>
  )
}

export default Header