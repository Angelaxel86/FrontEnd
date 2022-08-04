let imgSrc, idSauce = '', idToppings = '', isDrawing = false, sauce = [], topping = [],
allPrice, userName, userPhone, userEmail, order;

let price = {
	small: '100',
	mid: '150',
	big: '200'
}

let sauces = {
	sauceClassic: {
		name: 'Кетчуп',
		price: '20'
	},
	sauceBBQ: {
		name: 'BBQ',
		price: '25'
	},
	sauceRikotta: {
		name: 'Рiкотта',
		price: '30' 
	}
}

let toppings = {
	moc1: {
		name: 'Сир звичайний',
		price: '40'
	},
	moc2: {
		name: 'Сир фета',
		price: '45'
	},
	moc3: {
		name: 'Моцарелла',
		price: '50'
	},
	telya: {
		name: 'Телятина',
		price: '60'
	},
	vetch1: {
		name: 'Помiдори',
		price: '20'
	},
	vetch2: {
		name: 'Гриби',
		price: '30'
	}
}

class newPizza {
	constructor (userName, userPhone, userEmail, price, sauces, toppings) {
		this.userName = userName;
		this.userPhone = userPhone;
		this.userEmail = userEmail;
		this.price = price;
		this.sauces = sauces;
		this.toppings = toppings;
		this.date = new Date();
	}
}

function createNewPizza (userName, userPhone, userEmail, price, sauces, toppings) {
	return new newPizza(userName, userPhone, userEmail, price, sauces, toppings);
}

//Функция для банера
const random = (min, max) => {
	return Math.floor( min + Math.random() * (max - min + 1) );
}

window.addEventListener('DOMContentLoaded', () => {
	const size = document.getElementById('pizza'),
		  priceOut = document.querySelector('.price > p'),
		  banner = document.getElementById('banner'),
		  ingridients = document.querySelector('.ingridients'),
		  table = document.querySelector('.table'),
		  saucesOut = document.querySelector('.sauces > p'),
		  toppingsOut = document.querySelector('.toppings > p');

	allPrice = (+`${price.big}`);
	priceOut.innerText = `ЦIНА:\r\n ${allPrice}грн`;	

	//Выбираем размер пиццы
	size.addEventListener('click', (e) => {
		if ( e.target.classList.contains('radioIn') ) {
			console.log('size:' + e.target.value);
			allPrice = (+`${price[e.target.value]}`);
			priceOut.innerText = `ЦIНА:\r\n ${allPrice}грн`;
		}
	})

	//Убегающий банер
	banner.addEventListener('mouseover', () => {	
		banner.style.bottom = `${random(0, 90)}%`;
		banner.style.right = `${random(0, 90)}%`;
	})

	//Выбираем ингредиенты
	ingridients.addEventListener('mousedown', (e) => {
		if( e.target.classList.contains('draggable') ) {			
			imgSrc = e.target.src;
			console.log('img.src: ' + imgSrc);			
			if( e.target.id.includes('sauce') )	{				
				idSauce = e.target.id;
				console.log('sauce:' + idSauce);
			} else {
				idToppings = e.target.id;
				console.log('toppings:' + idToppings);
			}
		}
		isDrawing = true;
	})
	//Вставляем ингредиенты
	table.addEventListener('mouseup', () => {
		console.log('mouaseup');
		if(isDrawing) {
		const img = document.createElement('img');
		img.classList.add('img-pizza');
		img.src = `${imgSrc}`;
		table.append(img);
		if(idSauce in sauces){
			sauce.push(`${sauces[idSauce].name}`);
			saucesOut.innerText = `Соуси:\r\n ${ sauce.join('\r\n') }`;
			allPrice += (+`${sauces[idSauce].price}`);
			priceOut.innerText = `ЦIНА:\r\n ${allPrice}грн`;
			idSauce = '';			
		} else {
			topping.push(`${toppings[idToppings].name}`);
			toppingsOut.innerText = `Топiнги:\r\n ${topping.join('\r\n')}`;
			allPrice += (+`${toppings[idToppings].price}`);
			priceOut.innerText = `ЦIНА:\r\n ${allPrice}грн`;
			idToppings = '';			
		}
		isDrawing = false;
		}
	})

	//Валидация
	const inputName = document.getElementById('userName'),
		  inputPhone = document.getElementById('userPhone'),
		  inputEmail = document.getElementById('userEmail');

		
	const pattern1 = /^[А-яіґєїІҐЄЇ' ]+$/;
	inputName.addEventListener('keyup', () => {
		if( pattern1.test(inputName.value) ) {
			inputName.classList.remove('error');
			inputName.classList.add('success');
			userName = inputName.value;
		} else {
			inputName.classList.add('error');
		}
		
	})
	
	const pattern2 = /\+380\d{9}/;
	inputPhone.addEventListener('keyup', () => {		
		if( pattern2.test(inputPhone.value) ) {			
			inputPhone.classList.remove('error');
			inputPhone.classList.add('success');
			userPhone = inputPhone.value;
		} else {
			inputPhone.classList.add('error');
		}
	})

	const pattern3 = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
	inputEmail.addEventListener('keyup', () => {
		if( pattern3.test(inputEmail.value) ) {
			inputEmail.classList.remove('error');
			inputEmail.classList.add('success');
			userEmail = inputEmail.value;
		} else {
			inputEmail.classList.add('error');
		}
	})

	//Кнопка Зкинути
	const btnCancel = document.getElementById('btnCancel');
	btnCancel.addEventListener('click', () => {		
		while (document.querySelector('.img-pizza') ) {
			document.querySelector('.img-pizza').remove();
		}
		allPrice = `${price.big}`;
		priceOut.innerText = `ЦIНА:\r\n ${allPrice}грн`;
		sauce = [];
		saucesOut.innerText = `Соуси: ${sauce}`;
		topping = [];
		toppingsOut.innerText = `Топiнги: ${topping}`;		
	})

	//Кнопка Підтвердити замовлення 
	const btnSubmit = document.getElementById('submit');
	btnSubmit.addEventListener('click', () => {		
		if (userName && userPhone && userEmail) {			
			console.log('userName' + userName,'userPhone' + userPhone,'userEmail' + userEmail,'allPrice' + allPrice,'sauce' + sauce,'topping' + topping);
			order = createNewPizza(userName, userPhone, userEmail, allPrice, sauce, topping);
			//window.location.href = './thank-you.html';
		}
	})

})