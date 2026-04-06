import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Signup from "./components/Signup"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import { deleteMessage } from "./redux/messageSlice"; // 1. Ye import zaroori hai

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector(store => store.user);
  return authUser ? children : <Navigate to="/" />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { authUser } = useSelector(store => store.user);
  return authUser ? <Navigate to="/home" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute> <Signup /> </PublicRoute>
  },
  {
    path: "/login",
    element: <PublicRoute> <Login /> </PublicRoute>
  },
  {
    path: "/home",
    element: <ProtectedRoute> <HomePage /> </ProtectedRoute>
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
])

function App() {
  const { authUser } = useSelector(store => store.user)
  const { socket } = useSelector(store => store.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authUser) {
      const socketInstance = io('https://chat-app-deploy-9wkt.onrender.com', {
        query: { userId: authUser._id }
      });
      dispatch(setSocket(socketInstance))

      socketInstance.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      // --- 2. REAL-TIME DELETE LISTENER ADDED HERE ---
      socketInstance.on('messageDeleted', (deletedMsgId) => {
        dispatch(deleteMessage(deletedMsgId)); // Redux state update karega
      });
      // ----------------------------------------------

      return () => {
        socketInstance.close();
        socketInstance.off('messageDeleted'); // Cleanup
      }
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <RouterProvider router={router} />
    </div>
  )
}

export default App