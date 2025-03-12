import { DbUrl } from '@/config/dbUrl.ts'

export async function deleteWeatherRecordFromDb(city: number) {
  try {
    return await fetch(DbUrl.dbURL, {
      method: 'DELETE',
      body: JSON.stringify({ id: city }),
    })
  } catch (e) {
    console.error(e)
    return e
  }
}
