import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { signOutSuccess } from '@/redux/user/userSlice';
import { useDispatch } from 'react-redux';

const BottomNavBar = () => {
  const dispatch = useDispatch()

    const handleSignOut = async()=>{
        try{
          const res = await fetch("/api/user/signout",{
            method: "POST"
          })
  
          const data = await res.json()
  
          if(!res.ok){
            console.log(data.message)
          }else{
            dispatch(signOutSuccess())
          }
        }catch(error){
          console.log(error)
        }
      }

  return (
  <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 p-2 flex justify-around'>

      <Link to="/" className='flex flex-col items-center text-slate-800'>
      <FaHome size={20}/>
      <span className='text-xs'>Home</span>
      </Link>

      <Link to="/dashboard?tab=profile" className='flex flex-col items-center text-slate-800'>
      < FaUser size={20}/>
      <span className='text-xs'>Profile</span>
      </Link>

      <button 
      className='flex flex-col items-center text-slate-800' 
      onClick={handleSignOut}>
        <FaSignOutAlt size={20}/>
        
        <span className='text-xs' >Logout</span>
      </button>
    </nav>
  )
}


export default BottomNavBar
