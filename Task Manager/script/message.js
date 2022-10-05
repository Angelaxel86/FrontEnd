//Message

let chat = JSON.parse(localStorage.chat);
let objMessages = {};
let chatIndex
let idMessage;

//Mentor list and search
	const mentorList = document.querySelector('.mentor-list'),
		  chatHeaderAvatar = document.querySelector('.chat-header-img img'),
		  chatHeaderName = document.querySelector('.chat-header-name'),
		  inputSearchName = document.querySelector('.input-search-name'),
		  chatBox = document.querySelector('.chat'),
		  chatBack = document.querySelector('.chat-back'),
		  head = document.querySelector('.head'),
		  messageSearchName = document.querySelector('.message-search-name')

function listChat(){		
		let list = [];		
		mentors[indexMentor].followed.mentorId.forEach( (el) => {
			let mentor = mentors.find(x => x.id === el);
			list.push(mentor);
		})
		//console.dir(list);		
		mentorListWrite(list);
}
listChat();	

inputSearchName.addEventListener('keyup', () => {
	let searcMentor = [];
	let list = [];		
	mentors[indexMentor].followed.mentorId.forEach( (el) => {
		let mentor = mentors.find(x => x.id === el);
		list.push(mentor);
	})
	for(let i=0; i<list.length; i++){
		if(list[i].name.includes(inputSearchName.value)) {
			searcMentor.push(list[i]);
		}
	}
	chatHeaderName.innerText = '';
	document.querySelector('.chat-message').innerHTML = '';	
	mentorListWrite(searcMentor)
	console.dir(searcMentor);
})

function mentorListWrite(data) {	
	
	mentorList.innerHTML = '';
	
	data.forEach( (el) => {

		const listCard = document.createElement('div'),
			  listSpanId = document.createElement('span'),	
			  listCardAvatar = document.createElement('div'),
			  cardAvatarImg = document.createElement('img'),
			  listCardBox = document.createElement('div'),
			  listCardName = document.createElement('p'),
			  cardLastMessage = document.createElement('p')

		//Last message
		for (let i=0; i<chat.length; i++){
			if( chat[i].hasOwnProperty(el.id) ){
				if( chat[i].hasOwnProperty(mentorActivId) ){
					var temporaryIndex = i;
					var lastIndex = i;						
				}
			}
		}
				
		//console.dir(messagesLast[messagesLast.length -1])

		listCard.classList.add('list-card');
		listCardAvatar.classList.add('list-card-avatar');
		listSpanId.style.display = 'none';
		listCardBox.classList.add('list-card-box');
		listCardName.classList.add('list-card-name');
		cardLastMessage.classList.add('card-last-message');

		if(el.avatar === undefined){
			cardAvatarImg.src = './img/avatar.png';
		} else {
			cardAvatarImg.src = `${el.avatar}`;
		}
		listSpanId.innerText = `${el.id}`;
		listCardName.innerText = `${el.name}`;

		
		if(chat[lastIndex]){
			let messagesLast = chat[lastIndex][el.id].concat(chat[lastIndex][mentorActivId]);
			messagesLast.sort( (a, b) => (a.date > b.date) ? 1 : -1 );
			if(messagesLast[messagesLast.length -1] === undefined){
				cardLastMessage.innerText = 'No messages';				 
			} else {
				cardLastMessage.innerText = `${messagesLast[messagesLast.length -1].messages}`;
			}
		}	

		
		chatHeaderAvatar.src = './img/avatar.png';	

		mentorList.append(listCard);
		listCard.append(listSpanId);
		listCard.append(listCardAvatar);
		listCardAvatar.append(cardAvatarImg);
		listCard.append(listCardBox);
		listCardBox.append(listCardName);
		listCardBox.append(cardLastMessage);

		

		listCard.addEventListener('click', (e) => {

			if(window.matchMedia("(max-width: 375px)").matches){
				chatBox.style.display = 'block';
				chatBack.style.display = 'block';
				head.style.display = 'none';
				headText.style.display = 'none';
				messageSearchName.style.display = 'none';

			}

			chatBack.addEventListener('click', () => {
				chatBox.style.display = 'none';
				head.style.display = 'block';
				headText.style.display = 'block';
				messageSearchName.style.display = 'block';
			})

			chatIndex = undefined;
			idMessage = 0;
			if(e.target.classList !==document.querySelector('.list-card-activ')) {
				if(document.querySelector('.list-card-activ')){
					document.querySelector('.list-card-activ').classList.remove('list-card-activ');
				}

				e.target.classList.add('list-card-activ');
				
				let mentorListId = mentors.find(x => x.id === e.target.children[0].textContent);
				
				if(mentorListId.avatar === undefined){
					chatHeaderAvatar.src = './img/avatar.png';
				} else {
					chatHeaderAvatar.src = `${mentorListId.avatar}`;
				}
				chatHeaderName.innerText = `${mentorListId.name}`;	

				objMessages = {
					[`${mentorActivId}`]: [],
					[`${e.target.children[0].textContent}`]: []
				}

				for (let i=0; i<chat.length; i++){
					if( chat[i].hasOwnProperty(e.target.children[0].textContent) ){						
						if( chat[i].hasOwnProperty(mentorActivId) ){							
							temporaryIndex = i;
							chatIndex = i;	
											
						}
					}
				}			
				
				if(temporaryIndex === undefined){
					chat.push(objMessages);					
					localStorage.chat = JSON.stringify(chat);
				} else {
					temporaryIndex = undefined;
				}						
							
				if(chatIndex === undefined){
					chatIndex = chat.length-1;
				}

				//Chat send			

				const inputSend = document.querySelector('.input-send'),
					  btnSend = document.querySelector('.btn-send'),
					  chatMessage = document.querySelector('.chat-message')
				
				btnSend.addEventListener('click', () => {						
				
					if(inputSend.value !== ''){
						let message = inputSend.value;
						inputSend.value = '';

						let messageObj = {
							date: new Date().getTime(),
							messages: message
						}
									
						chat[chatIndex][mentorActivId].push(messageObj);						
						//console.dir(chat[chatIndex][mentorActivId])	
						//console.dir(chat)					

						let hours = new Date(chat[chatIndex][mentorActivId][idMessage]['date']).getHours();
						if(hours < 10){
							hours = '0' +(hours);
						}
						let minutes = new Date(chat[chatIndex][mentorActivId][idMessage]['date']).getMinutes();
						if(minutes < 10){
							minutes = '0' +(minutes);
						}
						let day = new Date(chat[chatIndex][mentorActivId][idMessage]['date']).getDate();
						if(day < 10){
							day = '0' +(day)
						}
						let month =  new Date(chat[chatIndex][mentorActivId][idMessage]['date']).getMonth()+1;
						if(month < 10){
							month = '0' +(month)
						}	

						const messageContainer = document.createElement('div'),
						      messageText = document.createElement('div'),
						      messageDate = document.createElement('div')

						messageContainer.classList.add('message-container2');      
						messageText.classList.add('message-text2');
						messageDate.classList.add('message-date');

						//cardLastMessage.innerText = `${messageObj['messages']}`;
						messageText.innerText = `${messageObj['messages']}`;
						messageDate.innerText = ''+(day)+'.'+(month)+' - '+(hours)+':'+(minutes)+'';

						chatMessage.append(messageContainer);
						messageContainer.append(messageText);
						messageContainer.append(messageDate);
						
						idMessage++;

						//console.dir(messageObj)						
						//console.dir(chat[chatIndex][mentorActivId])
						//console.dir(chat[chatIndex][e.target.children[0].textContent])
						//console.dir(chat)

						localStorage.chat = JSON.stringify(chat);
						chatMessage.scrollTop = chatMessage.scrollHeight;
						
					}
				})	

				//Chat show
			
				chatShow( chat[chatIndex][e.target.children[0].textContent], chat[chatIndex][mentorActivId] );

				chatMessage.scrollTop = chatMessage.scrollHeight;

				function chatShow(messages1, messages2){

					chatMessage.innerHTML = '';

					let allMessages = messages1.concat(messages2);
					allMessages.sort( (a, b) => (a.date > b.date) ? 1 : -1 );					
					 
					let dayNow = new Date().getDay();
					for (let i=0; i < allMessages.length; i++){						
						
						let index2 = messages2.findIndex(x => x.date === allMessages[i].date);
						if(index2 !== -1){
							const messageContainer = document.createElement('div'),
								  messageText = document.createElement('div'),
							 	  messageDate = document.createElement('div')
						
						let hours = new Date(messages2[index2].date).getHours();
						if(hours < 10){
							hours = '0' +(hours);
						}
						let minutes = new Date(messages2[index2].date).getMinutes();
						if(minutes < 10){
							minutes = '0' +(minutes);
						}
						let day = new Date(messages2[index2].date).getDate();
						if(day < 10){
							day = '0' +(day)
						}
						let month =  new Date(messages2[index2].date).getMonth()+1;
						if(month < 10){
							month = '0' +(month)
						}

							messageContainer.classList.add('message-container2');      
							messageText.classList.add('message-text2');
							messageDate.classList.add('message-date');
							messageText.innerText = `${messages2[index2].messages}`;
							messageDate.innerText = ''+(day)+'.'+(month)+' - '+(hours)+':'+(minutes)+'';

							chatMessage.append(messageContainer);
							messageContainer.append(messageText);
							messageContainer.append(messageDate);
				    	}						

						let index1 = messages1.findIndex(x => x.date === allMessages[i].date);					
						if(index1 !== -1){
							const messageContainer = document.createElement('div'),
								  messageText = document.createElement('div'),
							 	  messageDate = document.createElement('div')

							let hours = new Date(messages1[index1].date).getHours();
							if(hours < 10){
								hours = '0' +(hours);
							}
							let minutes = new Date(messages1[index1].date).getMinutes();
							if(minutes < 10){
								minutes = '0' +(minutes);
							}
							let day = new Date(messages1[index1].date).getDate();
							if(day < 10){
								day = '0' +(day)
							}
							let month =  new Date(messages1[index1].date).getMonth()+1;
							if(month < 10){
								month = '0' +(month)
							}

							messageContainer.classList.add('message-container1');      
							messageText.classList.add('message-text1');
							messageDate.classList.add('message-date');

							messageText.innerText = `${messages1[index1].messages}`;
							messageDate.innerText = ''+(day)+'.'+(month)+' - '+(hours)+':'+(minutes)+'';

							chatMessage.append(messageContainer);
							messageContainer.append(messageText);
							messageContainer.append(messageDate);
						}						
					}

				}
			}	
		})
	

	})
}

