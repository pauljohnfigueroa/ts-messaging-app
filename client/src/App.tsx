// import React from 'react';
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
    <div className="App">
     TS-MESSAGING-APP
    </div>
  );
}

export default App;
