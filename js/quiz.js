const slides = document.querySelectorAll(".quiz-wrapper > div.quiz-body"),
    loader = document.querySelectorAll(".quiz-button-list > div"),
    prev = document.querySelector(".quiz-button-back"),
    next = document.querySelector(".quiz-button-forward"),
    quizWrapper = document.querySelectorAll(".quiz-body-item")

// TODO Временный массив для сбора информации с формы

const formTemporaryList = { 
    0: { question: 'Куда вам нужно установить окна?', answer: null }, 
    1: { question: 'Сколько створок вам нужно?', answer: null },
    2: { question: 'Выберете цвет ламинации профиля', answer: null },
    3: { question: 'Выберите цвет ручек', answer: null },
    4: { question: 'Укажите размеры окна и выберете аксессуары, которые вам нужны', answer: {height: null, width: null, select: []} }  
};


let slideIndex = 0;
let lastID = null

next.addEventListener("click", function () {
    if (formTemporaryList[slideIndex].answer) {
        console.log('formTemporaryList', formTemporaryList)
        slideIndex >= 0 ? (prev.style.display = "block") : console.log("");
        slideIndex = (slideIndex + 1) % slides.length;
        loader[slideIndex - 1].classList.remove("quiz-button-list-item-active");
        loader[slideIndex - 1].classList.add(
            "quiz-button-list-item-last-active"
        );
        loader[slideIndex].classList.add("quiz-button-list-item-active");
        updateSelection();
        getLocal()
    } else  {
        // Если не заполненные поля, то мы оттображаем ошибку
        emptyInputError()
    }
});

prev.addEventListener("click", function () {
    console.log('formTemporaryList', formTemporaryList)
    slideIndex <= 1 ? (prev.style.display = "none") : console.log("");
    slideIndex = (slideIndex + slides.length - 1) % slides.length;
    loader[slideIndex + 1].classList.remove("quiz-button-list-item-active");
    loader[slideIndex].classList.add("quiz-button-list-item-active");
    loader[slideIndex].classList.remove("quiz-button-list-item-last-active");
    updateSelection();
    getLocal()
});



function updateSelection() {
    let showing = document.querySelector(".active");
    if (showing) showing.classList.remove("active");
    slides[slideIndex].classList.add("active");
}

const emptyInputError = () => {
    const inputQuizCard = document.querySelectorAll(`.input-quiz-${slideIndex}`)
    inputQuizCard.forEach((item) => {
        item.classList.add('error-input')
        setTimeout(() => {
            item.classList.remove('error-input')
        }, 1000)
    })
}

//  Слушаем события при клике на карточку

const listenerQuizWrapper = (e) => {
    const id = e.currentTarget.getAttribute("lat")
    const answer = e.currentTarget.getAttribute("name")
    if (slideIndex > 3) {
        const check = checkedAnswer(id)
        if (check) {
            return console.log('Не надо')
        } else {
            formTemporaryList[slideIndex].answer.select.push({id: id, answer: answer})
        }
    } else {
        deleteItemActiveClass()
        addItemActiveClass({target: e.currentTarget, name: answer, id: id})
        if (answer === null) {
            return console.log("нет");
        } else {
            formTemporaryList[slideIndex].answer = answer
            console.log('Находитесь в разделе размеры окна')
            }
        } 
}

//  Проверяем массив и сравниваниваем с id входящим
const checkedAnswer = (id) => {
    //  Если в массиве уже есть элемент то мы его удаляем
    const index = formTemporaryList[slideIndex].answer.select.findIndex(n => n.id === id);
    if (index !== -1) {
        formTemporaryList[slideIndex].answer.select.splice(index, 1);
        return true
    } else {
        // Если нет, то мы возвращаем false и записываем его в массив
        return false
    }
}

// Находим и удаляем класс

const deleteItemActiveClass = () => {
    const quizBody = document.querySelectorAll('.quiz-body')
    const quizWrapper = quizBody[slideIndex].querySelector('.quiz-body-wrapper')
    const getActiveClass = quizWrapper.querySelector('.quiz-body-item-active')
    if (getActiveClass) {
        getActiveClass.classList.remove('quiz-body-item-active')
        const getInput = getActiveClass.querySelector('.quiz-body-item-chose > input')
        getInput.removeAttribute('checked')
    } 
    
    console.log('getActiveClass', getActiveClass)
   
}

// Добавляем данному элементу класс active и присваиваем input checked

const addItemActiveClass = (payload) => {
    const {target, id} = payload
    const getInput = target.querySelector('.quiz-body-item-chose > input')
    getInput.setAttribute('checked', 'checked')
    target.setAttribute('id', id)
    saveLocal(id)
    lastID = id
    target.classList.add('quiz-body-item-active')
}

// Сохраним id в localStorage

const saveLocal = (payload) =>  {
    localStorage.setItem(`${slideIndex}`, JSON.stringify(payload))
}


const deleteLocal = (key) => {
    // localStorage.removeItem(`${this.key}`)
}

const getLocal = () =>  {
    console.log('slideINdexLocal', typeof String(slideIndex))
    const getItem =  JSON.parse(localStorage.getItem(`${String(slideIndex)}`))
    addLastItemActive(getItem)
}

// Добавляем стили при перекрутки назад и вперед

const addLastItemActive = (payload) => {
    const gertItemID = document.querySelectorAll('.quiz-body-item')
    gertItemID.forEach((item) => {
        if (item.getAttribute('lat') === payload) {
            const getInput = item.querySelector('.quiz-body-item-chose > input')
            getInput.setAttribute('checked', 'checked')
            item.setAttribute('checked', 'checked')
            item.classList.add('quiz-body-item-active')
        } else {
            console.log('Элемент не найден')
        }
    })
    
}

// TODO CHECK
//  Прослушиваем события в quiz-wrapper
quizWrapper.forEach((item) => {
    item.addEventListener("click", (e) => listenerQuizWrapper(e))
}) 