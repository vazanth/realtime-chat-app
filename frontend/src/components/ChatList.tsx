/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { ChatMap } from '../types';
import Modal from './Modal';

type ChatListProps = {
  refresh: boolean;
  sendChatId: (id: string) => void;
};

const ChatList: FC<ChatListProps> = ({ refresh, sendChatId }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    fetchChatHistory();
  }, [refresh, toggle]);

  const fetchChatHistory = async () => {
    try {
      const response = await (
        await fetch(`http://localhost:3000/api/chat`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
      ).json();
      setChatHistory(response.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  const toggleModal = () => {
    setToggle((prevState) => !prevState);
  };

  const openSocketCom = (history: ChatMap) => {
    socket.emit('joinPrivateChat', history.id);
    sendChatId(history.id);
  };

  return (
    <>
      {toggle ? <Modal closeModal={toggleModal} /> : null}
      <div className='w-[18rem] py-4 px-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <button
          type='button'
          className='border-neutral-200 border p-2 mb-2 ml-24'
          onClick={toggleModal}
        >
          + Create Group
        </button>
        <div className='border border-white my-5'></div>
        <div className='mt-2'>
          {chatHistory && chatHistory.length ? (
            chatHistory.map((history: ChatMap) => {
              const userIndex = history.participantId.findIndex(
                (id) => id !== sessionStorage.getItem('userId')
              );
              const chatName = history.chatName
                ? history.chatName
                : history.participantName[userIndex];
              return (
                <div
                  className='border bg-[#0e1621] px-2.5 py-[13px] rounded-[10px] border-solid border-[#0e1621] cursor-pointer mb-2'
                  key={history.id}
                  onClick={() => openSocketCom(history)}
                >
                  {chatName}
                </div>
              );
            })
          ) : (
            <span>Start Chatting</span>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
