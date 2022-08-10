/*
Перевірка даних.

        1. Використовуючи JS, створіть 5 полів для води даних і залиште їх. 
        2. Поля:
        Ім'я (Укр. Літери), Номер телефону у форматі +38ХХХ-ХХХ-ХХ-ХХ, електронна пошта, пароль та підтвердження пароля (паролі повинні співпадати).
        
        3. Додайте стилі на помилку і стиль на правильне введення.
        4. Реалізуй перевірку даних.
        При введенні даних відразу перевіряти на правильність і виводити помилку, якщо така необхідна.
        додай кнопку реєстрація, при натисканні кнопки перевірити всі поля та вивести помилку якщо така буде.
        
        Збереження.
        5. Якщо користувач все записав правильно, то збережіть дані на клієнті із зазначенням дати та часу збереження.
        
        Для стилізації використовуй CSS класи. Для створення елементів використовуй JS.
*/
/*
function addEventListener (event, Listener) {
    event > Listener
}
*/

let flag = false, userInfo ={};

window.addEventListener("DOMContentLoaded", () => {
    document.body.prepend(inputs.name, inputs.phone, inputs.email, inputs.password, inputs.passwordRepeat); 

     document.querySelectorAll("input")
        .forEach((e) => {
            e.addEventListener("change", (e) => {
                console.log(validate(e.target.type, e.target.value));
                if( validate(e.target.type, e.target.value) ) {
                    if (flag) {
                        while ( document.querySelector('.spanError') ) {
                            document.querySelector('.spanError').remove();
                            flag = false;
                        }                        
                    }
                    e.target.classList.remove('error');
                    e.target.classList.add('valid');
                    save(e.target.type, e.target.value); //Збереження
                } else {
                    e.target.classList.remove('valid');
                    e.target.classList.add('error');
                    const spanError = document.createElement("span");
                    spanError.classList.add("spanError");
                    spanError.innerText = "ERROR";
                    e.target.after(spanError);
                    flag = true;
                }
            });
        })
})

// create html input
function cretaeInput(type = "number", className = "", placeholder = "") {
    const input = document.createElement("input"),
        div = document.createElement("div"),
        label = document.createElement("label"),
        p = document.createElement("p"),
        id = `input${Math.random() * 1000000}`;

    input.id = id;
    label.setAttribute("for", id)
    input.type = type;
    input.className = className;
    label.innerText = placeholder
    div.prepend(label)
    label.after(input)
    div.append(p)

    if (type === "button") {
        input.value = placeholder
    } else {
        input.placeholder = placeholder
    }
    return div
}

//перевірка даних

function validate(eType, eValue ) {
    switch (eType) {
        case "text": return /^[А-яіґєїІҐЄЇ']+$/.test(eValue);
        case "tel": return /^\+380\d{2}-\d{3}-\d{2}-\d{2}$/.test(eValue);
        case "email": return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(eValue)
        case "password": return validatePassword();       
    }
}

function validatePassword () {
    if (document.querySelectorAll(`input[type="password"]`)[0].value !== '' && document.querySelectorAll(`input[type="password"]`)[1].value === '') {
        console.log('pass1')
        return /^([A-z])\w+$/.test(document.querySelectorAll(`input[type="password"]`)[0].value);        
    } else if (document.querySelectorAll(`input[type="password"]`)[0].value !== '' && document.querySelectorAll(`input[type="password"]`)[1].value !== '') {
        return document.querySelectorAll(`input[type="password"]`)[0].value === document.querySelectorAll(`input[type="password"]`)[1].value;
    }    
}

// стврення інпутів. 
const inputs = {
    name: cretaeInput("text", "user-info", "input your name"),
    phone: cretaeInput("tel", "user-info", "input your phone"),
    email: cretaeInput("email", "user-info", "input your email"),
    password: cretaeInput("password", "user-info", "input your password"),
    passwordRepeat: cretaeInput("password", "user-info", "Repeat password")
}

// Кнопка реєстрація
const btn = document.createElement("button");
btn.innerText = "реєстрація";
document.body.append(btn);

const btnError = document.createElement("span");
      btnError.id = "btnError";
      btnError.innerText = "заповніть правильно всі поля";

let errors = [], flagErrors = false;

window.addEventListener("DOMContentLoaded", () => {
    const btnError = document.createElement("span");
      btnError.id = "btnError";
      btnError.innerText = "заповніть правильно всі поля";

    btn.addEventListener('click', () => {
        errors = [];
        document.querySelectorAll("input")
         .forEach( (e) => {
            console.log(`${e.type}: ` + validate( e.type, e.value));
            errors.push(validate( e.type, e.value));                                    
        })

       if ( errors.some(el => el === false ) ) {
            flagErrors = true;
            if (flagErrors) document.body.append(btnError)
       } else {
            if ( document.getElementById("btnError") ) {
                document.getElementById("btnError").remove();                
            }
            flagErrors = false;
            localStorage.setItem('userInfo', JSON.stringify(userInfo) );
            console.log("storage: " +  localStorage.userInfo );
       }    
    })

}) 

//Збереження

function save (type, value) {
    if (type === "text") userInfo.name = value;
    else userInfo[type] = value;
}