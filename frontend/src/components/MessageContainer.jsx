import React, { useEffect } from 'react'
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"
import { IoArrowBack } from "react-icons/io5"

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const isOnline = onlineUsers?.includes(selectedUser?._id)

    // Jab selectedUser badle turant messages clear karo
    useEffect(() => {
        dispatch(setMessages([]))
    }, [selectedUser, dispatch])

    useEffect(() => {
        return () => dispatch(setSelectedUser(null))
    }, [dispatch])

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col flex-1 overflow-hidden'>
                        <div>
                            <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                                <button
                                    className='sm:hidden flex items-center justify-center mr-1'
                                    onClick={() => dispatch(setSelectedUser(null))}
                                >
                                    <IoArrowBack className='w-5 h-5 text-white' />
                                </button>
                                <div className={`avatar ${isOnline ? "online" : ""}`}>
                                    <div className='w-12 rounded-full'>
                                        <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                    </div>
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <div className='flex justify-between gap-2'>
                                        <p>{selectedUser?.fullName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 overflow-y-auto'>
                            <Messages />
                        </div>
                        <SendInput />
                    </div>
                ) : (
                    <div className='flex-1 flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName}</h1>
                        <h1 className='text-2xl text-white'>Let's Start Conversation</h1>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer