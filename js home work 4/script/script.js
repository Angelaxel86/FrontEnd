var a='', b='', sign='', res, and = false;

//const out = document.querySelector('.display p');

function add(a=0, b=0) {
			return (+a) + (+b);
}
function multiple(a=0, b=0) {
	return a * b;
}
function subtra(a=0, b=0) {
	return a - b;
}
function division(a=0, b=0) {
	if (a==0 || b==0) {
		return alert("error")
	} else {
		return a / b;
	}
}
function calculate(a, b , operation) {
	res = operation(a,b);	
	document.querySelector('.display p').textContent = res;
}
function clearAll() {
	a = '';
	b = '';
	sign = '';
	document.querySelector('.display p').textContent = 0;
}
window.addEventListener("load", () => {
	document.querySelector('.ac').onclick = clearAll;
})
window.addEventListener("load", () => {
	document.querySelector('.button').onclick = (eve) => {
		//Вводим число
		if(eve.target.classList.contains('namber')) {
			let key = eve.target.value;	
			if(b ==='' && sign ===''){		
			a += key;			
			document.querySelector('.display p').textContent = a;
			} else if(a!=='' && b!=='' && and){
				b = key;
				and = false;
				document.querySelector('.display p').textContent = b;
			} else {
				b +=key;
				document.querySelector('.display p').textContent = b;
			}
			console.log(a, b, sign);
		}
		//Сброс
		if(eve.target.classList.contains('ac')) return;
		//Вводим знак
		if(eve.target.classList.contains('action')) {
			let key = eve.target.value;
			sign = key;			
			console.log(a, b, sign);
			document.querySelector('.display p').textContent = sign;
		}
		//Кнопка равно
		if(eve.target.classList.contains('result')) {
			if(b==='') b = a;
			switch(sign){
				case '+':
					calculate(a, b, add);
					a = res;
					break; 
				case '*':
					calculate(a, b, multiple);
					a = res;
					break; 	
				case '-':
					calculate(a, b, subtra);
					a = res;
					break; 
				case '/':
					calculate(a, b, division);
					a = res;
					break; 	
			}
			and = true;
			console.log(a, b, sign);
		}		
	}	
})
