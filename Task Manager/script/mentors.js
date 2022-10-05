//Mentors

const recentMentorsCards = document.querySelector('.recent-mentors-cards'),
      mentorCardsGrid = document.querySelector('.mentor-cards-grid')

//Recent Mentors per week

function listRecentMentors(){
  let nowDay = Date.now()
  let recentMentors = [];
  mentors.forEach( (el) => {
    if(el.date > nowDay - 604800000){
      recentMentors.push(el)
    }
  })
  return recentMentors;
}  
//console.dir(recentMentors)

mentorsWrite(listRecentMentors(), recentMentorsCards, style = 'recent-mentors');

//Горизонтальный скрол



const recentMentorsArrowLeft = document.querySelector('.recent-mentors-arrow-left');
const recentMentorsArrowRight = document.querySelector('.recent-mentors-arrow-right');
let idR = 1
let flagRecentMentors = false;

recentMentorsArrowRight.addEventListener('click', (e) => {
  if(window.matchMedia("(max-width: 375px)").matches){
    if(flagRecentMentors === false) idR = idR
  } else{
    if(flagRecentMentors === false) idR = idR +2
  }
  
  if(listRecentMentors().length>idR) {
    flagRecentMentors = true;
   if(document.getElementById(`recent-mentors${idR=idR+1}`)) {
      document.getElementById(`recent-mentors${idR}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  } 
})

recentMentorsArrowLeft.addEventListener('click', (e) => {
  if(window.matchMedia("(max-width: 375px)").matches){
    if(flagRecentMentors === true) idR = idR
  } else{
    if(flagRecentMentors === true) idR = idR -2
  }
  
  if(idR>1){
    flagRecentMentors = false;
    if(document.getElementById(`recent-mentors${idR=idR-1}`)) {
      document.getElementById(`recent-mentors${idR}`).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }  
})

// Mentors search

inputSearch.addEventListener('keyup', () => {
  let searcMentor = [];
  for(let i=0; i<mentors.length; i++){
    if(mentors[i].name.includes(inputSearch.value)) {
      searcMentor.push(mentors[i]);
    }
  }
  mentorCardsGrid.innerHTML = '';
  mentorsWrite(searcMentor, mentorCardsGrid, style = 'mentor-cards-grid');
  allSpeciality.checked = "true";
})

//Category

inputDesign.addEventListener('change', () => {
  if(inputDesign.checked === true){  
    let listDesign = [];
    for(let i=0; i<mentors.length; i++){
      if(mentors[i].speciality === 'UI UX Design') {
        listDesign.push(mentors[i]);
      }
    }
    mentorCardsGrid.innerHTML = '';
    mentorsWrite(listDesign, mentorCardsGrid, style = 'mentor-cards-grid');
  }
})

allSpeciality.checked = 'true';
allSpeciality.addEventListener('change', () => {
  if(allSpeciality.checked === true){
    mentorCardsGrid.innerHTML = '';
    mentorsWrite(mentors, mentorCardsGrid, style = 'mentor-cards-grid');
  }
})

webDeveloper.addEventListener('change', () => {
  if(webDeveloper.checked === true){  
    let listWebDeveloper = [];
    for(let i=0; i<mentors.length; i++){
      if(mentors[i].speciality === 'Web Developer') {
        listWebDeveloper.push(mentors[i]);
      }
    }
    mentorCardsGrid.innerHTML = '';
    mentorsWrite(listWebDeveloper, mentorCardsGrid, style = 'mentor-cards-grid');
  }
})

appsDesign.addEventListener('change', () => {
  if(appsDesign.checked === true){  
    let listAppsDesign = [];
    for(let i=0; i<mentors.length; i++){
      if(mentors[i].speciality === 'Apps Design') {
        listAppsDesign.push(mentors[i]);
      }
    }
    mentorCardsGrid.innerHTML = '';
    mentorsWrite(listAppsDesign, mentorCardsGrid, style = 'mentor-cards-grid');
  }
})

//Sort Date

btnSortBy.addEventListener('click', () => {
  let sortDate = JSON.parse(localStorage.mentors);
  sortDate.sort( (a, b) => (a.date > b.date) ? 1 : -1);
  mentorCardsGrid.innerHTML = '';
  mentorsWrite(sortDate, mentorCardsGrid, style = 'mentor-cards-grid');  
})

mentorsWrite(mentors, mentorCardsGrid, style = 'mentor-cards-grid');

