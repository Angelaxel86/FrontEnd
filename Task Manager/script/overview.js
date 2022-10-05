//Блок Обзор/overview
const overviewActiv = document.querySelector('.overview-activ'),
      diagramBox = document.querySelector('.diagram');

//Фунция прогрессбара

function progressView(){

  let completeTasks = [];
  tasks.forEach( (el) =>{
    if(el.accomplished === 'true'){
      completeTasks.push(el)
    }
  })

  let runningTask = completeTasks.length;  // количество выполненных задач
  let allTask = tasks.length ;  //общее количество задач

  diagramBox.dataset.percent = Math.ceil(runningTask/allTask*100);  

  document.querySelector('.running-p').children[0].innerText = allTask;
  document.querySelector('.running-task').children[1].innerText = runningTask;

  let deg = (360 * diagramBox.dataset.percent / 100) + 180;
  if(diagramBox.dataset.percent >= 50){
    diagramBox.classList.add('over_50');
  }else{
  diagramBox.classList.remove('over_50');
  }
  diagramBox.querySelector('.piece.right').style.transform = 'rotate('+deg+'deg)';
  document.querySelector('.percent').innerText = `${diagramBox.dataset.percent}%`;
}

progressView();

//График

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 7) % 7); //getDay() +6 поменял на +7
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 7) % 7) / 7); //getDay() +6 поменял на +7
}

let nowWeek = new Date().getWeek();

function week(arr){
  let newArr = {
    nowWeek: [],
    lastWeek: []
  };
  let d;
  arr.map( (el) => {
    if( nowWeek  === new Date(el.date).getWeek() ) {
      d = new Date(el.date).getDay();
      if(!newArr.nowWeek[d]){
        newArr.nowWeek[d] = [];
      }
      newArr.nowWeek[d].push(new Date(el.date));
    }

    if( nowWeek -1 === new Date(el.date).getWeek() ){
      d = new Date(el.date).getDay();
      if(!newArr.lastWeek[d]){
        newArr.lastWeek[d] = [];
      }
      newArr.lastWeek[d].push(new Date(el.date));
    }
  })
  return newArr;
}

//console.dir(week(tasks))

function thisWeek(){
  let listActivity = week(tasks);
  let listNowWeek = [];
  for(let i=0; i<7; i++){
    if(listActivity.nowWeek[i] === 'undefined'){
      listNowWeek[i] = 'undefined';
    } else if(listActivity.nowWeek[i]){
      listNowWeek[i] = listActivity.nowWeek[i].length 
    }  
  }
  return listNowWeek;
}

function lastWeek(){
  let listActivity = week(tasks);
  let listLastWeek = [];
  for(let i=0; i<7; i++){
    if(listActivity.lastWeek[i] === 'undefined'){
      listLastWeek[i] = 'undefined';
    } else if(listActivity.lastWeek[i]){
      listLastWeek[i] = listActivity.lastWeek[i].length 
    }  
  }
  return listLastWeek;
}

const selectWeek = document.getElementById('change-week'),
      canvasBox = document.querySelector('.canvas-box')

selectWeek.addEventListener('change', () => {  
  if(selectWeek.value === 'now'){
    showGraph(thisWeek());
  }
  if(selectWeek.value === 'last'){  
    showGraph(lastWeek());
  }
});

function showGraph(arr){
  const graph = document.createElement('canvas');

  graph.setAttribute('id', 'canvas');

  canvasBox.innerHTML = '';

  graph.width = '480';
  graph.height = '130';
  
  canvasBox.append(graph);

  let graphData = {
    labels: langArr['day'][lang],
    datasets: [{
      label: 'Task',
      backgroundColor:'#546FFF',
      borderColor: 'black',
      data: arr
    }]
  };
  let lineChart = new Chart(graph, {
    type: 'line',
    data: graphData 
  });
}

//Change avatar

const inputChangeAvatar = document.getElementById('input-change-avatar');

inputChangeAvatar.addEventListener('change', (e) => {
  let file = e.target.files[0];
  let fileReader = new FileReader();

  fileReader.addEventListener('load', (el) => {   
    avatarImg.src =`${el.target.result}`;    
    mentors[indexMentor].avatar = el.target.result;
    localStorage.mentors = JSON.stringify(mentors);
  })
  fileReader.readAsDataURL(file);    
})

showGraph(thisWeek());

//Mentors Write

const mentorsCards = document.querySelector('.mentors-cards');

let idMonthlyMentors = 0,
    idRecentMentors = 0

function mentorsWrite(data, container, style) {
  data.forEach( (el) => {

    const mentorCard = document.createElement('div'),
          mentorCardAllBox = document.createElement('div'),
          mentorCardAllAbout = document.createElement('div'),
          mentorAvatar = document.createElement('div'),
          mentorCardFlex = document.createElement('div'),
          avatar = document.createElement('img'),
          mentorP = document.createElement('div'),
          mentorName = document.createElement('p'),
          mentorSpeciality = document.createElement('p'),
          btnFollow = document.createElement('button'),
          mentorTask = document.createElement('p'),
          mentorReviews =document.createElement('p'),
          taskImg = document.createElement('img'),
          reviewsImg = document.createElement('img'),
          aboutYourself = document.createElement('span'),
          aboutText = document.createElement('span'),
          mentorCardSpanId = document.createElement('span')


  if(style === 'monthly-mentors'){
    mentorCard.id = `monthly-mentors${idMonthlyMentors = idMonthlyMentors+1}`;
    mentorCard.classList.add('mentor-card');    
  }

  if(style === 'recent-mentors'){
    mentorCard.id = `recent-mentors${idRecentMentors = idRecentMentors+1}`;
    mentorCard.classList.add('mentor-card');
  }

  if(style === 'mentor-cards-grid'){    
    if(el.aboutYourself === '') {
      aboutYourself.innerText = 'No info'
    } else {
       aboutYourself.innerText = `${el.aboutYourself}`;
    }   
    mentorCard.classList.add('mentor-card-all');
  };

  if(style === 'task-detail-mentors'){
    mentorCard.classList.add('mentor-card');
  }

  if(style === 'detail-task'){
    mentorCard.classList.add('detail-task');
    mentorCard.classList.add('mentor-card');
  }

  
  mentorAvatar.classList.add('mentor-avatar');
  mentorP.classList.add('mentor-p');
  mentorCardFlex.classList.add('mentor-card-flex');  
  btnFollow.classList.add('follow');
  taskImg.src = './img/note-2.svg';
  reviewsImg.src = './img/star.svg';
  reviewsImg.id = 'star-svg';
  aboutYourself.classList.add('about-yourself');
  mentorCardAllBox.classList.add('mentor-card-all-box');
  mentorCardAllAbout.classList.add('mentor-card-all-about');
  mentorCardAllAbout.style.display = 'none';
  aboutText.classList.add('about-text');
  mentorCardSpanId.style.display = 'none';

  //Данные по ментору с бека:
  if(el.avatar === undefined){    
    avatar.src = './img/avatar.png';
  } else {
    avatar.src = `${el.avatar}`;
  }   
  mentorName.innerText = `${el.name}`; 
  mentorSpeciality.innerText = `${el.speciality}`;
  let listMyTasks = [];
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].avtorTask === el.id) {
      listMyTasks.push(tasks[i].id);
    }
  }
  el.myTasks = listMyTasks;
  localStorage.mentors = JSON.stringify(mentors)
  mentorTask.innerText = `${el.followed.tasksId.length + listMyTasks.length} tasks`; 
  mentorReviews.innerText = `${el.mentorReviews}`;  
  mentorCardSpanId.innerText = `${el.id}`;
//---------------------------    

  container.append(mentorCard);
  mentorCard.append(mentorCardAllBox);
  mentorCard.append(mentorCardAllAbout);
  mentorCardAllAbout.append(mentorCardSpanId);
  mentorCardAllAbout.append(aboutText);
  mentorCardAllBox.append(mentorCardFlex);
  if(style === 'mentor-cards-grid'){ 
    mentorCardAllBox.append(aboutYourself);
  };
  mentorCardFlex.append(mentorAvatar);
  mentorAvatar.append(avatar);
  mentorCardFlex.append(mentorP);
  mentorP.append(mentorName);
  mentorP.append(mentorSpeciality);
  mentorCardFlex.append(btnFollow);
  mentorCardAllBox.append(mentorTask);
  mentorCardAllBox.append(mentorReviews);
  mentorTask.before(taskImg);
  mentorReviews.before(reviewsImg);

//Followed

  if( mentors[indexMentor].followed.mentorId.indexOf(`${el.id}`) === -1){    
    btnFollow.classList.remove('followed');
    btnFollow.innerText = langArr['follow'][lang];

  } else {
    btnFollow.classList.add('followed');
    btnFollow.innerText = langArr['followed'][lang];
  }

  btnFollow.addEventListener('click', (e) => {    
    
    //console.dir(e.target.parentElement.parentElement.nextElementSibling.children[0].textContent) //Id mentor      
    let id = e.target.parentElement.parentElement.nextElementSibling.children[0].textContent;
    let pos = mentors[indexMentor].followed.mentorId.indexOf(`${id}`);

    if(pos === -1){
      e.target.classList.add('followed');
      btnFollow.innerText = langArr['followed'][lang];     
      mentors[indexMentor].followed.mentorId.push(id); 
      
    } else {
      e.target.classList.remove('followed');
      btnFollow.innerText = langArr['follow'][lang];     
      mentors[indexMentor].followed.mentorId.splice(pos, 1);           
    }    
    //console.dir(mentors[indexMentor].followed.mentorId)
     localStorage.mentors = JSON.stringify(mentors);     
    
     mentorsCards.innerHTML = '';
     idMonthlyMentors = 0;
     mentorsWrite(listActiveMentors(), mentorsCards, style = 'monthly-mentors');
     mentorCardsGrid.innerHTML = '';
     mentorsWrite(mentors, mentorCardsGrid, style = 'mentor-cards-grid');
     recentMentorsCards.innerHTML = '';
     idRecentMentors = 0 ;
     mentorsWrite(listRecentMentors(), recentMentorsCards, style = 'recent-mentors');    
     
    })

    //More About Yourself

    aboutYourself.addEventListener('click', (el) => {      
      let idMentor = el.target.parentElement.parentElement.lastChild.children[0].textContent;
      let mentor = mentors.find(x => x.id === idMentor);   
      
      if(mentor.aboutYourself === ''){
        el.target.parentElement.parentElement.lastChild.children[1].innerText = 'Information not specified';
      } else {
        el.target.parentElement.parentElement.lastChild.children[1].innerText = `${mentor.aboutYourself}`;
      }          

      if(el.target.parentElement.parentElement.lastChild.style.display === 'none'){      
        el.target.parentElement.style.display = 'none';
        el.target.parentElement.parentElement.lastChild.style.display = 'block';    
      }  
    })

    aboutText.addEventListener('click', (el) => {
      if(el.target.parentElement.style.display === 'block'){
        el.target.parentElement.style.display = 'none';
        el.target.parentElement.parentElement.firstChild.style.display = 'block';
      }
    })

  }) 


}

//Monthly/Active Mentors

function listActiveMentors(){
  let activMentors = JSON.parse(localStorage.mentors);
  activMentors.sort( (a, b) => (a.followed.tasksId.length + a.myTasks.length < b.followed.tasksId.length + b.myTasks.length) ? 1 : -1 );
  return activMentors;  
}

mentorsWrite(listActiveMentors(), mentorsCards, style = 'monthly-mentors');

//Горизонтальный скролл

const mentorsBtnRight = document.querySelector('.mentors-arrow-right');
const mentorsBtnLeft = document.querySelector('.mentors-arrow-left');
let idM = 1
let flagMonthlyMentors = false;

mentorsBtnRight.addEventListener('click', (e) => {
  if(window.matchMedia("(max-width: 375px)").matches){
    if(flagMonthlyMentors === false) idM = idM
  } else{
     if(flagMonthlyMentors === false) idM = idM +1
  }
 
  if(idMonthlyMentors>idM) {
    flagMonthlyMentors = true;
   if(document.getElementById(`monthly-mentors${idM=idM+1}`)) {
      document.getElementById(`monthly-mentors${idM}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  } 
})

mentorsBtnLeft.addEventListener('click', (e) => {
  if(window.matchMedia("(max-width: 375px)").matches){
    if(flagMonthlyMentors === true) idM = idM
  } else{
    if(flagMonthlyMentors === true) idM = idM -1
  }
  
  if(idM>1){
    flagMonthlyMentors = false;
    if(document.getElementById(`monthly-mentors${idM=idM-1}`)) {
      document.getElementById(`monthly-mentors${idM}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }  
})

// Task Write
let idTask = 0,
    idTaskToday = 0,
    idTimeLimit = 0,
    idNewTask = 0
const taskCards = document.querySelector('.task-cards');    

function taskWrite(data, container, style){
  data.forEach( (el, index) => {

    const taskCard = document.createElement('div'),
          cardImg = document.createElement('img'),
          upcomingTaskName = document.createElement('p'),
          upcomingTaskSpeciality = document.createElement('p'),
          progressTitle = document.createElement('div'),
          titleP = document.createElement('p'),
          percentP =document.createElement('p'),
          progress = document.createElement('div'),
          progressBar = document.createElement('div'),
          taskBox = document.createElement('div'),
          taskBoxDays = document.createElement('div'),
          timeCircle = document.createElement('img'),
          daysLeft = document.createElement('p'),
          taskAvatars = document.createElement('div'),
          idTaskSpan = document. createElement('span')


    if(style==='upcoming-task'){
      taskCard.classList.add('task-card');
      cardImg.classList.add('task-card-img');
      taskCard.id = `task${idTask=idTask+1}`;
    };

    if(style==='time-limit-cards'){
      taskCard.classList.add('task-card');
      cardImg.classList.add('task-card-img');
      taskCard.id = `timeLimit${idTimeLimit=idTimeLimit+1}`;
    };

    if(style==='task-today'){
      cardImg.classList.add('task-card-img-today');     
      taskCard.id = `today${idTaskToday=idTaskToday+1}`;
    };

    if(style==='new-task-cards'){
      taskCard.classList.add('task-card');
      cardImg.classList.add('task-card-img');
      taskCard.id = `newTask${idNewTask=idNewTask+1}`;
    };

    progress.classList.add('progress');
    progressBar.classList.add('progress-bar');
    progressBar.role = 'progressbar';
    progressTitle.classList.add('progress-title')
    upcomingTaskName.classList.add('upcoming-task-name');
    upcomingTaskSpeciality.classList.add('upcoming-task-speciality');
    titleP.classList.add('lng-progress');
    titleP.innerText = langArr['progress'][lang];
    taskBox.classList.add('task-box');
    taskBoxDays.classList.add('task-box-days');
    timeCircle.src = './img/Time-Circle.svg';
    taskAvatars.classList.add('task-avatars');
    idTaskSpan.style.display = 'none';

    //Данные с бека
    cardImg.src = el.img;
    upcomingTaskName.innerText = el.taskName;
    upcomingTaskSpeciality.innerText = el.speciality;    

    let taskAccomplished = []; 
    el.details.forEach((e) => {
      if(e.accomplished === 'true'){
        taskAccomplished.push(e);
      }
    })
    
    progressBar.style.width = `${Math.ceil(taskAccomplished.length/el.details.length*100)}%`; 
    percentP.innerText = `${Math.ceil(taskAccomplished.length/el.details.length*100)}%`;

    if(taskAccomplished.length === el.details.length){
      el.accomplished = 'true';      
      localStorage.tasks = JSON.stringify(tasks);
    } else if(taskAccomplished.length !== el.details.length){
      el.accomplished = 'false';      
      localStorage.tasks = JSON.stringify(tasks);
    }


    if(el.deadline <= Date.now()){
      daysLeft.innerText = `${langArr['time is over'][lang]}`;
    } else{
      daysLeft.innerText = `${Math.round(( el.deadline - new Date().getTime() ) / 86400000)} ${langArr['days-left'][lang]}`
    }
    
    idTaskSpan.innerText = el.id;

    //Click Detail Task
    taskCard.addEventListener('click', (e) => {
      //console.dir(e.currentTarget.children[6].textContent)      
      let taskId = e.currentTarget.children[6].textContent;
      let oneTask = tasks.find(x => x.id === +taskId);
      taskIndex = tasks.findIndex(x => x.id === +taskId);      
      showTaskDetail(oneTask);
      if(window.matchMedia("(max-width: 375px)").matches){
        taskActiv.style.marginTop = '208px';
        window.scrollTo(0, 0);
      }      
      //console.dir(oneTask)
    })

    //subscribersMentors avatar

    let positionAvatars = -10
    el.subscribersMentors.forEach( (item, index) => {
      if(index < 6){
        const avtarImg = document.createElement('img');      

        let mentor = mentors.find(x => x.id === item);    

        avtarImg.src = mentor.avatar;
        avtarImg.alt = 'avatar'
        avtarImg.style.left = `${positionAvatars +=13}px`
        taskAvatars.append(avtarImg);
      }    
    })
    

    container.append(taskCard);
    taskCard.append(cardImg);
    taskCard.append(upcomingTaskName);
    taskCard.append(upcomingTaskSpeciality);
    taskCard.append(progressTitle);
    progressTitle.append(titleP);
    progressTitle.append(percentP);
    taskCard.append(progress);
    progress.append(progressBar);
    taskCard.append(taskBox);
    taskBox.append(taskBoxDays);
    taskBoxDays.append(timeCircle);
    taskBoxDays.append(daysLeft);
    taskBox.append(taskAvatars);
    taskCard.append(idTaskSpan);

  })
}

//Upcoming/New tasks for the week

function listNewTasks(){
  let nowDay = Date.now()
  let newTask = [];
  tasks.forEach( (el) => {
    if(el.date > nowDay - 604800000){
      newTask.push(el)
    }
  })
  return newTask;
}

taskWrite(listNewTasks(), taskCards, style='upcoming-task');

//Горизонтальный скрол  
//idTask
const upcomingBtnRight = document.querySelector('.upcoming-arrow-right');
const upcomingBtnLeft = document.querySelector('.upcoming-arrow-left');
let idT = 1
let flagTask = false;

upcomingBtnRight.addEventListener('click', (e) => {
  if(window.matchMedia("(max-width: 375px)").matches){
    if(flagTask === false) idT = idT
  } else{
    if(flagTask === false) idT = idT +1
  }
  
  if(idTask>idT) {
    flagTask = true;
   if(document.getElementById(`task${idT=idT+1}`)) {
      document.getElementById(`task${idT}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  } 
})

upcomingBtnLeft.addEventListener('click', (e) => {
  if(window.matchMedia("(max-width: 375px)").matches){
    if(flagTask === true) idT = idT  
  } else{
    if(flagTask === true) idT = idT -1
  }
  
  if(idT>1){
    flagTask = false;
    if(document.getElementById(`task${idT=idT-1}`)) {
      document.getElementById(`task${idT}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }  
})

//Календарь

let currentFirstDate;

const calendarNumber = document.querySelectorAll('.calendar-number'),
      calendarDay = document.querySelectorAll('.calendar-day');

for(let i=0; i<7; i++){
  calendarDay[i].innerText = langArr['day'][lang][i]
};      

function addDate(date,n){    
  date.setDate(date.getDate()+n);    
  return date;
};

function createTable(date){ 
  let week = date.getDay()-1;
  date = addDate(date, week*-1);
  currentFirstDate = new Date(date); 

  document.querySelector('.calendar-month').innerText = `${langArr['month'][lang][currentFirstDate.getMonth()]} ${currentFirstDate.getFullYear()} `;

  for(let i=0; i<7; i++){    
      calendarNumber[i].innerText = (i===0 ? addDate(date, -1) : addDate(date, 1)).getDate();    
  }
}  

createTable(new Date());

document.querySelector('.calendar-left').addEventListener('click', () => {
  createTable(addDate(currentFirstDate,-7));
  dayActiv();
});     

document.querySelector('.calendar-right').addEventListener('click', () => {
  createTable(addDate(currentFirstDate,7));
  dayActiv(); 
});  

function dayActiv(){
  let nowDate = new Date();
  
  const calendarTd = document.querySelectorAll('.td');  

  if(document.querySelector('.number-activ') && document.querySelector('.calendar-day-activ') && document.querySelector('.td-activ')){
    document.querySelector('.number-activ').classList.remove('number-activ');
    document.querySelector('.calendar-day-activ').classList.remove('calendar-day-activ');
    document.querySelector('.td-activ').classList.remove('td-activ');
  };
  for(let i=0; i<7; i++){    

    if((+calendarNumber[i].textContent) === nowDate.getDate() && currentFirstDate.getMonth() === nowDate.getMonth()){
      calendarNumber[i].classList.add('number-activ');
      calendarDay[i].classList.add('calendar-day-activ');
      calendarTd[i].classList.add('td-activ');
    }
  }
}
dayActiv();

//Task Today/The deadline is three days

const taskTodayCards = document.querySelector('.task-today-cards'),
      details = document.querySelector('.details');

//Math.round(( el.deadline - Date.now() ) / 86400000)
function listDeadlineThreeDays(){  
  let threeDays = [];
  tasks.forEach( (el) => {
    if( (Math.round(( el.deadline - Date.now() ) / 86400000)) <= 3 && el.deadline >= Date.now() ){
      threeDays.push(el)
    }
  })
  return threeDays;
}

taskWrite(listDeadlineThreeDays(), taskTodayCards, style='task-today');

let taskDetailId ;
function detailTasks(data, i){
  
    taskDetailId = data[i].id
   
    document.querySelector('.task-speciality').innerText = data[i].speciality;
    details.innerHTML = '';

    data[i].details.forEach( (detail, index) => {      

      const detailP = document.createElement('p'),
            numberDetail = document.createElement('p'),         
            detailBox = document.createElement('div')

      detailP.classList.add('detail-p');
      numberDetail.classList.add('number-detail');  
      detailBox.classList.add('detail-box')    

      if(index < 3) {
        numberDetail.innerText =  index +1;
        detailP.innerText = detail.task;
        

        details.append(detailBox);
        detailBox.append(numberDetail);
        detailBox.append(detailP);
        detailBox.append(detailP);
        
      }

    })  
}
if( listDeadlineThreeDays().length !== 0 ){
  detailTasks(listDeadlineThreeDays(), 0);
}
//Arrows Task Today

let idTo = 1;

if(window.matchMedia("(max-width: 375px)").matches){
  const taskTodayEllipsis = document.querySelector('.task-today-ellipsis');

  taskTodayEllipsis.addEventListener('click', (e) => {
    if(idTaskToday === idTo) idTo = 0;
    if(idTaskToday>idTo) {  
      if(document.getElementById(`today${idTo=idTo+1}`)) {
        document.getElementById(`today${idTo}`).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }      
      detailTasks(tasks, idTo - 1); 
    } 
  })

} else{
  const arrowDown = document.querySelector('.arrow-down');
  const arrowUp = document.querySelector('.arrow-up');  

  arrowDown.addEventListener('click', (e) => {
    if(idTaskToday>idTo) {  
      if(document.getElementById(`today${idTo=idTo+1}`)) {
        document.getElementById(`today${idTo}`).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
     detailTasks(tasks, idTo - 1); 
    } 
  })

  arrowUp.addEventListener('click', (e) => { 
    if(idTo>1){    
      if(document.getElementById(`today${idTo=idTo-1}`)) {
        document.getElementById(`today${idTo}`).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
      detailTasks(tasks, idTo - 1);
    }  
  })
}

//Btn 'Go To Detail'

const btnDetails = document.querySelector('.btn-details');
let taskIndex;
btnDetails.addEventListener('click', () => {
  if(window.matchMedia("(max-width: 375px)").matches){
    taskActiv.style.marginTop = '208px';
    window.scrollTo(0, 0);
  } 
  let oneTask = tasks.find(x => x.id === taskDetailId); 
  taskIndex = tasks.findIndex(x => x.id === taskDetailId);
  //console.log(taskIndex)
  showTaskDetail(oneTask);

})

//Btn About yourself

const btnCreateAbout = document.querySelector('.btn-create-about'),
      aboutYourselfBox = document.querySelector('.about-yourself-box'),
      btnSave = document.querySelector('.btn-save'),
      changeAboutYourself = document.getElementById('change-about-yourself')

btnCreateAbout.addEventListener('click', () => {
  aboutYourselfBox.style.display = 'block';
  changeAboutYourself.value = mentors[indexMentor].aboutYourself;
})

btnSave.addEventListener('click', () => {
  mentors[indexMentor].aboutYourself = changeAboutYourself.value;
  aboutYourselfBox.style.display = 'none';
  localStorage.mentors = JSON.stringify(mentors);
})

