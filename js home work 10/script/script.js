

let a='', b='', sign='', res, and = false;

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
		return alert("error") // отладить ошибку
	} else {
		return a / b;
	}
}

window.addEventListener("DOMContentLoaded",()=>{
    const btn = document.querySelector(".keys"),
    display = document.querySelector(".display > input")

    function calculate(a, b , operation) {
		res = operation(a,b);	
		display.value = res;
	}

    btn.addEventListener("click", function (e) {
    	//Сброс
    	document.querySelector('.c').onclick = () => {
    		a = '';
			b = '';
			sign = '';
			display.value = 0;
			document.getElementById('result').setAttribute('disabled', '');
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
				document.getElementById('result').removeAttribute('disabled');
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
				display.value = "m";
				display.value.selectionStart;
			}
		}

		if(e.target.classList.contains('orange')) {
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
			console.log("a: " + a, "b: " + b,"sign " + sign);
		}		
		
    })
})