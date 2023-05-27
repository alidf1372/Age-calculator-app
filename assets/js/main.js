const button = document.querySelector('button');
button.addEventListener('click', calculateAge);

const nowDate = new Date();

// اضافه کردن رویداد تغییر به ورودی‌ها
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const dayElement = document.getElementById('in-day');
const monthElement = document.getElementById('in-month');
const yearElement = document.getElementById('in-year');

dayInput.addEventListener('change', handleDayChange);
monthInput.addEventListener('change', handleMonthChange);
yearInput.addEventListener('change', handleYearChange);

// تابع محاسبه سن
function calculateAge() {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const dayResultElement = document.querySelector('.res-day-num');
    const monthResultElement = document.querySelector('.res-month-num');
    const yearResultElement = document.querySelector('.res-year-num');

    if (!dayElement.classList.contains("error") && !monthElement.classList.contains("error") && !yearElement.classList.contains("error") && validate(day) && validate(month) && validate(year)) {
        let dayResult, monthResult, yearResult;

        if (day > nowDate.getDate() && month > nowDate.getMonth()) {
            dayResult = (nowDate.getDate() + 31) - day;
            monthResult = (nowDate.getMonth() + 12) - month;
            yearResult = (nowDate.getFullYear() - 1) - year;
        } else if (day > nowDate.getDate()) {
            dayResult = nowDate.getDate() + 31 - day;
            monthResult = nowDate.getMonth() - month;
            yearResult = nowDate.getFullYear() - year;
        } else if (month > nowDate.getMonth()) {
            dayResult = nowDate.getDate() - day;
            monthResult = (nowDate.getMonth() + 13) - month;
            yearResult = (nowDate.getFullYear() - 1) - year;
        } else {
            dayResult = nowDate.getDate() - day;
            monthResult = nowDate.getMonth() + 1 - month;
            yearResult = nowDate.getFullYear() - year;
        }

        dayResultElement.textContent = dayResult;
        monthResultElement.textContent = monthResult;
        yearResultElement.textContent = yearResult;
    }
}

function handleDayChange() {
    let day = parseInt(dayInput.value);
    if (day === 0 || day > 31 || isNaN(day)) {
        handleInvalidInput(dayElement, "must be a valid day");
    } else {
        clearError(dayElement);
    }
}

function handleMonthChange() {
    let month = parseInt(monthInput.value);
    if (month === 0 || month > 12 || isNaN(month)) {
        handleInvalidInput(monthElement, "must be a valid month");
    } else {
        clearError(monthElement);
    }
}

function handleYearChange() {
    let year = parseInt(yearInput.value);
    const yearNow = nowDate.getFullYear();

    if (year === 0 || isNaN(year)) {
        clearError(yearElement);
        handleInvalidInput(yearElement, "must be a valid year");
    } else if (year > yearNow) {
        clearError(yearElement);
        handleInvalidInput(yearElement, "must be in the past");
    } else {
        clearError(yearElement);
    }
}

function handleInvalidInput(element, message) {
    if (!element.classList.contains("error")) {
        const messageElement = createErrorMessageElement(message);
        element.append(messageElement);
        element.classList.add("error");
    }
}

function clearError(element) {
    if (element.classList.contains("error")) {
        element.querySelector('span').remove();
        element.classList.remove("error");
    }
}

function createErrorMessageElement(message) {
    const messageElement = document.createElement('span');
    messageElement.style.color = "hsl(0, 100%, 67%)";
    messageElement.textContent = message;
    return messageElement;
}

function validate(input) {
    if (typeof input === 'number') {
        input = String(input);
    }
    return input.trim() !== "";
}

