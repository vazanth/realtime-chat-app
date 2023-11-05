import { FC, useState } from 'react';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';

const Chat: FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const refetchChatHistory = () => {
    setRefresh(true);
  };

  const sendChatId = (id: string) => {
    setSelectedId(id);
  };

  return (
    <>
      <Header refetchChatHistory={refetchChatHistory} />
      <div className='flex flex-row gap-2 py-3 h-[93vh]'>
        <ChatList refresh={refresh} sendChatId={sendChatId} />
        <ChatBox selectedId={selectedId} />
      </div>
    </>
  );
};

export default Chat;
