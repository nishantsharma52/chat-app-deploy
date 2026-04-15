import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { deleteMessage } from '../redux/messageSlice'

const Message = ({ message }) => {
  const scroll = useRef()
  const dispatch = useDispatch()
  const [showOptions, setShowOptions] = useState(false);
  const { authUser, selectedUser } = useSelector(store => store.user)
  
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  const deleteHandler = async (type) => {
    try {
      const res = await axios.post(`https://chat-app-deploy-9wkt.onrender.com/api/v1/message/delete/${message._id}`, 
        { type }, 
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(deleteMessage(message._id));
        toast.success(res.data.message);
        setShowOptions(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting message");
    }
  }

  const isSender = message?.senderId?.toString() === authUser?._id?.toString();

  return (
    <div ref={scroll} className={`chat ${isSender ? "chat-end" : "chat-start"} group mb-4`}>
      <div className="chat-image avatar">
        <div className="w-8 sm:w-10 rounded-full border border-gray-400">
          <img alt="User" src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
        </div>
      </div>
      
      <div className="flex flex-col relative">
        <div className={`chat-bubble max-w-[180px] sm:max-w-[250px] md:max-w-[320px] break-words shadow-sm ${!isSender ? 'bg-white text-gray-800' : 'bg-black text-white'}`}>
          {message?.message}
          
          <button 
            onClick={() => setShowOptions(true)}
            className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-all p-1 text-gray-400 hover:text-red-500 ${isSender ? "-left-8" : "-right-8"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
        <time className="text-[10px] opacity-50 mt-1 self-end">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
      </div>

      {showOptions && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/20">
          <div className="absolute inset-0" onClick={() => setShowOptions(false)}></div>
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[280px] overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-gray-800 font-semibold text-center">Delete message?</h3>
            </div>
            
            <div className="flex flex-col">
              <button 
                onClick={() => deleteHandler('me')}
                className="py-3 px-4 hover:bg-gray-50 text-blue-600 font-medium active:bg-gray-100 transition-colors"
              >
                Delete for me
              </button>
              
              {isSender && (
                <button 
                  onClick={() => deleteHandler('everyone')}
                  className="py-3 px-4 hover:bg-gray-50 text-red-600 font-medium border-t border-gray-100 active:bg-gray-100 transition-colors"
                >
                  Delete for everyone
                </button>
              )}
              
              <button 
                onClick={() => setShowOptions(false)}
                className="py-3 px-4 hover:bg-gray-50 text-gray-500 border-t border-gray-100 active:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message