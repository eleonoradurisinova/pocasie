import { weatherApi } from '@/config/url.ts'

// export interface WeatherData {
//   cod: string
//   message: number
//   cnt: number
//   list: [
//     {
//       dt: number
//       main: {
//         temp: number
//         feels_like: number
//         temp_min: number
//         temp_max: number
//         pressure: number
//         humidity: number
//         temp_kf: number
//       }
//       weather: [
//         {
//           id: number
//           main: string
//           description: string
//           icon: string
//         },
//       ]
//       clouds: {
//         all: number
//       }
//       wind: {
//         speed: number
//         deg: number
//         gust: number
//       }
//       visibility: number
//       pop: number
//       sys: {
//         pod: string
//       }
//       dt_txt: string
//     },
//   ]
// }
//
// export interface WeatherResult {
//   data: WeatherData | string
//   error: unknown
// }

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

interface Wind {
  speed: number
  deg: number
}

interface Clouds {
  all: number
}

interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface Coord {
  lon: number
  lat: number
}

export interface WeatherData {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}
export interface WeatherResult {
  data: WeatherData | string
  error: unknown
}

export const getWeatherByCity = async (mesto: string): Promise<WeatherResult> => {
  let data: WeatherData | string = ''
  let error: unknown
  try {
    const response = await fetch(weatherApi(mesto))
    const responseData = await response.json()
    data = response.ok ? responseData : 'Mesto nebolo nájdené'
  } catch (e) {
    console.error('Chyba pri načítaní dát', e)
    error = e
  }
  return { data, error }
}
