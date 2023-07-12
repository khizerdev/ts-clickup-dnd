'use client'

import Logo from "./Logo"

import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Header = () => {

  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-gray-500/10 rounded-b-2xl">

        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-300 to-primary rounded-md filter blur-3xl opacity-50 -z-50"/>

        <Logo/>

        <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 mx-4 mb-4 sm:mb-2 md:mb-0"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"></MagnifyingGlassIcon>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value=""
              onChange={(e) => {}}
            ></input>
            <button hidden type="submit">
              Search
            </button>
        </form>
        <div>

          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-rose-500 rounded-full dark:bg-gray-600 cursor-pointer">
            <span className="font-medium text-white dark:text-gray-300">
              SK
            </span>
          </div>
        </div>

      </div>

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className=" flex items-center text-sm font-light p-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-primary">
          
          <ArrowPathIcon 
            className={`inline-block h-8 w-8 text-primary mr-1 ${
              loading && "animate-spin"
            }`}
          />

          GPT is summarising your tasks for the day...
        </p>
      </div>

    </header>
  )
}

export default Header