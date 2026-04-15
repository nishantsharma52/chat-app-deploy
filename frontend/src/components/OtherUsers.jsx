import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

// 1. Yahan 'search' prop receive karein jo Sidebar se aa raha hai
const OtherUsers = ({ search }) => { 
  // my custom hook
  useGetOtherUsers()
  const { otherUsers } = useSelector(store => store.user)

  if (!otherUsers) return null;

  // 2. Redux wale 'otherUsers' ko filter karein
  // Agar 'search' khali ("") hai, toh 'includes' saare users return kar dega
  // Agar kuch type kiya hai, toh sirf matching users return honge
  const displayUsers = otherUsers.filter((user) => 
     user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='overflow-auto flex-1'>
      {/* 3. 'otherUsers' ki jagah 'displayUsers' par map chalayein */}
      {
        displayUsers.length > 0 ? (
          displayUsers.map((user) => {
            return (
              <OtherUser key={user._id} user={user} />
            )
          })
        ) : (
          // Agar search karne par koi user na mile toh ye dikhayega
          <p className="text-center text-slate-400 mt-4">No user found</p>
        )
      }
    </div>
  )
}

export default OtherUsers