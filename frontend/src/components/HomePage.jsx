import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { selectedUser } = useSelector(store => store.user)

  return (
    <div
      className='flex w-screen text-black overflow-hidden bg-gray-400 shadow-md bg-white/10 backdrop-blur-md border border-white/20'
      style={{ height: '100dvh' }}
    >
      <div className={`${selectedUser ? 'hidden' : 'flex'} sm:flex w-full sm:w-[280px] md:w-[300px] lg:w-[350px] flex-shrink-0 border-r border-slate-500`}>
        <Sidebar />
      </div>
      <div className={`${selectedUser ? 'flex' : 'hidden'} sm:flex flex-1 flex-col overflow-hidden min-w-0`}>
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage