var numberOfGuesses;
let timer = true;
function startGame() {
    numberOfGuesses = 0;
    timer = true;
    //stopTimer();
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
    stopWatch();
    let person = prompt("Please enter your name", "John");

    if (person != null) {
        document.getElementById("name").innerText = person;
    }

    document.getElementById("form").style.display = 'block';
    var randomNumber = generateRandomNumber();
    while (areDigitsRepeating(randomNumber)) {
        randomNumber = generateRandomNumber();
    }
    document.getElementById("sysGenerated").value = randomNumber;
}

function generateRandomNumber() {
    // random value generated
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

function areDigitsRepeating(randomNum) {
    var num = randomNum.toString().split("");
    console.log(num);
    let digitsRepeating = false;
    for (var i = 0; i < num.length; i++) {
        var num1 = num[i];
        for (var j = i + 1; j < num.length; j++) {
            if (num[j] == num1) {
                digitsRepeating = true;
                break;
            }
            else {
                continue;
            }
        }
    }
    return digitsRepeating;
}

function submitGuess() {
    // number guessed by user  
    numberOfGuesses = numberOfGuesses + 1;

    var userGuess = document.getElementById("guessField").value;
    var randomNumber = document.getElementById("sysGenerated").value;

    var rannum = randomNumber.toString().split("");
    var guess = userGuess.toString().split("");

    var result = '';
    for (var i = 0, j = 0; i < rannum.length; i++) {
        j = i;
        var num1 = guess[i];
        var num2 = rannum[j];
        let digitFound = false;
        if (num1 == num2) {
            result = result.concat('+');
            digitFound = true;
        } else {

            for (j = 0; j < guess.length; j++) {
                if (i == j) {
                    continue;
                } else {
                    if (num1 == rannum[j]) {
                        result = result.concat('-');
                        digitFound = true;
                        break;
                    }
                }
            }
        }
        if (!digitFound) {
            result = result.concat('*');
        }
    }
    alert("Your guess is " + result + "\n + means digit exists in the same location"
        + "\n - means digit exists in a different location"
        + "\n * means digit does not exists");

    document.getElementById("No_of_guess").innerHTML = numberOfGuesses;
    checkGameOver();
}

function checkGameOver() {
    var userGuess = document.getElementById("guessField").value;
    var randomNumber = document.getElementById("sysGenerated").value;

    if (randomNumber == userGuess) {
        alert("You have guessed correctly. Number of guesses " + numberOfGuesses
            + "\n and the time taken is " + document.getElementById('hr').innerHTML + "hr "
            + document.getElementById('min').innerHTML + "min "
            + document.getElementById('sec').innerHTML + "sec "
            + document.getElementById('count').innerHTML + "ms");
        stopTimer();
        topScore();
        document.getElementById("No_of_guess").innerHTML = 0;
    }
}

function stopTimer() {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
}

let hour = 00;
let minute = 00;
let second = 00;
let count = 00;

function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;

        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }

        if (count < 10) {
            countString = "0" + countString;
        }

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}

function topScore() {
    var timeTaken = document.getElementById('hr').innerHTML + ":" + document.getElementById('min').innerHTML + ":" +
        document.getElementById('sec').innerHTML + ":" + document.getElementById('count').innerHTML;
    if (localStorage.getItem("topScore") != null) {
        var topScoreNumberofGuesses = localStorage.getItem("numberofGuesses");
        var oldTime = localStorage.getItem("topScore");
        if (timeTaken == oldTime) {
            if (topScoreNumberofGuesses > numberOfGuesses) {
                alert("New Top Score : " + timeTaken + "  numberOfGuesses " + numberOfGuesses);
                localStorage.setItem("topScore") = timeTaken;
                localStorage.setItem("numberofGuesses") = numberOfGuesses;
            }
        }
    } else {
        localStorage.setItem("topScore", timeTaken);
        localStorage.setItem("numberofGuesses", numberOfGuesses);
    }



}