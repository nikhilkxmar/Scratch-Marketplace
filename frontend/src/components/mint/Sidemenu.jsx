"use client"
import React, {useEffect, useState, useRef} from 'react'

const Sidemenu = ({steps, currentStep}) => {
  
  const [newStep, setNewStep] = useState([])
  const stepRef = useRef()

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps]
    let count = 0
    
    while(count < newSteps.length) {
        if(count == stepNumber) {
            newSteps[count] = {
                ...newSteps[count],
                highlighted: true,
                selected: true,
                completed: true,
            }
            count++
        }
        else if(count < stepNumber) {
            newSteps[count] = {
                ...newSteps[count],
                highlighted: false,
                selected: true,
                completed: true,
            }
            count++
        }
        else {
            newSteps[count] = {
                ...newSteps[count],
                highlighted: false,
                selected: false,
                completed: false,
            }
            count++
        }
    }
    return newSteps
  }

  useEffect(() => {
    const stepsState = steps.map((step, index) => Object.assign(
        {},
        {
            description: step,
            completed: false,
            highlighted: index == 0 ? true : false,
            selected: index == 0 ? true : false,
        }
    ))
    stepRef.current = stepsState
    const current = updateStep(currentStep - 1, stepRef.current)
    setNewStep(current)
  }, [steps, currentStep])

  const showSteps = newStep.map((step, index) => {
   return (
    <div key={index}>
    { index != steps.length - 1 ?
    <div className={`w-[1px] h-[110px] bg-gray-600 absolute duration-500 ease-in-out z-[0] mt-[30px] left-[86px] ${step.completed ? "bg-green-100" : "bg-gray-600"}`}></div> : <span></span> }
    <div className='flex items-center justify-center'>
        <div className={`w-[25px] h-[25px] rotate-45 border-gray-500 border-[1px] flex justify-center items-center ml-[74px] duration-500 ease-in-out ${step.selected ? 'bg-gray-200 text-gray-900' : 'bg-transparent'}`}><p className='rotate-[315deg] font-rajdhani'>{step.completed ? (
            <span className='text-gray-600 font-bold'>{(index + 1)}</span>
        ) : <span className='text-gray-600'>{(index + 1)}</span>}</p></div>
            <div className={`ml-[25px] font-rajdhani text-[20px] ${step.highlighted ? "text-gray-100 font-medium" : "text-gray-600"}`}>
                {step.description}
            </div>
        </div>
    </div>
    )
  })

  return (
    <div>
        <div className='w-full h-[568px] mt-8 ml-[40px]'>
            <div className='flex justify-center items-center w-[274px] h-[568px] mx-4'>
                <div className='w-full h-[80%] flex flex-col justify-between items-start relative'>
                    {showSteps}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidemenu