import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { MessageMap } from '../types';
import { useSocket } from '../context/SocketContext';
import dayjs from 'dayjs';
import { decryptMessage, encryptMessage } from '../helpers';
// import TypeAnimate from './TypeAnimate';

type ChatBoxProps = {
  selectedId: string;
};

const ChatBox: FC<ChatBoxProps> = ({ selectedId }) => {
  const [message, setMessage] = useState('');
  const [convo, setConvo] = useState<MessageMap[]>([]);
  const [istyping, setIsTyping] = useState(false);
  const [fileData, setFileData] = useState<File>();
  const socket = useSocket();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target?.files && evt.target.files.length) {
      const selectedFile = evt.target.files[0];
      if (selectedFile) {
        setFileData(selectedFile);
      }
    }
  };

  const handleUpload = () => {
    if (fileInputRef && fileInputRef?.current) {
      fileInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (selectedId) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleChangeEvent = async (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
    if (!istyping) {
      setIsTyping(true);
      socket.emit('typing', selectedId);

      const lastTypingTime = new Date().getTime();
      const timerLength = 3000;
      setTimeout(() => {
        const timeNow = new Date().getTime();
        const timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && istyping) {
          socket.emit('stop typing', selectedId);
          setIsTyping(false);
        }
      }, timerLength);
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await (
        await fetch(`http://localhost:3000/api/messages/${selectedId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
      ).json();
      setConvo(response.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  const sendMessage = async () => {
    if (fileData) {
      await uploadAndSendFile();
    } else {
      await sendTextMessage();
    }
  };

  const sendTextMessage = async () => {
    const encryptedMessage = encryptMessage(message);
    try {
      await (
        await fetch(`http://localhost:3000/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            id: selectedId,
            sender: sessionStorage.getItem('username'),
            content: encryptedMessage,
          }),
        })
      ).json();
      setMessage('');
      socket.emit('privateChatMessage', {
        message: encryptedMessage,
        username: sessionStorage.getItem('username'),
        room: selectedId,
      });
    } catch (error) {
      console.log('err', error);
    }
  };

  const uploadAndSendFile = async () => {
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData);

      try {
        await fetch('http://localhost:3000/api/messages/send-file', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: formData,
        });
      } catch (error) {
        console.error('Error uploading file', error);
      }
    }
  };

  useEffect(() => {
    socket.on('privateMessage', (message: MessageMap) => {
      setConvo((prevConvo) => [...prevConvo, message]);
    });
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, [socket]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downloadFile = async (content: any) => {
    const filename = content.filename;
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/download-file/${filename}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      // Handle response from the server if needed
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.png'; // Set the desired file name with appropriate file extension
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to fetch image data');
      }
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div className='w-[100%] py-6 px-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      {convo && convo.length
        ? convo.map((msg) => {
            return sessionStorage.getItem('username') === msg.sender ? (
              <div className='flex justify-end mb-2' key={msg.id}>
                <div className='bg-[#054640] text-white p-3 rounded-tl-lg rounded-bl-lg rounded-tr-lg shadow-md w-96'>
                  <div className='flex flex-row justify-between mb-3'>
                    <span>{msg.sender}</span>
                    <span>{dayjs(msg.timestamp).format('h:mm a')}</span>
                  </div>
                  {typeof msg.content === 'object'
                    ? null
                    : decryptMessage(msg.content)}
                </div>
              </div>
            ) : (
              <div className='flex mb-2' key={msg.id}>
                <div className='bg-[#44525a] p-3 rounded-tl-lg rounded-bl-lg rounded-tr-lg shadow-md w-96'>
                  <div className='flex flex-row justify-between mb-3'>
                    <span>{msg.sender}</span>
                    <span>{dayjs(msg.timestamp).format('h:mm a')}</span>
                  </div>
                  {typeof msg.content === 'object' ? (
                    <i className='fas fa-solid fa-images bottom-6 mb-3'>
                      <button
                        type='button'
                        onClick={() => downloadFile(msg.content)}
                      >
                        Download {msg.content.filename}
                      </button>
                    </i>
                  ) : (
                    decryptMessage(msg.content)
                  )}
                </div>
              </div>
            );
          })
        : selectedId && <div>No Chat History Available</div>}
      <div className='absolute bottom-6 w-[89rem]'>
        <input
          id='msg'
          type='text'
          placeholder='Type a Message'
          required
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          onChange={handleChangeEvent}
        />
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {fileData && (
          <i className='fas fa-solid fa-images fixed ml-4 bottom-6 mb-3'></i>
        )}
        <i
          className='fas fa-solid fa-paperclip fixed right-16 bottom-6 mb-3'
          onClick={handleUpload}
        ></i>
        <button
          className='btn-plane fixed right-8 bottom-8'
          type='button'
          onClick={sendMessage}
        >
          <i className='fas fa-paper-plane'></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
