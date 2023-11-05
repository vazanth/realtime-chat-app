/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, ChangeEvent } from 'react';
import Select from 'react-select';
import { UserMap } from '../types';

const customStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#fff !important', // Set your desired background color here
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#007bff' : 'white', // Set the background color for selected options
    color: state.isSelected ? 'white' : 'black', // Set the text color for selected options
  }),
};

type ModalProps = {
  closeModal: () => void;
};

const Modal: FC<ModalProps> = ({ closeModal }) => {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [grpName, setGrpName] = useState('');

  useEffect(() => {
    loadUserList();
  }, []);

  const loadUserList = async () => {
    try {
      const response = await (
        await fetch(`http://localhost:3000/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
      ).json();
      const result = response.data
        .filter((user: UserMap) => user.id !== sessionStorage.getItem('userId'))
        .map((obj: UserMap) => ({ value: obj.id, label: obj.username }));
      setOptions(result);
    } catch (error) {
      console.log('err', error);
    }
  };

  const handleChangeEvent = (selectedOptions: any) => {
    setSelectedValues(selectedOptions);
  };

  const createGroup = async () => {
    try {
      await (
        await fetch(`http://localhost:3000/api/chat/creategroup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            recipientId: selectedValues.map((obj: any) => obj.value),
            groupName: grpName,
          }),
        })
      ).json();
      closeModal();
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <>
      <div
        id='myModal'
        className='modal fixed inset-0 flex items-center justify-center z-50'
      >
        <div className='modal-content bg-[#65768e] p-8 rounded shadow-lg'>
          <div className='mb-6 text-xl font-semibold'>Create Group</div>

          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='groupName'
            >
              Group Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white'
              id='field1'
              type='text'
              placeholder='Enter Field 1'
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setGrpName(evt.target.value)
              }
              value={grpName}
            />
          </div>

          <div className='mb-4'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='field2'
            >
              Participants
            </label>
            <Select
              isMulti
              options={options}
              styles={customStyles}
              onChange={handleChangeEvent}
              value={selectedValues}
            />
          </div>

          <button
            id='submitBtn'
            onClick={createGroup}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
