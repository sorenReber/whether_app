"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import { IoSunny } from "react-icons/io5";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atom";

type Props = {location?: string}

export default function Navbar({location}: Props) {

    const [city, setCity] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    //
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
    const [place, setPlace] = useAtom(placeAtom);
    const [_, setLoadingCity] = useAtom(loadingCityAtom);


    async function handleInputChange(value: string){
        setCity(value);
        if(value.length >= 3){
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setError('');
                setShowSuggestions(true);
            }
           catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
                
           }
        }
        else{
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSuggestionClick(value: string){
        setCity(value);
        setShowSuggestions(false);
    }

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>){
        setLoadingCity(true);
        e.preventDefault();
        if(suggestions.length == 0){
            setError('Location not found');
            setLoadingCity(false);
        }
        else{
            setError('');
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestions(false);  
            },500);

        }
    }

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
                {/* <MdOutlineMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" /> */}
                <MdOutlineLocationOn className="text-3xl text-gray-900 hover:opacity-80 cursor-pointer"/>
                <p className="text-sm text-slate-900/80">
                    {location}
                </p>
                <div className="relative">
                    {/* SearchBox Component */}
                    <SearchBox 
                    value={city}
                    onSubmit={handleSubmitSearch}
                    onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <SuggestionBox {...{
                            showSuggestions,
                            suggestions,
                            handleSuggestionClick,
                            error
                    }} />
                </div>
                </section>

            </div>
        </nav>
    )
}

function SuggestionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
}: {
        showSuggestions: boolean;
        suggestions: string[];
        handleSuggestionClick: (suggestion: string) => void;
        error: string;
    }) {
    return (
    <>{((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
        {error && suggestions.length <1 && (
            <li className="text-red-500 p-1">{error}</li>            
        )}
        {suggestions.map((item,i) => (
            <li key={i} 
            onClick={() => handleSuggestionClick(item)} 
            className="cursor-pointer p-1 rounded hover:bg-gray-200">{item}</li>
        ))}
    </ul>
    )}

    </>
    );
}