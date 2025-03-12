import { DbUrl } from '@/config/dbUrl.ts'

export type WeatherData = {
  id: number
  date: string
  time: string
  city: string
  temperature: number
  description: string
}

export type WeatherResponse = {
  data: WeatherData[]
}

export async function getWeatherDataFromDB(): Promise<WeatherResponse> {
  try {
    const response = await fetch(DbUrl.dbURL)
    return await response.json()
  } catch (e) {
    console.error(e)
    return { data: [] }
  }
}
