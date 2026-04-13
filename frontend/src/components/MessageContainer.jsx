import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"
import { IoArrowBack } from "react-icons/io5"

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const isOnline = onlineUsers?.includes(selectedUser?._id)

    useEffect(() => {
        dispatch(setMessages([]))
    }, [selectedUser, dispatch])

    useEffect(() => {
        return () => dispatch(setSelectedUser(null))
    }, [dispatch])

    return (
        <>
            {selectedUser ? (
                <div className='flex flex-col h-[100dvh] overflow-hidden'>

                    {/* ✅ HEADER (FIXED) */}
                    <div className='flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 flex-shrink-0'>

                        {/* BACK BUTTON (MOBILE) */}
                        <button
                            className='sm:hidden mr-1'
                            onClick={() => dispatch(setSelectedUser(null))}
                        >
                            <IoArrowBack className='w-5 h-5' />
                        </button>

                        <div className={`avatar ${isOnline ? "online" : ""}`}>
                            <div className='w-10 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt="user" />
                            </div>
                        </div>

                        <p className='font-medium'>{selectedUser?.fullName}</p>
                    </div>

                    {/* ✅ MESSAGES (ONLY SCROLL HERE) */}
                    <div className='flex-1 overflow-y-auto min-h-0 scroll-smooth'>
                        <Messages />
                    </div>

                    {/* ✅ INPUT (FIXED BOTTOM) */}
                    <div className='flex-shrink-0 sticky border-0 z-10'>
                        <SendInput />
                    </div>

                </div>
            ) : (
                <div className='flex-1 flex flex-col justify-center items-center'>
                    <h1 className='text-3xl sm:text-4xl text-white font-bold'>
                        Hi, {authUser?.fullName}
                    </h1>
                    <h1 className='text-lg sm:text-2xl text-white'>
                        Let's Start Conversation
                    </h1>
                </div>
            )}
        </>
    )
}

export default MessageContainer