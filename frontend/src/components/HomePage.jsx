import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { selectedUser } = useSelector(store => store.user)

  return (
    <div className='flex w-screen h-[100dvh] text-black overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-md'>

      {/* SIDEBAR */}
      <div className={`
        ${selectedUser ? 'hidden' : 'flex'} 
        sm:flex 
        w-full sm:w-[280px] md:w-[300px] lg:w-[350px] 
        flex-shrink-0 border-r border-slate-500 h-full
      `}>
        <Sidebar />
      </div>

      {/* MESSAGE AREA */}
      <div className={`
        ${selectedUser ? 'flex' : 'hidden'} 
        sm:flex 
        flex-1 flex-col overflow-hidden min-w-0 h-full
      `}>
        <MessageContainer />
      </div>

    </div>
  )
}

export default HomePage