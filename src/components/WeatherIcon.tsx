import { cn } from '@/utils/cn'
import Image from 'next/image'
import React from 'react'

type Props = {};

export default function WeatherIcon(props:React.HTMLProps<HTMLDivElement> & {iconName: string}) {
  return (
    <div {...props} className={cn('relative h-20 w-20')}>
        <Image 
        width={100}
        height={100}
        alt="weather icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}/>
    </div>
  )
}