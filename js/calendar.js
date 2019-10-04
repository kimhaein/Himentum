class Calendar {
  constructor() {
    this.init()

    this.btnContainer  = document.getElementsByClassName('btnContainer')[0]
  }

  // 초기 세팅
  init() {
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

