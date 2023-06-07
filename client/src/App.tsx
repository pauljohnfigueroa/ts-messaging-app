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
    <div className="bg-green-600">
      <h1 className="text-3xl font-bold uppercase">
        Look! We are using TailwindCSS.
      </h1>
    </div>
  );
}

export default App;
