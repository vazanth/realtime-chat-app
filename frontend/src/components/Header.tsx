import { FC, useState, ChangeEvent } from 'react';
import Popover from './Popover';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  refetchChatHistory: () => void;
};

const Header: FC<HeaderProps> = ({ refetchChatHistory }) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleSuggestionSelect = async (selectedId: string) => {
    try {
      const response = await (
        await fetch(`http://localhost:3000/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            recipientId: selectedId,
          }),
        })
      ).json();
      setSuggestions(response.data);
      // call the fetch chat history again
      refetchChatHistory();
    } catch (error) {
      console.log('err', error);
    }
  };

  const handleChangeEvent = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await (
        await fetch(
          `http://localhost:3000/api/users?search=${evt.target.value}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )
      ).json();
      setSuggestions(response.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
        <div className='flex justify-between items-center mx-auto'>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-56'
            placeholder='Search Users'
            required
            onChange={handleChangeEvent}
          />
          {suggestions && suggestions.length > 0 && (
            <Popover
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
            />
          )}
          <h2>Chat App</h2>

          <h4>Loggedd in User: {sessionStorage.getItem('username')}</h4>
          <button
            type='button'
            onClick={logout}
            className='border-neutral-200 border p-2'
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
