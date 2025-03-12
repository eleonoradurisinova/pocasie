export const weatherApi = (mesto: string) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${mesto}&lang=sk&appid=fbf07e8ae673a1c666bcb04e59d4b60b&units=metric`
}
