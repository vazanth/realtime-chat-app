import './App.css';
import AppRoutes from './Routes';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </>
  );
}

export default App;
