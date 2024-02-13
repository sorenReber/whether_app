import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import { WeatherDetailProps } from './WeatherDetails';

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail({}: Props) {
  return (
    <Container className='gap-4'>
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col items-center">
          <WeatherIcon iconName="01d" />
          <p className="text-xl">Sunny</p>
        </div>
      </section>
    </Container>
  )
}