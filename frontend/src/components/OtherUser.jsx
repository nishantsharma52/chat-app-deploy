import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch()
  const { selectedUser, onlineUsers } = useSelector(store => store.user)
  const isOnline = onlineUsers?.includes(user._id)
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user))
  }

  return (
    <>
      <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'flex bg-white/20' : ''} flex gap-2 items-center hover:bg-white/20 rounded p-2 cursor-pointer`}>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className='w-10 sm:w-12 rounded-full'>
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex justify-between gap-2'>
            <p className='truncate '>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0'></div>
    </>
  )
}

export default OtherUser