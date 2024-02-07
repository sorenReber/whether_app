import React from 'react'
import { LuEye } from 'react-icons/lu';

export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  return (
    <>
    <SingleWeatherDetail 
    icon = {<LuEye />}
    information="Visibility"
    value= {props.visibility}
    />
    <SingleWeatherDetail 
    icon = {<LuEye />}
    information="Humidity"
    value= {props.humidity}
    />
    </>
  )
}
export interface SingleWeatherDetailProps {
  information: string;
  value: string;
  icon: React.ReactNode;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-2 text-xs font-semibold text-black/80">
        <p className='whitespace-nowrap'>{props.information}</p> 
        <div className='text-3xl'>{props.value}
            <p>{props.value}</p>
        </div>
    </div>
  )
}