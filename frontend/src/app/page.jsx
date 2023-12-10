"use client"
import { useState } from "react"
import Hero from "@/components/home/Hero"
import Particle from '@/components/home/Particle'
import { loadFull } from "tsparticles";
import Loading from "@/components/global/Loading"
import Quickstart from "@/components/home/Quickstart";
import Features from "@/components/home/Features";
import Content from "@/components/home/Content";

export default function Home() {

  const [loading, setLoading] = useState(true)

  const particlesInit = async(main) => {
    await loadFull(main);
  }
 
  const particlesLoaded = () => {
    setTimeout(() => setLoading(false), 500);
  }

  return (
    <main className="w-full">
      {!loading ?
      <>
      <div className="relative">
        <div className="border-[1px] border-neutral-500 absolute w-[10px] h-[10px] rounded-full left-[46px] top-[0px] bg-neutral-500 z-[1]"></div>
        <div className="border-[1px] border-neutral-600 absolute h-[450px] left-[50px] top-[0px]"></div>
        <div className="border-[1px] border-neutral-400 absolute w-[20px] h-[20px] left-[41px] top-[453px] rotate-45"></div>
        <div className="border-[1px] border-neutral-500 absolute w-[150px] left-[64px] top-[462px]"></div>
        <div className="border-[1px] border-neutral-600 absolute w-[10px] h-[10px] rounded-full left-[214px] top-[458px] bg-neutral-500"></div>

        <div className="absolute top-[-150px] left-[0px] w-[40%] h-[350px] blue__gradient z-[-1]"></div>
        <div className="absolute top-[-200px] right-[0px] w-[25%] h-[300px] pink__gradient z-[-1]"></div>

        <Particle particlesInit={particlesInit} particlesLoaded={particlesLoaded} />
        <Hero />
        <Quickstart />
        <Features />
        <Content />
      </div>
      </> : <div>
        <div className="relative h-screen">
          <Particle particlesInit={particlesInit} particlesLoaded={particlesLoaded} />
          <Loading tag={'SCRATCH'} />
        </div>
      </div>
      }
    </main>
  )
}
