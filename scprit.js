function setTimer() {
    var container = document.getElementById('main');
    var originalContainer = document.getElementsByClassName('set-timer')[0];

    // Get input values
    var hoursInputO = originalContainer.getElementsByClassName('hours')[0];
    var minutesInputO = originalContainer.getElementsByClassName('minutes')[0];
    var secondsInputO = originalContainer.getElementsByClassName('seconds')[0];

    // Check if at least one input field is filled
    if (!(hoursInputO.value || minutesInputO.value || secondsInputO.value)) {
        alert('Please enter the time.');
        return;
    }
    if (hoursInputO.value > 23 || minutesInputO.value > 59 || secondsInputO.value > 59) {
        alert('Please enter valid time. Minutes and seconds should be less than 60 and hours less than 24');
        return;
    }


    var newContainer = originalContainer.cloneNode(true);
    
    var titleLabel = newContainer.getElementsByClassName('label')[0];
    var setButton = newContainer.getElementsByClassName('set-button')[0];
    var hoursInput = newContainer.getElementsByClassName('hours')[0];
    var minutesInput = newContainer.getElementsByClassName('minutes')[0];
    var secondsInput = newContainer.getElementsByClassName('seconds')[0];
    titleLabel.textContent = 'Time Left :';
    setButton.textContent = 'Delete';
    hoursInput.value = padZero(parseInt(hoursInput.value) || 0);
    minutesInput.value = padZero(parseInt(minutesInput.value) || 0);
    secondsInput.value = padZero(parseInt(secondsInput.value) || 0);

    var totalSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);

    setButton.onclick = function () {
        deleteTimer(newContainer);
    };
    container.appendChild(newContainer);
    hoursInputO.value = null;
    minutesInputO.value = null;
    secondsInputO.value = null;
    checkTimers();
    startTimer(hoursInput, minutesInput, secondsInput, totalSeconds,newContainer);
}

function deleteTimer(container) {
    container.parentNode.removeChild(container);
    checkTimers();
}

function startTimer(hoursInput, minutesInput, secondsInput, totalSeconds,container) {
    var countdownInterval = setInterval(function () {
        var audio = new Audio('./media/beep.mp3');
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        hoursInput.value = padZero(hours);
        minutesInput.value = padZero(minutes);
        secondsInput.value = padZero(seconds);

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            var inputs = container.getElementsByClassName('input-time')[0];
            removeElement(inputs);

            var titleLabel = container.getElementsByClassName('label')[0];
            var setButton = container.getElementsByClassName('set-button')[0];


            titleLabel.textContent = 'Time is Up !';
            titleLabel.style.fontSize = '48px';
            titleLabel.style.fontWeight = '500';
            titleLabel.style.fontFamily = 'Robin'
            titleLabel.style.margin = 'auto';
            titleLabel.style.color = 'rgba(52, 52, 74, 1)'

            setButton.style.backgroundColor = 'rgba(52, 52, 74, 1)'
            setButton.style.color = 'rgba(255, 255, 255, 1)'
            setButton.style.fontFamily = 'Robin'

            container.style.backgroundColor = 'rgba(240, 247, 87, 1)';

            container.getElementsByClassName('set-button')[0].textContent = "Stop";
            audio.play();
        } else {
            totalSeconds--;
        }
    }, 1000);
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function removeElement(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function checkTimers() {
    var container = document.getElementById('main');
    var timers = container.getElementsByClassName('set-timer');

    if (timers.length === 1) {
        document.getElementById('no-timer-message').style.display = 'block';
    } else {
        document.getElementById('no-timer-message').style.display = 'none';
    }
}
