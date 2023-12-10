import React from 'react'

const Loading = (props) => {
  return (
    <div className='w-full h-[120vh]'>
    <div className=' w-full h-full flex flex-col justify-center items-center relative' style={{ backgroundImage: "url(/star.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

        <div className="absolute bottom-[-50px] left-[-50px] w-[40%] h-[350px] blue__gradient z-[1]"></div>
        <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[1]"></div>

        <div className='loader block'></div>
        <div className="flex items-center text-white mt-12">
          <p className="text-xl font-rajdhani text-[22px] text-white">{props.tag}</p>
      </div>
    </div>
    </div>
  )
}

export default Loading