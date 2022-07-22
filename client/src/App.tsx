// Packages
import { Route, Routes } from 'react-router';

// Components
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import UserProfile from './views/Dashboard/UserProfile';
import LoginPage from './views/LoginPage';
import AllUsersPage from './views/Dashboard/AllUsersPage';
import CalendarPage from './views/Dashboard/CalendarPage';
import AddNewUserPage from './views/Dashboard/AddNewUserPage';


function App() {
  return (
    <div className="App m-w-screen h-screen">
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route index element={<UserProfile/>} />
            <Route path='calendar' element={<CalendarPage/>} />
            <Route path='all-users' element={<AllUsersPage/>} />
            <Route path='add-new-user' element={<AddNewUserPage/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
