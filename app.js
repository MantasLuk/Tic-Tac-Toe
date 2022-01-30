//elements selection
const selectionBox = document.querySelector('.selection-box'),
xBtn = selectionBox.querySelector('.playerX'),
oBtn = selectionBox.querySelector('.playerO'),
playBoard = document.querySelector('.playboard'),
allBoxes = document.querySelectorAll('section span'),
players = document.querySelector('.players'),
resultBox = document.querySelector('.result-box'),
winnerText = resultBox.querySelector('.won'),
replayButton = resultBox.querySelector('button');


window.onload = ()=> {
    //add onclick in all available sections spans
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].setAttribute('onclick', 'clickedBox(this)');
    }
}

    xBtn.onclick = () =>{
        selectionBox.classList.add('hide'); 
        playBoard.classList.add('show');
        
    }
    oBtn.onclick = () =>{
        selectionBox.classList.add('hide'); 
        playBoard.classList.add('show');
        players.setAttribute('class', 'players active player');
        
    }

let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle'; 
let playerSign = 'X';
let runBot = true;


//users click function
function clickedBox(element) {
    if(players.classList.contains('player')){
        playerSign = 'O';
        element.innerHTML = `<i class= '${playerOIcon}'></i>`;
        players.classList.remove('active');
        element.setAttribute('id', playerSign);
    } else {
        element.innerHTML = `<i class= '${playerXIcon}'></i>`;
        players.classList.add('active');
        element.setAttribute('id', playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = 'none';
    element.style.pointerEvents = 'none'; //can not select selected box again
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed()
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime); //passing delay time
};

//bot click function
function bot(runBot) {
    let array = [];
    if(runBot){
        playerSign = 'O';
        for (let i = 0; i < allBoxes.length; i++){
            if (allBoxes[i].childElementCount == 0) { //span has no child element
                array.push(i);
            }
        };
        let randomBox = array[Math.floor(Math.random() * array.length)]; //gets random index from array. Bot can select random unselected box
        if(array.length > 0) {
            if(players.classList.contains('player')){
                playerSign = 'X'; 
                allBoxes[randomBox].innerHTML = `<i class= '${playerXIcon}'></i>`;
                allBoxes[randomBox].setAttribute('id', playerSign);
                players.classList.add('active');  
            } else {
                allBoxes[randomBox].innerHTML = `<i class= '${playerOIcon}'></i>`;
                players.classList.remove('active');
                allBoxes[randomBox].setAttribute('id', playerSign);
            }
            selectWinner();
        }
        allBoxes[randomBox].style.pointerEvents = 'none'; // cannot select bots field
        playBoard.style.pointerEvents = 'auto';
        playerSign = 'X';
    }
};

//winner
function getId(idName) {
    return document.querySelector('.box' + idName).id 
};

function checkIds(val1, val2, val3, sign) {
    if (getId(val1) == sign && 
        getId(val2) == sign && 
        getId(val3) == sign) {
        return true;
    }
};

function selectWinner () {
    if( checkIds(1, 2, 3, playerSign) || checkIds(4, 5, 6, playerSign) || 
        checkIds(6, 7, 8, playerSign) || checkIds(1, 4, 7, playerSign) || 
        checkIds(2, 5, 8, playerSign) || checkIds(3, 6, 9, playerSign) || 
        checkIds(1, 5, 9, playerSign) || checkIds(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);

        //result box show
        setTimeout(() => {
        playBoard.classList.remove('show');
        resultBox.classList.add('show');
        }, 500);

        winnerText.innerHTML = `Player <p>${playerSign}</p> win the game!`
    } else {
        if( getId(1) != '' && getId(2) != '' && 
            getId(3) != '' && getId(4) != '' && 
            getId(5) != '' && getId(6) != '' && 
            getId(7) != '' && getId(8) != '' && 
            getId(9) != '') {
            runBot = false;
            bot(runBot);
            //result box show
            setTimeout(() => {
            playBoard.classList.remove('show');
            resultBox.classList.add('show');
            }, 500);  
            winnerText.textContent = `It's a draw!`
        }
    }
};

replayButton.onclick = () => {
    window.location.reload();
};