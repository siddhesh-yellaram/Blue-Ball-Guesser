(function () {
    var sliderRange = document.getElementById("sliderRange");
    var sliderVal = document.getElementById("sliderVal");
    sliderRange.oninput = function () {
        sliderVal.innerHTML = this.value;
        var buttonPanel = document.getElementById('buttonPanel');

        //Removing buttons while increasing or decreasing slider
        while (buttonPanel.firstChild) {
            buttonPanel.removeChild(buttonPanel.firstChild);
        }

        //Creating buttons
        for (var i = 0; i < this.value; i++) {
            var button = document.createElement('button');
            button.className = "button";
            button.innerHTML = i + 1;
            button.id = i + 1;
            buttonPanel.appendChild(button);
        }

        function updateRetryCounters(playerTurns, maxTries) {
            document.getElementById("totalRetries").innerHTML = playerTurns;
            document.getElementById("retriesLeft").innerHTML = maxTries - playerTurns;
        }

        function reloadGame() {
            setTimeout(function () {
                location.reload();
            }, 5000);
        }

        function playerResult(playerTurns, maxTries) {
            if (playerTurns >= maxTries) {
                alert("You lose :( page will now reload");
                reloadGame();
            }
        }

        function guessingLow(blueButtonId, buttonList, playerTurns, maxTries) {
            for (let i = 0; i < blueButtonId; i++) {
                buttonList[i].addEventListener("click", function () {
                    buttonList[i].style.backgroundColor = "red";
                    alert("Too low");
                    playerTurns++;
                    updateRetryCounters(playerTurns, maxTries);
                    playerResult(playerTurns, maxTries);
                });
            }
        }

        function guessingHigh(blueButtonId, buttonList, playerTurns, maxTries) {
            for (let i = blueButtonId + 1; i < buttonList.length; i++) {
                buttonList[i].addEventListener("click", function () {
                    buttonList[i].style.backgroundColor = "green";
                    alert("Too high");
                    playerTurns++;
                    updateRetryCounters(playerTurns, maxTries);
                    playerResult(playerTurns, maxTries);
                });
            }
        }

        function startGame() {
            //Hiding Instructions paragraph
            document.getElementById('instructions').style.display = "none";

            var playerTurns = 0;
            var buttonList = document.getElementsByClassName('button');
            var blueButtonId = Math.floor((Math.random() * (sliderVal.innerHTML - 1)));
            var maxButtons = buttonList.length;
            var maxTries = Math.ceil(maxButtons / 6);
            var blueButton = buttonList[blueButtonId];

            console.log("Blue button Index No: " + blueButtonId);

            updateRetryCounters(playerTurns, maxTries);

            blueButton.addEventListener("click", function () {
                blueButton.style.backgroundColor = "#4682b4";
                alert("You won the game");
                playerTurns++;
                updateRetryCounters(playerTurns, maxTries);
                reloadGame();
            });

            guessingLow(blueButtonId, buttonList, playerTurns, maxTries);
            guessingHigh(blueButtonId, buttonList, playerTurns, maxTries);
        }

        startGame();
    }
})();