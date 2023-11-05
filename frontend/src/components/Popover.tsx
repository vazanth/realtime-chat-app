import { FC } from 'react';
import { UserMap } from '../types';

type PopoverProps = {
  suggestions: UserMap[];
  onSelect: (selectedSuggestion: string) => void;
};

const Popover: FC<PopoverProps> = ({ suggestions, onSelect }) => {
  return (
    <>
      <ul className='dark:bg-gray-800 border dark:border-gray-700 rounded mt-2 shadow-lg absolute top-10'>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className='cursor-pointer px-4 py-2 hover:bg-gray-950'
            onClick={() => onSelect(suggestion.id)}
          >
            {suggestion.username}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Popover;
