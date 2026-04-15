import React, { useState } from 'react'
import { IoSend } from "react-icons/io5"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const SendInput = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const { selectedUser } = useSelector(store => store.user)
    const { messages } = useSelector(store => store.message)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!message.trim()) return

        try {
            const res = await axios.post(
                `https://chat-app-deploy-9wkt.onrender.com/api/v1/message/send/${selectedUser?._id}`,
                { message },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )

            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error)
        }

        setMessage("")
    }

    return (
        <div className='w-full px-2 py-2 bg-white/20 backdrop-blur-md border-t border-white/10'>

            <form onSubmit={onSubmitHandler}>
                <div className='relative flex items-center'>

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

                    <button
                        type='submit'
                        className='absolute right-3 text-cyan-600'
                    >
                        <IoSend size={20} />
                    </button>

                </div>
            </form>

        </div>
    )
}

export default SendInput