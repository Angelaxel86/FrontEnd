//Блок меню настройки
const settingActiv = document.querySelector('.setting-activ'),
      settingP = document.querySelectorAll('.setting-p'),
      settingFormGeneral = document.querySelector('.setting-form-general'),
      settingFormNotification = document.querySelector('.setting-form-notification'),      
      inputRadio = document.querySelectorAll('.input-radio'),
      selectTimezone = document.getElementById('timezone');

function writeSettings() {

  document.querySelector('.lng-language').innerText = langArr['language'][lang];
  document.querySelector('.lng-timezone').innerText = langArr['timezone'][lang]; 

  //Кнопки general и notification
  settingP.forEach( (item) => {
    item.addEventListener('click', (e) => {

      if(document.querySelector('.setting-p-activ')){      
        document.querySelector('.setting-p-activ').classList.remove('setting-p-activ');
      }
      //console.log(e.target)
      e.target.classList.add('setting-p-activ');

      if( e.target.classList.contains('general') ) { 
        //console.log('Form')
        settingFormNotification.style.display = 'none';
        settingFormGeneral.style.display = 'block';
         
      }
      if(e.target.classList.contains('notification') ) {
        //console.log('Form2')   
        settingFormNotification.style.display = 'block';
        settingFormGeneral.style.display = 'none';
      }

    })
  })  
  
  // Меню general

  // Выбор часового пояса
  selectTimezone.addEventListener('change', (e) => {
    timeZone = selectTimezone.value;
    //console.log(timeZone)
  })

  // Выбор часового режима
  inputRadio.forEach( (item) => {
    item.addEventListener('click', (e) => {
      //console.dir(e.target.parentElement)    
      timeZoneHour = e.target.value;

      if(document.querySelector('.radio-activ')){
        document.querySelector('.radio-activ').classList.remove('radio-activ');
      }

      e.target.parentElement.classList.add('radio-activ')
    })

  })
}

//Меню Notification
const checkMessage = document.getElementById('message'),  
      checkTaskUpdate = document.getElementById('task-update'),  
      checkTaskDeadline = document.getElementById('task-deadline'),  
      checkMentorHelp = document.getElementById('mentor-help');

// checkMessage.checked = message;
// checkTaskUpdate.checked = taskUpdate;
// checkTaskDeadline.checked = taskDeadline;
// checkMentorHelp.checked = mentorHelp;

// Кнопка сохранить настройки, отправка на бек
document.querySelector('.btn-settings').addEventListener('click', (e) => {

  mentors[indexMentor].settings.lang = lang;
  //console.dir(mentors[indexMebtor])
  localStorage.mentors = JSON.stringify(mentors);

  console.log(lang, timeZone, timeZoneHour);
  console.log('message: ' + checkMessage.checked);
  console.log('taskUpdate: ' + checkTaskUpdate.checked);
  console.log('taskDeadline: ' + checkTaskDeadline.checked);
  console.log('mentorHelp: ' + checkMentorHelp.checked);

  // message = checkMessage.checked;
  // taskUpdate = checkTaskUpdate.checked;
  // taskDeadline = checkTaskDeadline.checked;
  // mentorHelp = checkMentorHelp.checked;

  location.reload()
})