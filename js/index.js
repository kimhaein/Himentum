class Himentum {
  constructor(apiKey,todoList,todoLastId,userName) {
    this.wheatherApiKey = apiKey.OPEN_WEATHER_API_KEY
    this.imageApiKey = apiKey.UNSPLASH_ACCESS_KEY
    this.datetime = new Date()
    this.geolocation = {}
    this.weater = {}
    this.todoLastId = todoLastId || 0
    this.todoList = todoList
    this.userName = userName
    this.date = document.getElementsByClassName('date')[0]
    this.time = document.getElementsByClassName('time')[0]
    this.notice = document.getElementsByClassName('notice')[0]
    this.location = document.getElementsByClassName('location')[0]
    this.temp = document.getElementsByClassName('temp')[0]
    this.hello =  document.getElementsByClassName('hello')[0]
    this.todoListContainer =  document.getElementsByClassName('todoList')[0]
    this.todoInput = document.getElementsByClassName('todoInput')[0]
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
          weatherIcon:data.weather[0].icon.substring(0,2)
        }

        this.location.textContent = `${data.name}, ${data.sys.country}`
        this.temp.innerHTML =`${Math.round(data.main.temp)}<span>°C</span>`
        this.weatherType.textContent = data.weather[0].main
        this.weatherIcon.innerHTML = `<img src="./image/icons/${data.weather[0].icon.substring(0,2)}.png" alt="${data.weather[0].main}"/>`
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

    if(this.userName){
      this.getUserName()
      this.getTodoList()
      this.todoInput.classList.add('display');
    }
  }

  setTodoList({currentTarget}) {
    this.todoList.push({
      id : ++this.todoLastId ,
      todo: currentTarget.value
    })
    localStorage.setItem('todoList' , JSON.stringify(this.todoList))
    currentTarget.value = '';
    this.getTodoList()
  }

  getTodoList() {
    const html = this.todoList.map((v,i)=>{
      return `<li><span>${v.todo}</span> <button type="button" class="deleteBtn" data-id="${v.id}">삭제</button></li>`
    })
    this.todoListContainer.innerHTML = html.join('')
  }

  deleteTodoList({target}) {
    const targetId = +target.dataset.id;
    const list = this.todoList.filter((v)=> targetId !== v.id)
    this.todoList = list
    localStorage.setItem('todoList' , JSON.stringify(this.todoList))
    this.getTodoList()
  }

  setUserName({currentTarget}){
    localStorage.setItem('userName' ,currentTarget.value)
    this.getUserName()
    this.todoInput.classList.add('display');
  }
  getUserName(){
    const userName = localStorage.getItem('userName')
    this.hello.textContent = `HELLO! ${userName}`;
  }

}

(()=>{
  const todoList = JSON.parse(localStorage.getItem('todoList')) || []
  const todoLastId = (todoList.length === 0) ? 0 : todoList[todoList.length-1].id
  const userName = localStorage.getItem('userName') || '' 

  const himentum = new Himentum(
    {
      OPEN_WEATHER_API_KEY,
      UNSPLASH_ACCESS_KEY,
      UNSPLASH_SECRET_KEY,
    },
    todoList,
    todoLastId,
    userName,
  );
  const nameInput = document.getElementsByClassName('nameInput')[0]
  if(nameInput){
    nameInput.addEventListener("change",(e)=>{
      himentum.setUserName(e)
    });
  }


  const todoInput = document.getElementsByClassName('todoInput')[0]
  todoInput.addEventListener("change",(e)=>{
    himentum.setTodoList(e)
  });

  const todo = document.getElementsByClassName('todoList')[0]
  todo.addEventListener('click',(e)=>{
    himentum.deleteTodoList(e)
  });
})()

