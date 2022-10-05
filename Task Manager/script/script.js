// Меню 

const menu = document.querySelectorAll('.menu-li'),
      headText = document.querySelector('.head-text'),
      taskTodayBox = document.querySelector('.task-today-box'),
      content = document.getElementById('content'),
      headBox = document.querySelector('.head-box'),
      taskActiv = document.querySelector('.task-activ'),
      detailTask = document.querySelector('.detail-task'),
      exploreTask = document.querySelector('.explore-task'),
      inputSearch = document.querySelector('.input-search'),
      createTask = document.querySelector('.create-task'),
      mentorsActiv = document.querySelector('.mentors-activ'),
      btnSortBy = document.querySelector('.btn-sort-by'),
      btnAvatarImg = document.querySelector('.avatar-img'),
      avatarImg = document.querySelector('div.avatar-img img'),
      messageActiv = document.querySelector('.message-activ'),
      chatMessage = document.querySelector('.chat-message'),
      liMyTasks = document.querySelector('.li-my-tasks'),
      liTasksInProgress = document.querySelector('.li-tasks-in-progress'),
      menuIcon = document.querySelector('.menu-icon'),
      navMenu = document.querySelector('.nav-menu')

if(authorizedMentor.avatar === undefined){
  avatarImg.src = './img/avatar.png';
} else {
  avatarImg.src = authorizedMentor.avatar;
} 

headBox.style.display = 'none';

var timeZone = 'en', timeZoneHour = 24,
message=false, taskUpdate=false, taskDeadline=false, mentorHelp=false;  //Глобальные переменные с бека

// Установка языка по дефолту

changeURLLanguage()
headText.children[0].innerText = `${langArr['hi'][lang]}, ${authorizedMentor.name}`;
headText.children[1].innerText = langArr['headTextP'][lang];

function displayNone() {
  headText.children[1].style.display = 'none';
  taskTodayBox.style.display = 'none';
  overviewActiv.style.display = 'none';
  headBox.style.display = 'none';
  detailTask.style.display = 'none';
  settingActiv.style.display = 'none'; 
  exploreTask.style.display = 'none'; 
  createTask.style.display = 'none'; 
  mentorsActiv.style.display = 'none'; 
  messageActiv.style.display = 'none'; 
  liMyTasks.style.display = 'none'; 
  liTasksInProgress.style.display = 'none'; 
  taskActiv.style.display = 'none'; 
}

menu.forEach( (item) => {
  item.addEventListener('click', (e) => {

    //console.dir(e.target)
    if(document.querySelector('.activ-li') && document.querySelector('.activ-svg') && document.querySelector('.activ-p')){
      document.querySelector('.activ-li').classList.remove('activ-li');
      document.querySelector('.activ-svg').classList.remove('activ-svg');
      document.querySelector('.activ-p').classList.remove('activ-p');
    }
    e.target.classList.add('activ-li');   
    e.target.children[0].classList.add('activ-svg');
    e.target.children[1].classList.add('activ-p');

    // Меню настройки
    if ( e.target.classList.contains('settings') ){
      window.scrollTo(0, 0);      
      displayNone();
      headText.children[0].innerText = langArr['settings'][lang]; 
      settingActiv.style.display = 'block';           

      writeSettings();
    }

    if ( e.target.classList.contains('mentors') ) {
      window.scrollTo(0, 0);
      displayNone();    
      headText.children[0].innerText = langArr['explore-entors'][lang];
      btnSortBy.innerText = 'Sort By : Date';
      mentorsActiv.style.display = 'block'; 
      headBox.style.display = 'flex';
      inputSearch.placeholder = langArr['Search Mentors'][lang];;
      inputSearch.value = '';
      mentors = JSON.parse(localStorage.mentors);
      document.getElementById('all-speciality').checked = 'true';
      document.querySelector('.input-search').value = '';
      mentorCardsGrid.innerHTML = '';
      mentorsWrite(mentors, mentorCardsGrid, style = 'mentor-cards-grid');
      recentMentorsCards.innerHTML = '';
      idRecentMentors = 0;
      mentorsWrite(listRecentMentors(), recentMentorsCards, style = 'recent-mentors');
    }

    if ( e.target.classList.contains('message') ) {
      window.scrollTo(0, 0);
      displayNone();
      headText.children[0].innerText = langArr['message'][lang];
      if(window.matchMedia("(max-width: 375px)").matches){
        messageActiv.style.display = 'block';  
      } else{
        messageActiv.style.display = 'flex';  
      }        
      chatMessage.innerHTML = '';
      listChat();
      chatHeaderName.innerText ='';        
    }

    if ( e.target.classList.contains('task') ) {
      window.scrollTo(0, 0);
      displayNone(); 
      headText.children[0].innerText = langArr['explore-task'][lang];
      btnSortBy.innerText = 'Sort By : Deadline';
      inputSearch.placeholder = langArr['Search Task'][lang];         
      taskActiv.style.display = 'block';
      headBox.style.display = 'flex';
      exploreTask.style.display = 'block';
      inputSearch.value = '';
      document.getElementById('all-speciality').checked = 'true';
      document.querySelector('.input-search').value = '';
      liMyTasks.style.display = 'block';
      liTasksInProgress.style.display = 'block';
      newTaskCards.innerHTML = '';
      tasks = JSON.parse(localStorage.tasks);
      idNewTask = 0;
      taskWrite(tasks, newTaskCards, style='new-task-cards');
      timeLimitCards.innerHTML = '';
      idTimeLimit = 0
      taskWrite(listTimeLimit(), timeLimitCards, style='time-limit-cards');  
    }

    if ( e.target.classList.contains('overview') ) {
      window.scrollTo(0, 0);
      displayNone(); 
      headText.children[0].innerText = `${langArr['hi'][lang]}, ${authorizedMentor.name}`;
      headText.children[1].style.display = 'block';
      taskTodayBox.style.display = 'block';
      headText.children[1].innerText = langArr['headTextP'][lang];
      overviewActiv.style.display = 'block';
      mentorsCards.innerHTML = '';
      idMonthlyMentors = 0;
      mentorsWrite(listActiveMentors(), mentorsCards, style = 'monthly-mentors');
      showGraph(thisWeek());
      idTask = 0;
      taskCards.innerHTML = '';
      taskWrite(listNewTasks(), taskCards, style='upcoming-task');
    }

    if (menuIcon.classList.contains('_active')){
      document.body.classList.remove('_lock');
      menuIcon.classList.remove('_active');
      navMenu.classList.remove('_active');
    }

  })
})

//Logout
const btnLogout = document.querySelector('.btn-logout')

btnLogout.addEventListener('click', () => {

  localStorage.removeItem('mentorActivId');
  window.location.href = './login.html'
})

//Burger menu

if(menuIcon){  
  menuIcon.addEventListener('click', (e) => {
    document.body.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
    navMenu.classList.toggle('_active');

  })
}

if(window.matchMedia("(max-width: 375px)").matches){
  document.querySelector('.btn-sort').innerText = '';
}