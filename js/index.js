class Himentum {
  constructor(apiKey) {
    this.wheatherApiKey = apiKey.OPEN_WEATHER_API_KEY
    this.imageApiKey = apiKey.UNSPLASH_ACCESS_KEY
    this.datetime = new Date()
    this.geolocation = {}
    this.weater = {}
    this.background = document.getElementsByClassName('backgrund')
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
        this.fetchBackgroundImage(data.weather[0].main)
      })
      .catch(err => console.log(err))
  }

  getGeolocation(){
    navigator.geolocation.getCurrentPosition(
      (postion) => this.sucessGeolocation(postion),
      () => console.log("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    )
  }

  dateFomatting(datetime) {
    const hour = datetime.getHours();
    const min = datetime.getMinutes();
    return `${hour}:${( min < 10)? `0${min}`: min}`
  }

  fetchBackgroundImage(keyword) {
    const query = `client_id=${this.imageApiKey}&query=weather-${keyword}&per_page=1`
    fetch(`https://api.unsplash.com/search/photos?${query}`)
      .then((response) => response.json())
      .then((data) => { 
        this.background[0].style.backgroundImage = `url(${data.results[0].urls.regular})`
      })
      .catch(err => console.log(err))
  }

  init() {
    this.dateFomatting(this.datetime)
    this.getGeolocation()
  }
  

  
  clock() {

  }

}

(()=>{
  const himentum = new Himentum({
    OPEN_WEATHER_API_KEY,
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY
  });
})()

