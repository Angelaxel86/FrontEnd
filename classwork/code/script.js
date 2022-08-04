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

window.addEventListener("DOMContentLoaded", () => {
    document.body.prepend(inputs.name, inputs.phone, inputs.email, inputs.password, inputs.passwordRepeat);

    const spanError = document.createElement("span");
    spanError.id = "spanError";
    spanError.innerText = "ERROR";

     document.querySelectorAll("input")
        .forEach((e) => {
            e.addEventListener("change", (e) => {
                console.log(validate(e));
                if( validate(e) ) {
                    spanError.remove();
                    e.target.classList.remove('error');
                    e.target.classList.add('valid');
                } else {
                    e.target.classList.add('error');
                    e.target.after(spanError);
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

function validate(event) {
    switch (event.target.type) {
        case "text": return /^[А-яіґєїІҐЄЇ']+$/.test(event.target.value);
        case "tel": return /^\+380\d{2}-\d{3}-\d{2}-\d{2}$/.test(event.target.value);
        case "email": return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(event.target.value)
        case "password": return document.querySelectorAll(`input[type="password"]`)[0].value === document.querySelectorAll(`input[type="password"]`)[1].value
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

    const btn = document.createElement("button");
    btn.innerText = "реєстрація";
    document.body.append(btn)