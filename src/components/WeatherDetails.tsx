import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visibility = '25 mi',
    humidity = '50%',
    windSpeed = '5 mph',
    airPressure = '29.92 in',
    sunrise = '5:00 AM',
    sunset = '8:00 PM',
  } = props;
  return (
    <>
    <SingleWeatherDetail 
    icon = {<LuEye />}
    information="Visibility"
    value= {visibility}
    />
    <SingleWeatherDetail 
    icon = {<FiDroplet />}
    information="Humidity"
    value={humidity}
    />
    <SingleWeatherDetail
    icon={<MdAir />}
    information="Wind Speed"
    value={windSpeed}
    />
    <SingleWeatherDetail
    icon={<ImMeter />}
    information="Air Pressure"
    value={airPressure}
    />
    <SingleWeatherDetail
    icon={<LuSunrise/>}
    information="Sunrise"
    value={sunrise}
    />
    <SingleWeatherDetail
    icon={<LuSunset />}
    information="Sunset"
    value={sunset}
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
        
        <div className='text-4xl'>
        <p >{props.icon}</p>
            
        </div>
        <p className='text-2xl'>{props.value}</p>
    </div>
  )
}