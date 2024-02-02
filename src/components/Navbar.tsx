import React from "react";
import SearchBox from "./SearchBox";
import { IoSunny } from "react-icons/io5";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

type Props = {}

export default function Navbar({}: Props) {
    return (
        <nav className="shawdo-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex justify-between items center max-w-7xl px-3 mx-auto">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-3xl text-gray-500">
                        Weather 
                    </h2>
                    <IoSunny className="text-3xl mt-1 text-yellow-300" />
                </div>
                {/* */}
                <section className="flex gap-2 items-center">
                <MdOutlineMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
                <MdOutlineLocationOn className="text-3xl text-gray-900 hover:opacity-80 cursor-pointer"/>
                <p className="text-sm text-slate-900/80">
                    Arizona
                </p>
                <div>
                    {/* SearchBox Component */}
                    <SearchBox/>
                </div>
                </section>

            </div>
        </nav>
    )
}
