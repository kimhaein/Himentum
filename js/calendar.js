class Calendar {
  constructor() {
    this.focusMonth = new Date()
    this.calendarTitle = ''
    this.dayKr = ['일','월', '화' , '수' ,'목','금','토','일']

    this.btnContainer  = document.getElementsByClassName('btnContainer')[0]
    this.monthCalendarBox  = document.getElementsByClassName('monthCalendarBox')[0]
    this.currentMonth = document.getElementsByClassName('currentMonth')[0]

    this.init()
  }

  // 초기 세팅
  init() {
    this.renderMonthCalendar()
  }

  // 오늘
  getToday() {
    this.focusMonth = new Date()
  }

  // 이전 달 이동
  prevMonth(){
    this.focusMonth = new Date(this.focusMonth.getFullYear(), this.focusMonth.getMonth() - 1, this.focusMonth.getDate());
    this.renderCalendar()
  }

  // 다음 달 이동
  nextMonth(){
    this.focusMonth = new Date(this.focusMonth.getFullYear(), this.focusMonth.getMonth() + 1, this.focusMonth.getDate());
    this.renderCalendar()
  }

  // 달력 그리기
  renderMonthCalendar(){
    const year = this.focusMonth.getFullYear();
    const month = this.focusMonth.getMonth() + 1;
    const calendarTitle = `${year}년 ${month}월`
    this.currentMonth.textContent = calendarTitle

    // 해당달의 첫날
    const fristDate = new Date(year, month -1 ,1)
    const fristDay = fristDate.getDay()
    // 해당달의 마지막날
    const lastDate = new Date(year,month,0)
    const lastDay = lastDate.getDay()

    // 전달의 마지막날
    const prevLastDate = new Date(year, month -1 ,0).getDate()
    // 다음달의 첫날
    const nextFristDate = new Date(year, month +1 ,1).getDate()



  }

  onChangeMode({target}) {
    const className = target.className.split(' ')[0]
    const calendarTarget = document.getElementsByClassName(`${className}Calendar`)[0]

    for (const node of this.btnContainer.childNodes) {
      if(node.nodeName === 'SPAN'){
        const nodeClassName = node.className.split(' ')[0] 
        const calendar = document.getElementsByClassName(`${nodeClassName}Calendar`)[0]
        if(node.nodeName === 'SPAN' && nodeClassName !== className){
          node.classList.remove('on');
          calendar.classList.remove('display')
        } else {
          node.classList.add('on');
          calendarTarget.classList.add('display')
        }
      }
    }


  }

}

(()=>{
  const calendar = new Calendar()

  calendar.btnContainer.addEventListener('click',(e)=>{
    calendar.onChangeMode(e)
  });

})()

