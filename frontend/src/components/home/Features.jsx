"use client"
import React, {useRef} from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Items from './Items'


const Features = () => {

  const ref = useRef()
  const {scrollYProgress} = useScroll({target: ref, offset:["end end", "start start"]})

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <div className='w-full'>
        <div className='flex justify-center relative' style={{display: "unset"}} ref={ref}>
          <div className='px-8 sticky top-[0px] left-[0px] backdrop-blur-sm pt-[130px] py-4 rounded-fully'>
              <h2 className='text-[45px] text-gray-100 font-rajdhani text-center' >{'Features'}</h2>
              <div className='flex justify-center'>
                <motion.div style={{ scaleX: scaleX }} className='h-[1px] bg-neutral-200 mt-[15px] w-[90vw]'></motion.div>
              </div>
          </div>
          <Items />
        </div>
    </div>
  )
}

export default Features