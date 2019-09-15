class Himentum {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.datetime = new Date()
    this.geolocation = {}
    this.weater = {}
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
    const query = `lat=${this.geolocation.lat}&lon=${this.geolocation.lon}&appid=${this.apiKey}&units=metric`
    fetch(`http://api.openweathermap.org/data/2.5/weather?${query}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.geolocation = {...this.geolocation, name:data.name}
        this.weater = {
          temp:data.main.temp,
          weather:data.weather[0].main,
          weatherIcon:data.weather[0].icon
        }
      })
      .catch(err => console.log(err));
  }

  getGeolocation(){
    navigator.geolocation.getCurrentPosition(
      (postion) => this.sucessGeolocation(postion),
      () => alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    )
  }

  dateFomatting(datetime) {
    const hour = datetime.getHours();
    const min = datetime.getMinutes();
    return `${hour}:${( min < 10)? `0${min}`: min}`
  }

  init() {
    this.dateFomatting(this.datetime)
    this.getGeolocation()
  }
  

  
  clock() {

  }

}

(()=>{
  const himentum = new Himentum(OPEN_WEATHER_API_KEY);
})()

