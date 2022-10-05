//Task

//Detail Task
function showTaskDetail(obj) {

	if(document.querySelector('.activ-li') && document.querySelector('.activ-svg') && document.querySelector('.activ-p')){
    	document.querySelector('.activ-li').classList.remove('activ-li');
    	document.querySelector('.activ-svg').classList.remove('activ-svg');
    	document.querySelector('.activ-p').classList.remove('activ-p');
    };

	document.querySelector('.task').classList.add('activ-li');   
	document.querySelector('.task').children[0].classList.add('activ-svg');
	document.querySelector('.task').children[1].classList.add('activ-p');

	displayNone()
  	headText.children[0].innerText = langArr['detail-task'][lang];   

  	headBox.style.display = 'none';
  	taskActiv.style.display = 'block';
  	detailTask.style.display = 'flex';
  	if(window.matchMedia("(max-width: 375px)").matches){
  		detailTask.style.display = 'block';
  	}
	
	const taskDetailCard = document.createElement('div'),
		  taskDetailImg = document.createElement('img'),
		  taskDetailName = document.createElement('p'),
		  taskDetailAvtor = document.createElement('p'),		  
		  taskDetailSpeciality = document.createElement('p'),
		  btnGetMentor = document.createElement('button'),
		  taskDetailDays = document.createElement('div'),
		  taskDetailTime = document.createElement('img'),
		  taskDetailDaysP = document.createElement('p'),
		  descriptionTitle = document.createElement('p'),
		  descriptionEdit = document.createElement('p'),
		  descriptionSave = document.createElement('p'),
		  descriptionText = document.createElement('p'),
		  descriptionTextEdit = document.createElement('textarea'),
		  essenceOfAssessment = document.createElement('p'),
		  taskDetailBox = document.createElement('div'),
		  taskDetailMentors = document.createElement('div'),
      taskDetailMentorsP = document.createElement('p'),
      changeDeadline = document.createElement('p'),
      inputDateChange = document.createElement('input'),
      formCheckBox = document.createElement('div'),
      addTask = document.createElement('div'),
      addTaskP = document.createElement('p'),
      inputAddTask = document.createElement('input'),
      btnAddTask = document.createElement('button'),
      taskDetailAvtorCard = document.createElement('div')

	detailTask.innerHTML = '';		  

	taskDetailCard.classList.add('task-detail-card');
	taskDetailImg.classList.add('task-detail-img');
	taskDetailName.classList.add('task-detail-name');
	taskDetailSpeciality.classList.add('task-detail-speciality');
	btnGetMentor.classList.add('subscribers-mentors');
	taskDetailDays.classList.add('task-detail-days');
	descriptionTitle.classList.add('description-title');
	descriptionText.classList.add('description-text');
	essenceOfAssessment.classList.add('essence-of-assessment');
	taskDetailAvtor.classList.add('task-detail-avtor');
	taskDetailBox.classList.add('task-detail-box');
	descriptionEdit.classList.add('description-edit');
	descriptionTextEdit.classList.add('description-text-edit');
	descriptionSave.classList.add('description-save');
	taskDetailMentors.classList.add('task-detail-mentors');
  taskDetailMentorsP.classList.add('task-detail-mentors-p');
  changeDeadline.classList.add('change-deadline');
  inputDateChange.setAttribute('id', 'date-change');
  inputDateChange.setAttribute('type', 'datetime-local');
  addTask.classList.add('add-task');
  addTaskP.classList.add('add-task-p');
  inputAddTask.classList.add('input-add-task');
  btnAddTask.classList.add('btn-add-task');
  taskDetailAvtorCard.classList.add('task-detail-avtor-card')

	
	if(obj.subscribersMentors.indexOf(`${mentorActivId}`) === -1){
		btnGetMentor.innerText = langArr['To perform the task'][lang];
		btnGetMentor.classList.remove('subscribers-mentors-complete');
	} else {
		btnGetMentor.innerText = langArr['You are doing this task'][lang];
		btnGetMentor.classList.add('subscribers-mentors-complete');
	}	

	taskDetailTime.src = './img/Time-Circle.svg';
	descriptionTitle.innerText = langArr['Description'][lang];
	essenceOfAssessment.innerText = langArr['lng-details-task'][lang];
	descriptionEdit.innerText = langArr['Edit'][lang];
	if(window.matchMedia("(max-width: 375px)").matches){
		descriptionTextEdit.setAttribute('cols', '39');
		descriptionTextEdit.setAttribute('rows', '13');
	} else{
		descriptionTextEdit.setAttribute('rows', '10');
		descriptionTextEdit.setAttribute('cols', '50');
	}
	
	descriptionSave.innerText =  langArr['Save'][lang];
	taskDetailMentorsP.innerText = langArr['Perform a task:'][lang];
	changeDeadline.innerText = langArr['Change Deadline'][lang];
	addTaskP.innerText = langArr['Add A Task:'][lang];
	inputAddTask.placeholder = langArr['Add an extra task'][lang];
	btnAddTask.innerText = langArr['Submit Task'][lang];

	taskDetailImg.src = obj.img;
	taskDetailName.innerText = obj.taskName;
	taskDetailSpeciality.innerText = obj.speciality;
	taskDetailDaysP.innerText =  `${new Date(obj.deadline).getDate()}.${new Date(obj.deadline).getMonth()+1}.${new Date(obj.deadline).getFullYear()}`;
	descriptionText.innerText = obj.description;

	//Change Deadline

	changeDeadline.addEventListener('click', () => {
		inputDateChange.style.display = 'block';
		changeDeadline.style.display = 'none';
	})

	inputDateChange.addEventListener('change', () => {
		inputDateChange.style.display = 'none';
		changeDeadline.style.display = 'block';
		tasks[taskIndex].deadline = new Date(inputDateChange.value).getTime();
		taskDetailDaysP.innerText = `${new Date(inputDateChange.value).getDate()}.${new Date(inputDateChange.value).getMonth()+1}.${new Date(inputDateChange.value).getFullYear()}`;
		localStorage.tasks = JSON.stringify(tasks);
		taskTodayCards.innerHTML = '';
		idTaskToday = 0;
		taskWrite(listDeadlineThreeDays(), taskTodayCards, style='task-today');
		detailTasks(listDeadlineThreeDays(), 0);
	})

	//subscribersMentors
	
  let idAvtorTask =	obj.avtorTask;
  let mentorAvtorTask = mentors.find(x => x.id === idAvtorTask);
  if(idAvtorTask === mentorActivId){
  	taskDetailAvtor.innerText = langArr['You are the uthor of this task'][lang];
  	descriptionEdit.style.display = 'inline-block';
  	btnGetMentor.style.display = 'none';
  	changeDeadline.style.display = 'block';
  	if(window.matchMedia("(max-width: 375px)").matches){
  		taskDetailMentors.style.maxHeight = 'none';
  	} else{
  		taskDetailMentors.style.maxHeight = '920px';
  	}  	
  	addTask.style.display = 'block';
  } else {
  	  	
		taskDetailAvtor.innerText = `${langArr['Author Task'][lang]}: ${mentorAvtorTask.name}`;
  }
  //console.dir(mentorAvtorTask)
  let avtor = [];
  avtor.push(mentorAvtorTask)
  mentorsWrite(avtor, taskDetailAvtorCard, style = 'detail-task');

  descriptionEdit.addEventListener('click', () => {
  	descriptionText.style.display = 'none';
  	descriptionTextEdit.value = obj.description;
  	descriptionTextEdit.style.display = 'block';
  	descriptionSave.style.display = 'inline-block';
  })

  descriptionSave.addEventListener('click', () => {
  	obj.description = descriptionTextEdit.value;
  	localStorage.tasks = JSON.stringify(tasks);
  	descriptionTextEdit.style.display = 'none';
  	descriptionText.innerText = descriptionTextEdit.value;
  	descriptionText.style.display = 'block';
  	descriptionSave.style.display = 'none';
  })

	//Subscribers Mentors

  btnGetMentor.addEventListener('click', () => {
  	let pos = obj.subscribersMentors.indexOf(`${mentorActivId}`);
  	let posMT = mentors[indexMentor].followed.tasksId.indexOf(`${obj.id}`)
  	//console.dir(indexMentor)
  	if(pos === -1){
  		btnGetMentor.innerText = langArr['You are doing this task'][lang];
  		btnGetMentor.classList.add('subscribers-mentors-complete');
  		obj.subscribersMentors.push(mentorActivId)
  	} else {
  		btnGetMentor.innerText = langArr['To perform the task'][lang];
			btnGetMentor.classList.remove('subscribers-mentors-complete');
			obj.subscribersMentors.splice(pos, 1); 
  	}
  	
  	if(posMT === -1){  		
  		mentors[indexMentor].followed.tasksId.push(`${obj.id}`);
  	} else {
  		mentors[indexMentor].followed.tasksId.splice(posMT, 1);
  	}
  	performList();
  	taskDetailMentors.innerHTML = '';
  	mentorsWrite(performList(), taskDetailMentors, style = 'task-detail-mentors');
  	localStorage.tasks = JSON.stringify(tasks);
  	localStorage.mentors = JSON.stringify(mentors);

  	//console.dir(mentors[indexMentor].followed)	
  	//console.dir(tasks)	
  	//console.log(obj.id)
  })

  //mentorListShow  
  
  function performList(){
	  let mentorsList = [];
	  obj.subscribersMentors.forEach( (el) => {
	  	let mentor = mentors.find(x => x.id === el);
	  	mentorsList.push(mentor);
	  })
	  return mentorsList;
	}
	
	//console.dir(mentorsList)

	//Add an extra task

	btnAddTask.addEventListener('click', () => {
		if(inputAddTask.value !== ''){ 
			let task = {
				accomplished: 'false',
				task: inputAddTask.value
			}
			tasks[taskIndex].details.push(task);
			localStorage.tasks = JSON.stringify(tasks);
			assessment();
			inputAddTask.value = '';
		}	
		
	})

	mentorsWrite(performList(), taskDetailMentors, style = 'task-detail-mentors');

	detailTask.append(taskDetailCard);
	taskDetailCard.append(taskDetailImg);
	taskDetailCard.append(taskDetailName);
	taskDetailCard.append(taskDetailAvtor);
	taskDetailCard.append(taskDetailAvtorCard);
	taskDetailCard.append(taskDetailSpeciality);
	taskDetailCard.append(btnGetMentor);
	taskDetailCard.append(taskDetailDays);
	taskDetailDays.append(taskDetailTime);
	taskDetailDays.append(taskDetailDaysP);
	taskDetailDays.append(changeDeadline);
	taskDetailDays.append(inputDateChange);
	taskDetailCard.append(descriptionTitle);
	taskDetailCard.append(descriptionEdit);
	taskDetailCard.append(descriptionSave);
	taskDetailCard.append(descriptionText);
	taskDetailCard.append(descriptionTextEdit);
	taskDetailCard.append(essenceOfAssessment);
	taskDetailCard.append(formCheckBox);
	detailTask.append(taskDetailBox);
	taskDetailBox.append(addTask);
	addTask.append(addTaskP);
	addTask.append(inputAddTask);
	addTask.append(btnAddTask);
	taskDetailBox.append(taskDetailMentorsP);
	taskDetailBox.append(taskDetailMentors);

	//Essence of Assessment

	function assessment(){
		formCheckBox.innerHTML = '';
		let idInput = 0;
		//console.dir(obj.details)
		obj.details.forEach( (item) => {
			const detailsDiv = document.createElement('div'),
						inputDetail = document.createElement('input'),
						labelDetail = document.createElement('label')

			detailsDiv.classList.add('form-check');
			detailsDiv.classList.add('details-div');
			inputDetail.classList.add('form-check-input');
			inputDetail.type = 'checkbox';		
			inputDetail.id = `id-input${idInput}`;
			labelDetail.classList.add('form-check-label');
			labelDetail.classList.add('details-div-p');
			labelDetail.setAttribute( 'for', `id-input${idInput}`);
			labelDetail.style.cursor = 'pointer';
			if(idAvtorTask !== mentorActivId){
				inputDetail.setAttribute('disabled', '');
			}
			if(item.accomplished === 'true'){
				inputDetail.setAttribute('checked', '');
			}
			
			inputDetail.addEventListener('change', () =>{			
					item.accomplished = `${inputDetail.checked}`;
					//console.dir(obj.details);
					tasks[taskIndex].details = obj.details;
					localStorage.tasks = JSON.stringify(tasks);
					getTasks()
					//console.dir(tasks)
					timeLimitCards.innerHTML = '';
					idTimeLimit = 0
					taskWrite(listTimeLimit(), timeLimitCards, style='time-limit-cards');
					newTaskCards.innerHTML = '';
					idNewTask = 0
					taskWrite(tasks, newTaskCards, style='new-task-cards');
					taskCards.innerHTML = '';
					idTask = 0
					taskWrite(listNewTasks(), taskCards, style='upcoming-task');
					taskTodayCards.innerHTML = '';
					idTaskToday = 0;
					taskWrite(listDeadlineThreeDays(), taskTodayCards, style='task-today');
					detailTasks(listDeadlineThreeDays(), 0);
					progressView();    		
			})

			idInput++;

			labelDetail.innerText = item.task;

			formCheckBox.append(detailsDiv);
			detailsDiv.append(inputDetail);
			detailsDiv.append(labelDetail);
			
		})
	}

	assessment();
}

//Explore Task

//Time limit one week

const timeLimitCards = document.querySelector('.time-limit-cards');

function listTimeLimit(){
	let limitWeek = [];
  tasks.forEach( (el) => {
    if( (Math.round(( el.deadline - Date.now() ) / 86400000)) < 8 && el.deadline >= Date.now() ){
      limitWeek.push(el);
      limitWeek.sort( (a, b) => (a.deadline > b.deadline) ? 1 : -1);
    }
  })
  return limitWeek;
}

taskWrite(listTimeLimit(), timeLimitCards, style='time-limit-cards')

const timeLimitArrowRight = document.querySelector('.time-limit-arrow-right');
const timeLimitArrowLeft = document.querySelector('.time-limit-arrow-left');
let idL = 1
let flagLimit = false;

timeLimitArrowRight.addEventListener('click', (e) => {
	if(window.matchMedia("(max-width: 375px)").matches){
		if(flagLimit === false) idL = idL
	} else{
		if(flagLimit === false) idL = idL +2
	}
  
  if(idTimeLimit>idL) {
    flagLimit = true;
   if(document.getElementById(`timeLimit${idL=idL+1}`)) {
      document.getElementById(`timeLimit${idL}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  } 
})

timeLimitArrowLeft.addEventListener('click', (e) => {
	if(window.matchMedia("(max-width: 375px)").matches){
		if(flagLimit === true) idL = idL
	} else{
		if(flagLimit === true) idL = idL -2
	}
  
  if(idL>1){
    flagLimit = false;
    if(document.getElementById(`timeLimit${idL=idL-1}`)) {
      document.getElementById(`timeLimit${idL}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }  
})

//New Task/All Tasks

const newTaskCards = document.querySelector('.new-task-cards');

taskWrite(tasks, newTaskCards, style='new-task-cards');

const newTaskArrowRight = document.querySelector('.new-task-arrow-right');
const newTaskArrowLeft = document.querySelector('.new-task-arrow-left');
let idN = 1
let flagNew = false;

newTaskArrowRight.addEventListener('click', (e) => {
	if(window.matchMedia("(max-width: 375px)").matches){
		if(flagNew === false) idN = idN	
	} else{
		if(flagNew === false) idN = idN +2
	}
  
  if(idNewTask>idN) {
    flagNew = true;
   if(document.getElementById(`newTask${idN=idN+1}`)) {
      document.getElementById(`newTask${idN}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  } 
})

newTaskArrowLeft.addEventListener('click', (e) => {
	if(window.matchMedia("(max-width: 375px)").matches){
		if(flagNew === true) idN = idN	
	} else{
		if(flagNew === true) idN = idN -2
	}
  
  if(idN>1){
    flagNew = false;
    if(document.getElementById(`newTask${idN=idN-1}`)) {
      document.getElementById(`newTask${idN}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }  
})

//Create Task

const btnCreateTask = document.querySelector('.btn-create-task'),
	  	chooseArrowLeft = document.querySelector('.choose-arrow-left'),
	  	chooseArrowRight = document.querySelector('.choose-arrow-right')

btnCreateTask.addEventListener('click', () => {
	window.scrollTo(0, 0);
	headText.children[0].innerText = 'Create New Task'

	headBox.style.display = 'none';
	exploreTask.style.display = 'none';
	createTask.style.display = 'block';
})

let idS = 1, flagSelect = false;
chooseArrowRight.addEventListener('click', (e) => {
	if(window.matchMedia("(max-width: 375px)").matches){
		if(flagSelect === false) idS = idS	
	} else{
		if(flagSelect === false) idS = idS +1	
	}
  
  if(7>idS) {
    flagSelect = true;
   if(document.getElementById(`select${idS=idS+1}`)) {
      document.getElementById(`select${idS}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  } 
})

chooseArrowLeft.addEventListener('click', (e) => {
	if(window.matchMedia("(max-width: 375px)").matches){
		if(flagSelect === true) idS = idS	
	} else{
		if(flagSelect === true) idS = idS -1	
	}
  
  if(idS>1){
    flagSelect = false;
    if(document.getElementById(`select${idS=idS-1}`)) {
      document.getElementById(`select${idS}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }  
})

let newTask = {};
		newTask.details = [];
		newTask.subscribersMentors = [];
		newTask.avtorTask = mentorActivId;
		newTask.accomplished = 'false';
		newTask.date = new Date().getTime();

const imgSelect = document.querySelectorAll('.img-select'),
	    taskImg = document.querySelector('.task-img'),
	    uploadImg = document.querySelector('.upload-img'),
	    btnSpec = document.querySelectorAll('.btn-spec'),
	    inputTaskName = document.getElementById('task-name'),
	    specialityPText = document.querySelector('.speciality-p-text'),
	    datepicker = document.getElementById('datepicker')

imgSelect.forEach( (item) => {
	item.addEventListener('click', (e) => {
		
		taskImg.src = e.target.src; 
		newTask.img = e.target.src;
		//console.dir(newTask)
	})
})

uploadImg.addEventListener('change', (e) => {
	console.log('UPLOAD IMG')
	let file = e.target.files[0];
	let fileReader = new FileReader();

	fileReader.addEventListener('load', (el) => {
		taskImg.src = `${el.target.result}`;
		newTask.img = el.target.result;
	})
	fileReader.readAsDataURL(file);
})

inputTaskName.addEventListener('keyup', () => {
	newTask.taskName = inputTaskName.value;
	//console.dir(newTask)
})


btnSpec.forEach( (item) => {
	item.addEventListener('click', (e) => {		
		specialityPText.innerText = e.target.textContent;
		newTask.speciality = e.target.textContent;
		//console.dir(newTask)		
	})
})

datepicker.addEventListener('change', (e) => {
	newTask.deadline = new Date(datepicker.value).getTime();	
	//console.dir(newTask.endDate)
})

const descriptionText = document.querySelector('.description-text');

if(window.matchMedia("(max-width: 375px)").matches){
	descriptionText.setAttribute('cols', '39');
	descriptionText.setAttribute('rows', '14');
}

descriptionText.addEventListener('change', () => {
	newTask.description = descriptionText.value;
	//console.dir(newTask)
})

const essenceTasks = document.querySelectorAll('.essence-tasks'),
	 		btnCreateNewTask = document.querySelector('.btn-create-new-task'),
	  	errorMessage = document.querySelector('.error-message')

let idGenerat

//BTN 
btnCreateNewTask.addEventListener('click', () => {

	//Генератор id	
	function generatorIdTask(){
		idGenerat = Math.floor(Math.random()*1000);
		//console.log('id: '  + idGenerat)
		tasks.forEach( (item) => {
			if(item.id === `${idGenerat}`){
				generatorIdTask()
			} else  if(item.id !== `${idGenerat}`){
				newTask.id = idGenerat;
			}
		})
	}
	generatorIdTask()		

	if(newTask.taskName && newTask.img && newTask.speciality && newTask.deadline){
		essenceTasks.forEach( (item) => {		
			if(item.value !== ''){
					let objTasks = {
						accomplished: 'false',
						task: `${item.value}`
					};
				newTask.details.push(objTasks);			
			}
		})

		tasks.push(newTask);
		localStorage.tasks = JSON.stringify(tasks);
		getTasks();
		timeLimitCards.innerHTML = '';
		idTimeLimit = 0;
		taskWrite(listTimeLimit(), timeLimitCards, style='time-limit-cards');
		newTaskCards.innerHTML = '';
		idNewTask = 0;
		taskWrite(tasks, newTaskCards, style='new-task-cards');
		taskCards.innerHTML = '';
		idTask = 0;
		taskWrite(listNewTasks(), taskCards, style='upcoming-task');
		taskTodayCards.innerHTML = '';
		idTaskToday = 0;
		detailTasks(listDeadlineThreeDays(), 0);
		taskWrite(listDeadlineThreeDays(), taskTodayCards, style='task-today');		
		showTaskDetail(newTask);
		showGraph(thisWeek());
		progressView();

		taskImg.src = './img/picture.png';
		inputTaskName.value = '';
		specialityPText.innerText = '';
		datepicker.value = '';
		descriptionText.value = '';
		essenceTasks.forEach( (item) => {
			item.value = ''
		})

	} else{
		errorMessage.innerText = '';
		if(!newTask.taskName) errorMessage.innerText += `Please, enter a Task Name \r\n`;
		if(!newTask.img) errorMessage.innerText += `Please select a Task Image\r\n`;
		if(!newTask.speciality) errorMessage.innerText += `Please select a Task Speciality\r\n`;
		if(!newTask.deadline) errorMessage.innerText += `Please select a Task Deadline\r\n`;
	}
	//console.dir(newTask)	
})

//Search Task

const inputSearc = document.querySelector('.input-search'),
      inputDesign = document.getElementById('design'),
      allSpeciality = document.getElementById('all-speciality'),
      webDeveloper = document.getElementById('web-developer'),
      appsDesign = document.getElementById('apps-design'),
      tasksInProgress = document.getElementById('tasks-in-progress')    

inputSearch.addEventListener('keyup', () => {	
  let searcTasks = [];
  for(let i=0; i<tasks.length; i++){  	
    if(tasks[i].taskName.includes(inputSearch.value)) {
      searcTasks.push(tasks[i]);
      
    }
  }
  newTaskCards.innerHTML = '';
  taskWrite(searcTasks, newTaskCards, style='new-task-cards');
  allSpeciality.checked = "true";
})

//Category

const inputMyTasks = document.getElementById('my-tasks');

inputMyTasks.addEventListener('change', () => {
  if(inputMyTasks.checked === true){  
    let listMyTasks = [];
    for(let i=0; i<tasks.length; i++){
      if(tasks[i].avtorTask === mentorActivId) {
        listMyTasks.push(tasks[i]);
      }
    }
    newTaskCards.innerHTML = '';
    idNewTask = 0;
    taskWrite(listMyTasks, newTaskCards, style='new-task-cards');
  }
})

allSpeciality.checked = 'true';
allSpeciality.addEventListener('change', () => {
  if(allSpeciality.checked === true){
   	newTaskCards.innerHTML = '';
   	idNewTask = 0;
    taskWrite(tasks, newTaskCards, style='new-task-cards');
  }
})

inputDesign.addEventListener('change', () => {
  if(inputDesign.checked === true){  
    let listDesign = [];
    for(let i=0; i<mentors.length; i++){
      if(tasks[i].speciality === 'UI UX Design') {
        listDesign.push(tasks[i]);
      }
    }
    newTaskCards.innerHTML = '';
    idNewTask = 0;
    taskWrite(listDesign, newTaskCards, style='new-task-cards');
  }
})

webDeveloper.addEventListener('change', () => {
  if(webDeveloper.checked === true){  
    let listWebDeveloper = [];
    for(let i=0; i<mentors.length; i++){
      if(tasks[i].speciality === 'Web Developer') {
        listWebDeveloper.push(tasks[i]);
      }
    }
    newTaskCards.innerHTML = '';
    idNewTask = 0;
    taskWrite(listWebDeveloper, newTaskCards, style='new-task-cards');
  }
})

appsDesign.addEventListener('change', () => {
  if(appsDesign.checked === true){  
    let listAppsDesign = [];
    for(let i=0; i<mentors.length; i++){
      if(tasks[i].speciality === 'Apps Design') {
        listAppsDesign.push(tasks[i]);
      }
    }
    newTaskCards.innerHTML = '';
    idNewTask = 0;
    taskWrite(listAppsDesign, newTaskCards, style='new-task-cards');
  }
})

tasksInProgress.addEventListener('change', () => {	
	if(tasksInProgress.checked === true){		
		let listTasksInProgress = [];
		for(let i=0; i<tasks.length; i++){
			for(let j=0; j<mentors[indexMentor].followed.tasksId.length; j++){
				if(tasks[i].id === +mentors[indexMentor].followed.tasksId[j]){					
					listTasksInProgress.push(tasks[i])
				}
			}
		}
		newTaskCards.innerHTML = '';
		idNewTask = 0;
    taskWrite(listTasksInProgress, newTaskCards, style='new-task-cards');
	}
})

//Sort Deadline

btnSortBy.addEventListener('click', () => {
	sortTasks = JSON.parse(localStorage.tasks);
  sortTasks.sort( (a, b) => (a.deadline > b.deadline) ? 1 : -1);
  newTaskCards.innerHTML = '';
  idNewTask = 0;
  taskWrite(sortTasks, newTaskCards, style='new-task-cards');
})