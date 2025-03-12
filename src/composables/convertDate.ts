export const convertDate = (date?: string) => {
  const newDate = date ? new Date(date) : new Date()
  const day = String(newDate.getDate()).padStart(2, '0')
  const month = String(newDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = newDate.getFullYear()

  return `${day}.${month}.${year}`
}
