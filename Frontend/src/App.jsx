import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Chat App</h1>
        
        {/* Room Input */}
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Room Number..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button
            className="w-full mt-2 p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Message..."
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            className="w-full mt-2 p-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>

        {/* Display Message */}
        <div className="p-4 bg-gray-700 rounded text-center">
          <h2 className="text-lg font-semibold">Message:</h2>
          <p className="text-gray-300">{messageReceived}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
