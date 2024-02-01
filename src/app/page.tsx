'use client';
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";


// https://api.openweathermap.org/data/2.5/forecast?q=Phoenix&appid=fd6bc48aac94c49fa591ac65e98b154e

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: City;
}

interface WeatherEntry {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: SystemInfo;
  dt_txt: string;
}

interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface SystemInfo {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}




export default function Home() {
    const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Phoenix&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`);
      return data
    }
    );
    console.log('data', data?.city.country);
    if (isLoading) 
      return (
        <div className="flex items-center justify-center items-center min-h-screen">
          <p className="animate-bounce">Loading...</p>
          </div>
    );
  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
          {/* Todays data */}
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), "EEEE")}</p>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), "m.dd.yyyy")})</p>
            </h2>
            <div></div>
          </div>
        </section>
        <section>

        </section>
      </main>
    </div>
  );
}
