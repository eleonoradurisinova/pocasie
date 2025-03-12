export function convertEpochToDate(epochTime: number): { date: string; time: string } {
  const date = new Date(epochTime * 1000) // Convert epoch time to milliseconds
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return { date: `${year}-${month}-${day}`, time: `${hours}:${minutes}:${seconds}` }
}
