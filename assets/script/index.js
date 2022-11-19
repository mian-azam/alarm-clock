'use strict';



function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}
//------------------------------------------------------------------
const clock = select('.clock');
const setAlarm = select('.alarm-set');
const btnOne = select('.btn-one');
const btnTwo = select('.btn-two');
const userInput = select('.user-input');
const check = select('.check');
//importing audio
const alarm = new Audio('./assets/media/mixkit-alarm-digital-clock-beep-989.wav');
alarm.type = 'audio/wav';

//regex for HH:MM
const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

//Validation
function isValid(input) {
    if (Number.isInteger(input)) {
        return true;
    }
    return false;
}

function validate() {
    let input = userInput.value.trim();

    if (input.length === 0) {
        check.innerText = 'Your input is Empty!';
    }
    else if (!timeRegex.test(input)) {
        check.innerText = 'Enter a valid time format: HH:MM';
    }
    else {
        check.innerText = 'Alarm set for:';
        setAlarm.innerText = userInput.value;
    }
}

function currentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds();
    let currentTime = hours + ':' + minutes + ':' + seconds;
    let timeForAlarm = hours + ':' + minutes;

    clock.innerText = currentTime;

    //PLAYING SOUND ON ALARM TIME
    let timeForSound = userInput.value.trim();
    if (timeForAlarm == timeForSound) {
        alarm.play();
    } else {
        alarm.pause();
    }
}
setInterval(currentTime, 1000);
currentTime()


onEvent('click', btnOne, () => {
    validate();
});

onEvent('click', btnTwo, function () {
    window.location.reload();
    userInput.value = '';
});






