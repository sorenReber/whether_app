/** @format */
import { cn } from "@/utils/cn";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox( props: Props ) {
    return (
        <form onSubmit={props.onSubmit} className={cn("flex items-center relative justify-center h-10", props.className)}>
            <input type="text" onChange={props.onChange} value={props.value} placeholder="Search location" 
            className="px-4 py-2 w-[230px] 
            border border-gray-300 rounded-l-md 
            focus:outline-none focus:border-blue-500 h-full"/>
            <button className="px-4 py-[9px] bg-blue-500 rounded-r-md 
            hover:bg-blue-600 text-white h-full
            focus:outline-none whitespace-nowrap"><IoSearchSharp /></button>
        </form>
    );
}