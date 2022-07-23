import heroContentImg from '../../assets/images/home-img.png';
import aboutContentImg from '../../assets/images/about-img.png';
import fitnessImg from '../../assets/images/fitness.jpg';
import yogaImg from '../../assets/images/yoga.jpg';
import zumbaImg from '../../assets/images/zumba.jpg';
import aerobicsImg from '../../assets/images/aerobics.jpg';
import Header from '../../components/Header';
import { BsCheckSquare, BsInstagram, BsTwitter } from 'react-icons/bs';
import { HiCalendar, HiClock, HiMail, HiPhone } from 'react-icons/hi';
import { MdArrowForward } from 'react-icons/md';
import { ImFacebook, ImMap } from 'react-icons/im';
import { RiLinkedinFill } from 'react-icons/ri';

const Home = () => {

  const lessons = [
    {
      name: 'Yoga',
      img: yogaImg
    },
    {
      name: 'Fitness',
      img: fitnessImg
    },
    {
      name: 'Aerobics',
      img: aerobicsImg
    },
    {
      name: 'Zumba',
      img: zumbaImg
    },
  ];

  const isOdd = (n: number):boolean => n % 2 === 1;
  const now: Date = new Date();
  const currentYear: number = now.getFullYear();

  return (
      <div className={`w-full min-h-full`}>
          <Header/>
        <main className='bg-[#1d0e15]' >

            <div id='hero' className={`bg-[url('../assets/images/home-bg.jpg')] bg-center bg-cover bg-fixed flex flex-col w-full items-center gap-8 h-screen}`}>
                <img src={heroContentImg} alt="hero" />
                <div className='flex flex-col gap-4 items-center'>
                  <h4 className='text-orange-600'>back to the sport</h4>
                  <h4 className='text-white text-2xl' >START YOUR SPORT JOURNEY</h4>
                </div>
            </div>

          <div id='about' className='flex flex-col gap-6 px-4 py-6 lg:flex-row-reverse lg:justify-center'>
            <img className='object-contain ' src={aboutContentImg} alt="about" />
            <div className='flex flex-col items-center gap-6 lg:justify-center lg:items-start'>
              <h4 className='text-orange-600 '>about us</h4>
              <h4 className='text-white text-2xl ' >Daily Workout and Stay With Sport</h4>
              <p className='text-white lg:w-96'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nihil magnam quidem. Magnam odio impedit aspernatur odit perspiciatis aut modi adipisci vel ipsam, repellat, laudantium iusto hic totam tenetur veniam? Amet incidunt explicabo ut minima placeat cumque beatae quo, unde ad? Cupiditate in porro iste dignissimos odit unde quos aut omnis alias, non consequatur tempora, minus deserunt deleniti quisquam exercitationem!
              </p>
              <ul className='px-4 flex flex-col items-center gap-6'>
                <li className='flex justify-center items-center text-white gap-1 lg:gap-4'><BsCheckSquare className='fill-orange-600' /> How to support your immume system</li>
                <li className='flex justify-center items-center text-white gap-1 lg:gap-4'><BsCheckSquare className='fill-orange-600' /> 30 days fitness and workout challange</li>
              </ul>
            </div>
          </div>

          <ul className="bg-[url('../assets/images/counter-bg.jpg')] bg-center bg-cover w-full py-6 px-4 flex flex-col items-center lg:flex-row lg:justify-center gap-10 lg:gap-32">
            <li className='flex flex-col items-center gap-2'>
              <h4 className='text-3xl text-orange-600'>10+</h4>
              <h4 className='text-xl text-white'>COURSES</h4>
            </li>
            <li className='flex flex-col items-center gap-2'>
              <h4 className='text-3xl text-orange-600'>200+</h4>
              <h4 className='text-xl text-white'>EQUIPMENTS</h4>
            </li>
            <li className='flex flex-col items-center gap-2'>
              <h4 className='text-3xl text-orange-600'>10+</h4>
              <h4 className='text-xl text-white'>TRAINERS</h4>
            </li>
            <li className='flex flex-col items-center gap-2'>
              <h4 className='text-3xl text-orange-600'>100+</h4>
              <h4 className='text-xl text-white'>CUSTOMERS</h4>
            </li>
          </ul>

          <div id='courses' className='w-full flex flex-col items-center gap-6 py-6'>
            <h4 className='text-orange-600'>courses</h4>
            <h4 className='text-white text-2xl' >Popular Courses</h4>
            <div className='flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:justify-items-center gap-10 items-center lg:justify-self-center'>
              {
                lessons.map((lesson, i) => (
                  <div key={i} className={`flex flex-col gap-2 w-56 items-center border border-gray-400 border-solid pb-2 text-white lg:w-80 ${isOdd(i) ? 'lg:justify-self-start' : 'lg:justify-self-end'}`}>
                  <div className='overflow-hidden w-full h-56 '>
                  <img className='object-fit transition-all active:scale-125 hover:scale-125' src={lesson.img} alt="fitness" />
                  </div>
                  <div className='flex flex-col items-center px-2 w-full'>
                    <div className='flex justify-between mb-2 w-full'>
                      <div className='flex justify-center items-center gap-1'>
                        <HiCalendar className='fill-orange-600' />
                        <h6 className='text-sm'>Everyday</h6>
                      </div>
                      <div className='flex justify-center items-center gap-1'>
                        <HiClock className='fill-orange-600' />
                        <h6 className='text-sm'>1 Hour</h6>
                      </div>
                    </div>
                    <h1 className='text-2xl'>{lesson.name}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, ipsa vero optio aperiam in laborum omnis nam? Quae, quod soluta?</p>
                  </div>
                </div>
                ))
              }
            </div>
          </div>

        </main>

        <footer className="bg-[url('../assets/images/footer-bg.jpg')] bg-center bg-cover w-full flex flex-col justify-center items-center gap-10 py-10">

          <div className='flex flex-col lg:flex-row w-full justify-center items-center lg:items-start gap-10 lg:gap-28 px-4 text-white'>

            <div className='w-full lg:w-fit flex flex-col gap-4'>
              <h6 className='text-center'>Menu</h6>
              <ul className='flex flex-col gap-4'>
                <li className='flex justify-start items-center gap-2'><MdArrowForward className='fill-orange-600' /><a href="#hero">Home</a></li>
                <li className='flex justify-start items-center gap-2'><MdArrowForward className='fill-orange-600' /><a href="#about">About</a></li>
                <li className='flex justify-start items-center gap-2'><MdArrowForward className='fill-orange-600' /><a href="#courses">Courses</a></li>
              </ul>
            </div>

            <div className='w-full lg:w-fit flex flex-col gap-4'>
              <h6 className='text-center'>Contact</h6>
              <ul className='flex flex-col gap-4'>
                <li className='flex justify-start items-center gap-2'><HiPhone className='fill-orange-600' /><a href="#">+9 999 999 99 99</a></li>
                <li className='flex justify-start items-center gap-2'><HiPhone className='fill-orange-600' /><a href="#">+9 999 999 99 99</a></li>
                <li className='flex justify-start items-center gap-2'><HiMail className='fill-orange-600' /><a href="#">example@example.com</a></li>
                <li className='flex justify-start items-center gap-2'><ImMap className='fill-orange-600' /><a href="#">Nowhere, Nowhere - 00000</a></li>
              </ul>
            </div>

            <div className='w-full lg:w-fit flex flex-col gap-4'>
              <h6 className='text-center'>Follow</h6>
              <ul className='flex flex-col gap-4'>
                <li className='flex justify-start items-center gap-2'><ImFacebook className='fill-orange-600' /><a href="#">Facebook</a></li>
                <li className='flex justify-start items-center gap-2'><BsInstagram className='fill-orange-600' /><a href="#">Instagram</a></li>
                <li className='flex justify-start items-center gap-2'><BsTwitter className='fill-orange-600' /><a href="#">Twitter</a></li>
                <li className='flex justify-start items-center gap-2'><RiLinkedinFill className='fill-orange-600' /><a href="#">Linkedin</a></li>
              </ul>
            </div>

          </div>
          
          <div className='flex w-full justify-center items-center py-10 text-white'>{currentYear} Copyright - All rights reserved.</div>

        </footer>
      </div>
  )
}

export default Home

/*


*/