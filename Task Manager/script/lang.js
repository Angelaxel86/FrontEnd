//Получаем данные с бека

let mentorActivId = localStorage.mentorActivId;
let mentors = JSON.parse(localStorage.mentors);
let authorizedMentor = mentors.find(x => x.id === mentorActivId);
let indexMentor = mentors.findIndex(x => x.id === mentorActivId);
let tasks;
function getTasks(){
	tasks = JSON.parse(localStorage.tasks);
}

getTasks();
console.dir(mentors)
console.dir(tasks)

const langArr = {	
	'settings': {
		'en': 'Settings',		
		'ua': 'Налаштування'
	},
	'message': {
		'en': 'Message',		
		'ua': 'Повідомлення'
	},
	'mentors': {
		'en': 'Mentors',		
		'ua': 'Наставники'
	},
	'task': {
		'en': 'Task',		
		'ua': 'Завдання'
	},
	'overview': {
		'en': 'Overview',		
		'ua': 'Огляд'
	},
	'general': {
		'en': 'General',		
		'ua': 'Головні'
	},
	'notification': {
		'en': 'Notification',		
		'ua': 'Сповіщення'
	},
	'hi': {
		'en': 'Hi',		
		'ua': 'Привіт'
	},
	'headTextP': {
		'en': `Let's finish your task today!`,		
		'ua': 'Давайте завершимо ваше завдання сьогодні!' 
	},
	'language': {
		'en': 'Language',		
		'ua': 'Мова'
	},
	'timezone': {
		'en': 'Timezone',		
		'ua': 'Часовий пояс'
	},
	'save': {
		'en': 'Save Changes',		
		'ua': 'Зберегти зміни'
	},
	'help-center': {
		'en': 'Help Center',		
		'ua': 'Центр допомоги'
	},
	'trouble': {
		'en': 'Having Trouble in Learning. Please contact us for more questions.',	
		'ua': `Проблеми з навчанням. Будь ласка, зв'яжіться з нами для отримання додаткових запитань.`
	},
	'go-to': {
		'en': 'Go To Help Center',	
		'ua': 'Перейдіть до довідкового центру'
	},
	'task-update': {
		'en': 'Task Update',
		'ua': 'Оновлення завдання'
	},
	'task-deadline': {
		'en': 'Task Deadline',
		'ua': 'Термін виконання завдання'
	},
	'mentor-help': {
		'en': 'Mentor Help',
		'ua': 'Довідка наставника'
	},
	'time-format': {
		'en': 'Time Format',
		'ua': 'Формат часу'
	},
	'running-task': {
		'en': 'Running Task',
		'ua': 'Виконується завдання'
	},
	'activity': {
		'en': 'Activity',
		'ua': 'Діяльність'
	},
	'this-week': {
		'en': 'This Week',
		'ua': 'Цього Тижня'
	},
	'last-week': {
		'en': 'Last Week',
		'ua': 'минулого тижня'
	},
	'monthly-mentors': {
		'en': 'Activ Mentors',		
		'ua': 'Активні Наставники'
	},
	'followed': {
		'en': 'Followed',
		'ua': 'Підписано'
	},
	'follow': {
		'en': '+ Follow',
		'ua': '+ Підписатися'
	},
	'upcoming-task': {
		'en': 'New tasks for the week',		
		'ua': 'Нові завдання за тиждень'
	},
	'progress': {
		'en': 'Progress',
		'ua': 'Прогрес'
	},
	'month': {
		'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],		
		'ua': ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
	},
	'day': {
		'en': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		'ua': ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	},
	'explore-task': {
		'en': 'Explore Task',
		'ua': 'Знайти Задачу'
	},
	'detail-task': {
		'en': 'Detail Task',
		'ua': 'Деталі Задачі'
	},
	'explore-entors': {
		'en': 'Explore Mentors',
		'ua': 'Знайти Наставників'
	},
	'days-left': {
		'en': 'Days Left',
		'ua': 'Днів залишилось'
	},
	'time is over': {
		'en': 'Time is over',
		'ua': 'Час скінчився'
	},
	'task-today': {
		'en': 'The deadline is three days',
		'ua': 'Термін виконання три дні'
	},
	'lng-details-task': {
		'en': 'Details Task:',
		'ua': 'Деталі Завдання:'
	},
	'btn-details': {
		'en': 'Go To Detail',
		'ua': 'Перейти до деталей'
	},
	'btn-logout': {
		'en': 'Logout',
		'ua': 'Вийти'
	},
	'btn-create-about': {
		'en': 'About yourself',
		'ua': 'Про себе'
	},
	'change-avatar': {
		'en': 'Change avatar',
		'ua': 'Змінити аватар'
	},
	'Search Mentors': {
		'en': 'Search Mentors',
		'ua': 'Пошук наставників'
	},
	'Search Task': {
		'en': 'Search Task',
		'ua': 'Пошук завдання'
	},
	'time-limit-p': {
		'en': 'Time limit one week',
		'ua': 'Термін - один тиждень'
	},	
	'btn-create-task': {
		'en': '+ Create New Task',
		'ua': '+ Нове завдання'
	},
	'recent-mentors-p': {
		'en': 'New mentors this week',
		'ua': 'Нові наставники цього тижня'
	},
	'input-search-name': {
		'en': 'Searche Name',
		'ua': `Пошук Ім'я`
	},
	'You are the uthor of this task': {
		'en': 'You are the uthor of this task',
		'ua': 'Ви є автором цього завдання'
	},
	'Author Task': {
		'en': 'Author Task',
		'ua': 'Автор Завдання'
	},
	'Change Deadline': {
		'en': 'Change Deadline',
		'ua': 'Кінцевий термін'
	},
	'Description': {
		'en': 'Description:',
		'ua': 'Опис:'
	},
	'Edit': {
		'en': 'Edit',
		'ua': 'Редагувати'
	},
	'Save': {
		'en': 'Save',
		'ua': 'Зберегти'
	},
	'Add A Task:': {
		'en': 'Add A Task:',
		'ua': 'Додати завдання:'
	},
	'Add an extra task': {
		'en': 'Add an extra task',
		'ua': 'Додати додаткове завдання'
	},
	'Submit Task': {
		'en': 'Submit Task',
		'ua': 'Надіслати завдання'
	},
	'Perform a task:': {
		'en': 'Perform a task:',
		'ua': 'Виконують завдання:'
	},
	'add-img-p': {
		'en': 'Add Img',
		'ua': 'Додати зображення'
	},
	'lng-task-name': {
		'en': 'Task Name',
		'ua': 'Назва завдання'
	},
	'speciality-p': {
		'en': 'Speciality:',
		'ua': 'Спеціальність:'
	},
	'lng-deadline': {
		'en': 'Deadline',
		'ua': 'Дедлайн:'
	},
	'btn-create-new-task': {
		'en': 'Create New Task',
		'ua': 'Створити нове завдання'
	},
	'To perform the task': {
		'en': 'To perform the task',
		'ua': 'Виконати завдання'
	},
	'You are doing this task': {
		'en': 'You are doing this task',
		'ua': 'Ви виконуєте це завдання'
	}

}


// tasks.splice(1, 1)
// localStorage.tasks = JSON.stringify(tasks);


var lang;

lang = mentors[indexMentor].settings.lang;

if(lang === undefined){
	lang = 'en';
} 
	
const select = document.getElementById('change-lang');

select.value = lang;
select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
  lang = select.value;

  //location.href = window.location.pathname + '#' + lang; 

	headText.children[0].innerText = langArr['settings'][lang];
	document.querySelectorAll('.lng-settings').forEach( (item) => {
		item.innerText = langArr['settings'][lang];
	});	
	document.querySelectorAll('.lng-message').forEach( (item) => {
		item.innerText = langArr['message'][lang];
	});
	document.querySelectorAll('.lng-mentors').forEach ( (item) => {
		item.innerText = langArr['mentors'][lang];
	});	
	document.querySelectorAll('.lng-task').forEach( (item) => {
		item.innerText = langArr['task'][lang];
	});
	document.querySelectorAll('.lng-task-name').forEach( (item, index) => {
		item.innerText = langArr['task'][lang] + ` ${index}:`;
	})
	

	document.querySelector('.lng-overview').innerText = langArr['overview'][lang];
	document.querySelector('.lng-general').innerText = langArr['general'][lang];
	document.querySelector('.lng-notification').innerText = langArr['notification'][lang];
	document.querySelector('.lng-language').innerText = langArr['language'][lang];
	document.querySelector('.lng-timezone').innerText = langArr['timezone'][lang];
	document.querySelector('.btn-settings').innerText = langArr['save'][lang]; 
	document.querySelector('.help-center').children[0].innerText = langArr['help-center'][lang]; 
	document.querySelector('.help-center').children[1].innerText = langArr['trouble'][lang];
	document.getElementById('btn-help').innerText = langArr['go-to'][lang];
	if(lang === 'en'){
		document.getElementById('btn-help').style.paddingTop = '10px';
	} else{
		document.getElementById('btn-help').style.paddingTop = '0px';
	}
	document.querySelector('.lng-task-update').innerText = langArr['task-update'][lang];
	document.querySelector('.lng-task-deadline').innerText = langArr['task-deadline'][lang];
	document.querySelector('.lng-mentor-help').innerText = langArr['mentor-help'][lang];
	document.querySelector('.lng-time-format').innerText = langArr['time-format'][lang];
	document.querySelector('.lng-running-task').innerText = langArr['running-task'][lang];
	document.querySelector('.lng-activity').innerText = langArr['activity'][lang];
	document.querySelector('.lng-this-week').innerText = langArr['this-week'][lang];
	document.querySelector('.lng-last-week').innerText = langArr['last-week'][lang];
	document.querySelector('.lng-monthly-mentors').innerText = langArr['monthly-mentors'][lang];
	document.querySelector('.lng-upcoming-task').innerText = langArr['upcoming-task'][lang];
	document.querySelector('.lng-task-today').innerText = langArr['task-today'][lang];
	document.querySelector('.lng-details-task').innerText = langArr['lng-details-task'][lang];
	document.querySelector('.btn-details').innerText = langArr['btn-details'][lang];
	document.querySelector('.btn-logout').innerText = langArr['btn-logout'][lang];
	document.querySelector('.btn-create-about').innerText = langArr['btn-create-about'][lang];
	document.querySelector('.change-avatar').innerText = langArr['change-avatar'][lang];
	document.querySelector('.time-limit-p').innerText = langArr['time-limit-p'][lang];
	document.querySelector('.lng-all-tasks').innerText = langArr['task'][lang];
	document.querySelector('.btn-create-task').innerText = langArr['btn-create-task'][lang];
	document.querySelector('.recent-mentors-p').innerText = langArr['recent-mentors-p'][lang];
	document.querySelector('.input-search-name').placeholder = langArr['input-search-name'][lang];
	document.querySelector('.add-img-p').innerText = langArr['add-img-p'][lang];
	document.querySelector('.lng-task-name').innerText = langArr['lng-task-name'][lang];
	document.querySelector('.speciality-p').innerText = langArr['speciality-p'][lang];
	document.querySelector('.lng-deadline').innerText = langArr['lng-deadline'][lang];
	document.querySelector('.description').innerText = langArr['Description'][lang];
	document.querySelector('.essence').innerText = langArr['lng-details-task'][lang];
	document.querySelector('.btn-create-new-task').innerText = langArr['btn-create-new-task'][lang];


	window.addEventListener('DOMContentLoaded', () =>{
		document.querySelector('.lng-progress').innerText = langArr['progress'][lang];
	})
	

}