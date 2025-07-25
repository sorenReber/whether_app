'use client';
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "@/components/Container";
import convertKelvinToF from "@/utils/convertKelvinToF";
import WeatherIcon from "@/components/WeatherIcon";
import getDayOrNightIcon from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToMiles } from "@/utils/metersToMiles";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";


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


//NEXT_PUBLIC_WEATHER_KEY = 'fd6bc48aac94c49fa591ac65e98b154e'w

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity,] = useAtom(loadingCityAtom);
    const { isLoading, error, data, refetch } = useQuery<WeatherData>('repoData', async () => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40`);
      return data
    }
    );

    useEffect(() => {
      refetch();
    }, [place, refetch]);

    console.log('data', data);

    const uniqueDates = [
      ...new Set(
        data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0])
        )
    ];

    const firstDataForEachDate = uniqueDates.map((date) => {
        return data?.list.find((entry) => {
          const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
          const entryTime = new Date(entry.dt * 1000).getHours();
          return entryDate === date && entryTime >=6;
        });
      });

    if (isLoading) 
      return (
        <div className="flex items-center justify-center items-center min-h-screen">
          <p className="animate-bounce">Loading...</p>
          </div>
    );
  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name}/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (<WeatherSkeleton />) : (
        <>
        <section className="space-y-4">
          {/* Todays data */}
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), "EEEE")}</p>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), "MMM dd, yyyy")})</p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">{convertKelvinToF(firstData?.main?.temp ?? 0)}°F</span>
                <p className="text-xs space-x-1 whitespace-nowrap">Feels like {convertKelvinToF(firstData?.main?.feels_like ?? 0)}°F</p>
                <p className="text-xs space-2">
                  <span>L: {convertKelvinToF(firstData?.main?.temp_min ?? 0)}°F{" "}</span>
                  <span>{" "}H: {convertKelvinToF(firstData?.main?.temp_max ?? 0)}°F</span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d,i) => (
                  <div
                    key={i} 
                    className="flex flex-col items-center justify-between gap-2 text-xs font-semibold">
                      <p>{format(parseISO(d.dt_txt), "h:mm a")}</p>
                      <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} /> 
                      <p>{convertKelvinToF(d.main.temp ?? 0)}°F</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/*left*/}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0]?.icon ?? '', firstData?.dt_txt ?? '')} />
            </Container>
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails airPressure={`${firstData?.main.pressure} hPa`} 
              humidity={`${firstData?.main.humidity}%`} 
              visibility={metersToMiles(firstData?.visibility ?? 10000)}
              sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "h:mm a")}
              sunset={format(fromUnixTime(data?.city.sunset ?? 1702949452), "h:mm a")}
              windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)} />
            </Container>
            {/*right*/}
          </div>
        </section>
        {/* 7 day forecast */}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>
          {firstDataForEachDate.map((d,i)=>
          <ForecastWeatherDetail key={i} 
          description={d?.weather[0].description ?? ""} 
          day={format(parseISO(d?.dt_txt ?? ''), "EEEE")} 
          date={format(parseISO(d?.dt_txt ?? ''), "MMM dd")}
          feels_like={d?.main?.feels_like ?? 0} 
          temp={d?.main?.temp ?? 0} 
          temp_max={d?.main?.temp_max ?? 0} 
          temp_min={d?.main?.temp_min ?? 0} 
          weatherIcon={d?.weather[0].icon ?? '02d'}
          airPressure={`${d?.main?.pressure ?? 0} hpa`}
          humidity={`${d?.main?.humidity ?? 0}%`}
          visibility={metersToMiles(d?.visibility ?? 10000)}
          windSpeed={convertWindSpeed(d?.wind?.speed ?? 0)}
          sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "h:mm a")}
          sunset={format(fromUnixTime(data?.city.sunset ?? 1702949452), "h:mm a")}
          />)}
        </section>
        </>)}
      </main>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between gap-2 text-xs font-semibold text-black/80">
      <div className="animate-pulse flex items-center justify-between gap-2 text-xs font-semibold text-black/80">
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
      </div>
      <div className="animate-pulse flex items-center justify-between gap-2 text-xs font-semibold text-black/80">
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
}
