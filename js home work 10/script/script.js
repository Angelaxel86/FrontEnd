let a='', b='', sign='', m = 0, count = 0, res, and = false;

//Создаём span для буквы 'm' на дисплее
const memory = document.createElement('span');
memory.setAttribute('id', 'memory');
document.querySelector('.display').append(memory);

window.addEventListener("DOMContentLoaded",()=>{
    const btn = document.querySelector(".keys"),
    display = document.querySelector(".display > input"),
    result = document.getElementById('result');

    function division(a=0, b=0) {
		if (a==0 || b==0) {			
			result.setAttribute('disabled', '');
			return 'error';
		} else {
			return a / b;
		}
	}

	function add(a=0, b=0) {
			return (+a) + (+b);
	}

	function multiple(a=0, b=0) {
		return a * b;
	}

	function subtra(a=0, b=0) {
		return a - b;
	}

    function calculate(a, b , operation) {
		res = operation(a,b);	
		display.value = res;
	}

	function operationCalculate () {
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
					if (res === 'error') {
						a = '';
						b = '';
						sign = '';
						and = false;
						break;
					} else {
						a = res;
						break;
					} 	
			}
			and = true;
			console.log("a: " + a, "b: " + b,"sign " + sign);
	}

    btn.addEventListener("click", function (e) {
    	//Кнопка сброс
    	document.querySelector('.c').onclick = () => {
    		a = '';
			b = '';
			sign = '';
			display.value = 0;
			and = false;
			result.setAttribute('disabled', '');
    	}

    	//Вводим число
    	if ( e.target.classList.contains('black') ) {
    		let key = e.target.value;
    		if(b ==='' && sign ===''){		
				a += key;			
				display.value = a;
			} else if(a!=='' && b!=='' && and){
				b = key;
				and = false;
				display.value = b;
			} else {
				b +=key;
				display.value = b;
			}
			if (b !== "") {
				result.removeAttribute('disabled');
			}
			console.log("a: " + a, "b: " + b,"sign " + sign);
        }

        //Вводим знак
		if(e.target.classList.contains('pink')) {
			let key = e.target.value;
			sign = key;			
			console.log("a: " + a, "b: " + b,"sign " + sign);
			display.value = sign;
		}

		//Кнопки памяти
		if ( e.target.classList.contains('gray') ) {
			if (e.target.value === "m+") {
				memory.innerText = "m";
				if (b === '') m =  +a;					
				else {
					operationCalculate();
					m = m + res;
				}
				a = '';
				b = '';
				sign = '';
				and = false;
				result.setAttribute('disabled', '');
				console.log('m: ' + m);
			}

			if (e.target.value === "m-") {
				memory.innerText = "m";
				if (b === '') m =  -a;
				else {
					operationCalculate();
					m = m - res;
				}
				a = '';
				b = '';
				sign = '';
				and = false;
				result.setAttribute('disabled', '');
				console.log('m: ' + m);
			}

			if (e.target.value === "mrc") {
				display.value = m;				
				count++; 
				if (count === 2) {
					m = 0;
					display.value = 0;
					memory.innerText = "";
					count = 0;
					and = false;
				}							
			}
		}

		//Кнопка равно
		if(e.target.classList.contains('orange')) {
			operationCalculate();
		}		
    })
})