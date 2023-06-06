import React from 'react';
import {io} from 'socket.io-client'
function App() {
  
  const newSocket = io('http://localhost:8000')
  newSocket.on('connect', () => {
    console.log('TS Socket connected!')
  })

  return (
    <div className="App">
     TS-MESSAGING-APP
    </div>
  );
}

export default App;
