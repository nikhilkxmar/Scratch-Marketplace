import React from 'react'

const Button = (props) => {
  return (
    <div className='ml-2 flex items-center shrink-0'>
        <div className={`relative px-5 ${props.height} overflow-hidden font-medium text-white bg-transparent border-[1px] border-gray-400 group`}>
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-400 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-400 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-400 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-700 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease font-rajdhani text-[18px]">{props.tag}</span>
        </div>
    </div>
  )
}

Button.defaultProps = {
  height: "py-[17.5px]"
};

export default Button