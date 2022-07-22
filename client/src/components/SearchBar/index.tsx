import { FC, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../slices/usersSlice';
import { useAppSelector } from '../../store';

interface IProps {
  modal: boolean,
  setModal: React.Dispatch<React.SetStateAction<boolean>>
};

const SearchBar: FC<IProps> = ({modal, setModal}) => {

  const user = useAppSelector(state => state.user);
  const dispatch = useDispatch();

  const [ search, setSearch ] = useState <string> ('');
  const [ showAutocomplete, setShowAutocomplete ] = useState <boolean> (false);

  return (
    <div className='w-96'>
        <div className='w-full p-1.5 flex bg-white outline-solid border-solid border-gray-400 border-2'>
            <input 
              autoComplete="off"
              type="text" 
              name='search'
              placeholder='Search User'
              className='w-full bg-transparent pl-2 outline-none'
              onFocus={() => setShowAutocomplete(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowAutocomplete(false)
                }, 50);
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <RiSearchLine className='fill-gray-400' size='1.5em' />
        </div>
        <ul className='w-96 bg-gray-100/90 absolute max-h-56 overflow-y-auto flex flex-col shadow-md'>
          {
            showAutocomplete && user.allUser?.filter(u => u._id !== user.currentUser?._id)
            .filter(user => (
              user.firstName.toLowerCase().includes(search.toLowerCase()) ||
              user.lastName.toLowerCase().includes(search.toLowerCase()) ||
              user.role.toLowerCase().includes(search.toLowerCase())
            ))
            .map(user => (
              <li className='p-3 hover:bg-cyan-900/75 hover:text-white' key={user._id}>
                <button 
                  type='button' 
                  onClick={() => {
                    dispatch(setSelectedUser(user))
                    setModal(true)
                  }}
                >
                  {user.firstName} {user.lastName}
                </button>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default SearchBar