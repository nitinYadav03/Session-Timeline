import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';


function Header({toggle, setToggle}) {
  return (
    <header className='flex items-center py-2.5 z-[12] relative border-gray-800 border-b border-solid bg-[#1a1a1a]'>
        <div className='container-xs flex items-center justify-between gap-5 w-full mx-3'>
            <div className='flex gap-2 text-white'>
            <FontAwesomeIcon className='size-6' icon={faClipboard} />
                <h1 className='text-[16px] font-bold text-white'>Participants-wise Session Timeline</h1>
            </div>
            <div className='flex items-center text-white gap-2.5'>
                <h1 className='text-[16px] font-bold'>Show Participant Timeline</h1>
                {toggle ? <ToggleOnIcon onClick={()=>setToggle(!toggle)} fontSize='large' className='text-[#424FB0] cursor-pointer' /> : <ToggleOffIcon onClick={()=>setToggle(!toggle)} fontSize='large' className='text-[#424FB0] cursor-pointer' />}
            </div>
        </div>
    </header>
  )
}

export default Header