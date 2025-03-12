import type { WeatherData } from '@/composables/getWeatherByCity.ts'
import { convertEpochToDate } from '@/composables/convertEpochTime.ts'
import { DbUrl } from '@/config/dbUrl.ts'

export async function saveWeatherToDB(data: WeatherData): Promise<Response> {
  const request = {
    date: convertEpochToDate(data.dt).date,
    time: convertEpochToDate(data.dt).time,
    city: data.name,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
  }
  try {
    const response = await fetch(DbUrl.dbURL, {
      method: 'POST',
      body: JSON.stringify(request),
    })
    if (response.status !== 200) {
      throw new Error('Chyba pri ukladaní dát do DB')
    }
    return response
  } catch (e: unknown) {
    console.error('Chyba pri ukladaní dát do DB', e)
    return e as Response
  }
}
