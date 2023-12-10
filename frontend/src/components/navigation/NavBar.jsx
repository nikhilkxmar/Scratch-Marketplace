"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from '../../assets/logo.png'
import Connect from "./Connect";
import { useMoralis } from "react-moralis";

export default function NavBar() {
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = () => {
    if (window.scrollY) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isScrolling ? (
          <NavbarScroll isScrolling={isScrolling} />
        ) : (
          <NavbarFixed />
        )}
      </AnimatePresence>
    </>
  );
}

function NavbarFixed() {
  return (
    <nav className="fixed z-10 flex justify-between items-center w-full top-4 pt-4 px-12">
      <Link href={"/"}>
      <div className="flex items-center text-white">
        <p className="text-xl font-rajdhani text-[22px] text-white">SCRATCH</p>
        <Image src={logo} width={20} height={20} alt="logo" className="rotate-45 ml-[10px] mb-[3px]"/>
      </div>
      </Link>
      <ul className="flex items-center py-2">
        <li className="px-6 text-md font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/store"}>Store</Link>
        </li>
        <li className="px-6 text-md font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/collections"}>Collections</Link>
        </li>
        <li className="px-6 text-md font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li className="px-6 text-md font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/create"}>Create NFT</Link>
        </li>
      </ul>
      <div><Connect /></div> 
    </nav>
  );
}

function NavbarScroll({ isScrolling }) {

  const [account, setAccount] = useState(false)
  const { isWeb3Enabled } = useMoralis()

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 

  useEffect(() => {
    if(isWeb3Enabled) {
      setAccount(true)
    } else {
      setAccount(false)
    }
  }, [isWeb3Enabled, account]);

  return (
    <motion.nav
      key={1}
      initial="initial"
      animate={isScrolling ? "animate" : "initial"}
      exit="exit"
      variants={animation}
      className="fixed z-10 flex justify-between px-4 py-2 rounded-full bg-neutral-900 bg-opacity-40 backdrop-blur-xl left-1/2 top-10"
    >
      <div className="flex items-center">
      <Link href={"/"}>
      <div className="flex items-center text-white">
        <Image src={logo} width={20} height={20} alt="logo" className="rotate-45 ml-2 mr-4"/>
      </div>
      </Link>
      <ul className="flex items-center py-2">
        <li className="px-4 font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/store"}>Store</Link>
        </li>
        <li className="px-4 font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/collections"}>Collections</Link>
        </li>
        <li className="px-4 font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li className="px-4 font-rajdhani text-[20px] text-neutral-200 hover:scale-110 hover:text-white duration-200 transition ease-in-out">
          <Link href={"/create"}>Create</Link>
        </li>
      </ul>
      {
      !account ?
      <button className="px-4 py-2 text-neutral-200 bg-black rounded-full font-rajdhani text-[20px] ml-4" onClick={() => scrollToTop()}>
        Go To Connect
      </button> : <Connect/>
      }
      </div>
    </motion.nav>
  );
}

const animation = {
  initial: {
    y: -50,
    x: "-50%",
    opacity: 0,
  },
  animate: {
    y: 0,
    x: "-50%",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};