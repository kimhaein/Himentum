class Himentum {
  constructor(apiKey) {
    this.wheatherApiKey = apiKey.OPEN_WEATHER_API_KEY
    this.imageApiKey = apiKey.UNSPLASH_ACCESS_KEY
    this.datetime = new Date()
    this.geolocation = {}
    this.weater = {}
    this.date = document.getElementsByClassName('date')[0]
    this.time = document.getElementsByClassName('time')[0]
    this.notice = document.getElementsByClassName('notice')[0]
    this.location = document.getElementsByClassName('location')[0]
    this.temp = document.getElementsByClassName('temp')[0]
    this.weatherType = document.getElementsByClassName('weatherType')[0]
    this.weatherIcon =  document.getElementsByClassName('weatherIcon')[0]
    this.copyright = document.getElementsByClassName('copyright')[0]
    this.background = document.getElementsByClassName('backgrund')[0]

    this.init()
  }

  sucessGeolocation(postion){
    this.geolocation = {
      lat:postion.coords.latitude,
      lon:postion.coords.longitude
    }
    this.fetchGeolocationApi();
  }

  fetchGeolocationApi(){
    const query = `lat=${this.geolocation.lat}&lon=${this.geolocation.lon}&appid=${this.wheatherApiKey}&units=metric`
    fetch(`http://api.openweathermap.org/data/2.5/weather?${query}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.geolocation = {...this.geolocation, name:data.name}
        this.weater = {
          temp:data.main.temp,
          weatherType:data.weather[0].main,
          weatherIcon:data.weather[0].icon
        }

        this.location.textContent = `${data.name}, ${data.sys.country}`
        this.temp.innerHTML =`${Math.round(data.main.temp)}<span>°C</span>`
        this.weatherType.textContent = data.weather[0].main
        this.weatherIcon.innerHTML = `<img src="./image/icons/${data.weather[0].icon}.png" alt="${data.weather[0].main}"/>`
        this.fetchBackgroundImage(data.weather[0].main)
      })
      .catch(err => {
        this.notice.textContent = '위치정보를 가져오는데 실패했습니다. 다시 시도해 주세요'
      })
  }

  getGeolocation(){
    navigator.geolocation.getCurrentPosition(
      (postion) => this.sucessGeolocation(postion),
      () => {this.notice.textContent = '이 브라우저에서는 Geolocation이 지원되지 않습니다'}
    )
  }

  dateFomatting(datetime) {
    const year = datetime.getFullYear();
    const month = datetime.getMonth()+ 1;
    const day = datetime.getDate();
    return `${year}.${( month < 10)? `0${month}`: month}.${( day < 10)? `0${day}`: day}`
  }

  timeFomatting(datetime) {
    const hour = datetime.getHours();
    const min = datetime.getMinutes();
    return `${hour}:${( min < 10)? `0${min}`: min}`
  }

  fetchBackgroundImage(keyword) {
    const query = `client_id=${this.imageApiKey}&query=weather-${keyword}&per_page=1`
    fetch(`https://api.unsplash.com/search/photos?${query}`)
      .then((response) => response.json())
      .then((data) => { 
        this.copyright.innerHTML = `<a href="${data.results[0].user.links.html}">Photo by ${data.results[0].user.username} on Unsplash</a>`
        this.background.style.backgroundImage = `url(${data.results[0].urls.regular})`
        this.notice.classList.remove('display');
      })
      .catch(err => console.log(err))
  }

  init() {
    this.notice.classList.add('display');
    this.date.textContent = this.dateFomatting(this.datetime)
    setInterval(()=>{
      this.time.textContent = this.timeFomatting(new Date())
    },1000)

    this.getGeolocation()
  }


}

(()=>{
  const himentum = new Himentum({
    OPEN_WEATHER_API_KEY,
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY
  });
})()

