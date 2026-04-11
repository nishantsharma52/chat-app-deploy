import React, { use, useState } from 'react'
import { IoSend } from "react-icons/io5"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const SendInput = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const {selectedUser, authUser} = useSelector(store=>store.user)
    const {messages} = useSelector(store=>store.message)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log("Selected User:", selectedUser?._id)
            console.log("Auth User:", authUser?._id)
            const res = await axios.post(`https://chat-app-deploy-9wkt.onrender.com/api/v1/message/send/${selectedUser?._id}`, {message}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(res)
            dispatch(setMessages([...messages, res?.data?.newMessage]))
            
        } catch (error) {
            console.log(error)
        }
        setMessage("")
        
    }
    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='w-full p-3 pr-12 text-sm rounded-lg 
                    bg-white/50 backdrop-blur-md 
                    text-white/110 placeholder-white/110 
                    border border-white/20 
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/50'
                />
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4 text-cyan-600 hover:text-cyan-500'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput