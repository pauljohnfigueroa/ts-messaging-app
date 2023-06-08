import Dashboard from './pages/dashboard/Dashboard'
import {io} from 'socket.io-client'

function App() {
  
  /* Socket.io-client */
  const socket = io('http://localhost:8000')
  socket.on('connect', () => {
    console.log(`TS Socket connected! - ${socket.id}`)
  })

  socket.on("disconnect", () => {
    console.log(`TS Socket disconnected! - ${socket.id}`); // undefined
  });

  return (
<Dashboard />
  );
}

export default App;
