// Sign Up

let mentors = JSON.parse(localStorage.mentors)

const btnSignUp = document.querySelector('.btn-sign-up'),
	  inputLoginName = document.getElementById('login-name'),
	  inputLoginPassword = document.getElementById('login-password'),
	  errorText = document.querySelector('.error-text')

btnSignUp.addEventListener('click', () => {
	if(mentors.find(x => x.name === inputLoginName.value && x.password === inputLoginPassword.value)){		
		let mentorAuthorized = mentors.find(x => x.name === inputLoginName.value && x.password === inputLoginPassword.value);
			console.dir(mentorAuthorized);
			localStorage.mentorActivId = mentorAuthorized.id;
			window.location.href = './index.html';		
	} else {
		errorText.style.display = 'block';
	}	
})

//Create New User
let newMentor = {};

const loginNewUser = document.querySelector('.login-new-user'),
	  newUser = document.querySelector('.new-user'),
	  login = document.querySelector('.login'),
	  addImage = document.getElementById('addImage'),	
	  uploadAvatar = document.querySelector('.upload-avatar'),
	  btnBack = document.querySelector('.btn-back'),
	  createNewUser = document.querySelector('.create-new-user'),
	  aboutUourself = document.querySelector('.about-yourself')

btnBack.addEventListener('click', () => {
	login.style.display = 'block';
	newUser.style.display = 'none';
})

loginNewUser.addEventListener('click', () => {
	login.style.display = 'none';
	newUser.style.display = 'block';
})
//avatar
addImage.addEventListener('change', (e) => {
	let file = e.target.files[0];
	let fileReader = new FileReader();

	fileReader.addEventListener('load', (el) => {		
		uploadAvatar.style.backgroundImage = 'url('+`${el.target.result}`+')';		
		newMentor.avatar = el.target.result;
	})
	fileReader.readAsDataURL(file);	
	
})

//email
let validationEmail = false;
const inputEmail = document.getElementById('email'),
	  patternEmail = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;

inputEmail.addEventListener('keyup', () => {
	if( patternEmail.test(inputEmail.value) ) {
		inputEmail.classList.remove('error');
		inputEmail.classList.add('success');
		newMentor.email = inputEmail.value;
		validationEmail = true;
	} else {
		inputEmail.classList.add('error');
		inputEmail.classList.remove('success');
		validationEmail = false;
	}
})

//name
let validationName = false;
const inputName = document.getElementById('name'),
      patternName = /^[A-яіґєїІҐЄЇ0-9' ]+$/;

let users = JSON.parse(localStorage.mentors);

inputName.addEventListener('keyup', () => {
	//console.dir(users.findIndex(x => x.name === inputName.value))
	if( patternName.test(inputName.value) && users.findIndex(x => x.name === inputName.value) === -1) {
		inputName.classList.remove('error');
		inputName.classList.add('success');
		newMentor.name = inputName.value;
		validationName = true;
	} else {
		inputName.classList.add('error');
		inputName.classList.remove('success');
		validationName = false;
	}		
})

//password
let validationPassword = false;
const inputPassword = document.getElementById('password'),
	  inputRepeatPassword = document.getElementById('repeat-password'),
	  patternPassword = /^([A-z0-9])\w+$/;

inputPassword.addEventListener('keyup', () => {
	if( patternPassword.test(inputPassword.value) ) {
		inputPassword.classList.remove('error');
		inputPassword.classList.add('success');	
	} else {
		inputPassword.classList.add('error');
		inputPassword.classList.remove('success');		
	}		
})

inputRepeatPassword.addEventListener('keyup', () => {
	if(inputRepeatPassword.value === inputPassword.value) {
		inputRepeatPassword.classList.remove('error');
		inputRepeatPassword.classList.add('success');
		newMentor.password = inputRepeatPassword.value;
		validationPassword = true;
	} else {
		inputRepeatPassword.classList.remove('success');
		inputRepeatPassword.classList.add('error');
		validationPassword = false;
	}
})

//speciality
const btnSpec = document.querySelectorAll('.btn-spec'),
	  specialityPText = document.querySelector('.speciality-p-text')

let validationSpeciality = false;
btnSpec.forEach( (item) => {
	item.addEventListener('click', (e) => {		
		specialityPText.innerText = e.target.textContent;
		newMentor.speciality = e.target.textContent;
		validationSpeciality = true;		
	})
})

//btn Create new user
let idGenerat;
  
createNewUser.addEventListener('click', () => {
	//генератор id	
	function generatorIdMentor(){
		idGenerat = Math.floor(Math.random()*1000);
		console.log('id: '  + idGenerat)
		mentors.forEach( (item) => {
			if(item.id === `${idGenerat}`){				
				generatorIdMentor()
			} else  if(item.id !== `${idGenerat}`){				
				newMentor.id = `${idGenerat}`;
			}
		})
	}
	generatorIdMentor();
	
	newMentor.mentorReviews = (Math.random() *5).toFixed(1);
	newMentor.settings = {};
	newMentor.date = new Date().getTime();
	newMentor.aboutYourself = aboutUourself.value;
	newMentor.followed = {mentorId:[], tasksId:[]};

	if(validationEmail === true && validationName === true && validationPassword === true && validationSpeciality === true){
		mentors.push(newMentor);
		localStorage.mentors = JSON.stringify(mentors);
		localStorage.mentorActivId = newMentor.id;		
		validationEmail = false;
		validationName = false;
		validationPassword = false;
		validationSpeciality = false;
		newMentor = {};
		window.location.href = './index.html';		
	}
	console.dir(newMentor);
	console.dir(mentors)
})

if(window.matchMedia("(max-width: 375px)").matches){
	aboutUourself.setAttribute('cols', '37');
	aboutUourself.setAttribute('rows', '13');	
}