import React from 'react'
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className='my-7 '>
        <h2 className='text-center text-gray-500'>Created by Brajesh with ❤️ using this Amazing AI Travel Planner App</h2>
      </div>
      <h2 className='items-center justify-center flex gap-1 text-gray-500'>
        <span>Thank you for using my App, feedbacks are appreciated in</span>
        <MdEmail />
        bk117134@gmail.com
      </h2>
    </>
  )
}

export default Footer
