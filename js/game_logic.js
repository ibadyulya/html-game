
let initialCardValues = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
let finiteCardValues = ['A','A','B','B','C','C','D','D','E','E'];
let cardShirt = 'url(./img/shirt2.jpg) no-repeat';
let gameField =  document.getElementsByClassName("game-field");
gameField[0].style.width = '794px';
let cardCompare = [];
let cardID = [];
let isFlipped = 0;
let timerID;
let timerBase = 60; 
var timer,dateObj,dhour,dminute,dsecond,msecond; 
var hour=1,minute=1,tminute=1,second=0,tsecond=0,msecond=0,init=0; 
let timerDisplay=''; 



Array.prototype.cardsShuffle = function(){
    let i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function numberOfCards(child,n, gameFieldScale){
	document.getElementById("btn_1").innerHTML = child.firstChild.innerHTML;
	finiteCardValues = [];
	for(let i = 0; i < n; i++){ // generating the array of back side card values by game difficulty
		
		finiteCardValues[i] = initialCardValues[i];
	}
	switch(gameFieldScale){ // fixing the field of the game by game difficulty. It needs for correctly display
		case 1:
			 gameField[0].style.width = '794px';
			
			break;
		case 2:	
			gameField[0].style.width = '921px';
			
			break;
		case 3:	
			gameField[0].style.width = '100%';
			break;
	}
	
}
function cardScirt(shirt){ //changing the shirt of cards
	cardShirt = shirt;
}
function cardRender(backSideCard){ // displaying cards at the game field
	cardCompare = [];
    cardID = [];
	isFlipped = 0;
	let output = '';
    finiteCardValues.cardsShuffle();
	for(let i = 0; i < finiteCardValues.length; i++){
		output += '<div class="card" id="tile_'+i+'" onclick="cardFlip(this,\''+finiteCardValues[i]+'\')"><div class="back" id="backSideCard_'+i+'" ></div><div class="front" style="background:' + cardShirt +'"></div></div>';
	}
	gameField[0].innerHTML = output;
}
function cardFlip(cardTile,val){ //flipping cards logic
	if(cardTile.firstChild.innerHTML == "" && cardCompare.length < 2){
		cardTile.firstChild.style.webkitTransform="perspective( 200px ) rotateY( 0deg )";
		cardTile.lastChild.style.webkitTransform="perspective( 200px ) rotateY( -180deg )";
		cardTile.firstChild.style.background = '#000';
		cardTile.firstChild.innerHTML = val;
		if(cardCompare.length == 0){ // 1 card selected
			cardCompare.push(val);
			cardID.push(cardTile.id);
		} else if(cardCompare.length == 1){ //2 card selected
			cardCompare.push(val);
			cardID.push(cardTile.id);
			if(cardCompare[0] == cardCompare[1]){ // if 2 cards are equal, we need to dissappeare it slowly
				isFlipped += 2;
				let firstCard = document.getElementById(cardID[0]);
				let secondCard = document.getElementById(cardID[1]);
				cardSlowDisappearance(firstCard, secondCard);
				cardCompare = [];
            	cardID = [];
				// Check to see if the whole board is cleared
				if(isFlipped == finiteCardValues.length){
					timerStartStopClear();
					setTimeout((function(){gameField.innerHTML = "";alert("CONGRATULATIIIIOOOONSSSSS!");	}), 1000);			
				}
			} else {
				function backFlip(){
				    // Flip the 2 backSideCards back over
				    let firstCard = document.getElementById(cardID[0]);
				    let secondCard = document.getElementById(cardID[1]);
					firstCard.firstChild.style.webkitTransform="perspective( 200px ) rotateY( 180deg )";
					firstCard.lastChild.style.webkitTransform="perspective( 200px ) rotateY( 0deg )";
					secondCard.firstChild.style.webkitTransform="perspective( 200px ) rotateY( 180deg )";
					secondCard.lastChild.style.webkitTransform="perspective( 200px ) rotateY( 0deg )";
            	   	setTimeout((function(){
						 secondCard.firstChild.innerHTML = "";
						 firstCard.firstChild.innerHTML = "";
					}), 300);
				    cardCompare = [];
            	    cardID = [];
				}
				setTimeout(backFlip, 1200);
			}
		}
	}
}
function cardSlowDisappearance(first, second) {
    let op = 1;
    setTimeout(function (){
        if (op < 0) return;
        first.style.opacity=op;
        second.style.opacity=op;
        op-=0.1;
        setTimeout (arguments.callee, 100);
    }, 700);
}
function timerClear() { 
	clearTimeout(timer); 
	hour=1;minute=1;tminute=1;second=0;tsecond=0;msecond=0; 
	init=0;
	timerDisplay='00:00:00.00'; 
	document.timeForm.stopWatch.value=timerDisplay; 
} 
function timerStart() { 
	var cdateObj = new Date(); 
	var t = (cdateObj.getTime() - dateObj.getTime())-(second*1000); 
	if (t>999) { second++; } 
	if (second>=(minute*timerBase)) { 
		tsecond=0; 
		minute++; 
	} else { 
		tsecond=parseInt((msecond/100)+second); 
		if(tsecond>=timerBase) { tsecond=tsecond-((minute-1)*timerBase); } 
	} 
	if (minute>(hour*timerBase)) { 
		tminute=1; 
		hour++; 
	} else { 
		tminute=parseInt((msecond/100)+minute); 
		if(tminute>=timerBase) { tminute=tminute-((hour-1)*timerBase); } 
	} 
	msecond = Math.round(t/10); 
	if (msecond>99) {msecond=0;} 
	if (msecond==0) {msecond='00';} 
	if (msecond>0&&msecond<=9) { msecond = '0'+msecond; } 
	if (tsecond>0) { dsecond = tsecond; if (tsecond<10) { dsecond = '0'+tsecond; }} else { dsecond = '00'; } 
	dminute=tminute-1; 
	if (dminute>0) { if (dminute<10) { dminute = '0'+dminute; }} else { dminute = '00'; } 
	dhour=hour-1; 
	if (dhour>0) { if (dhour<10) { dhour = '0'+dhour; }} else { dhour = '00'; } 
	timerDisplay = dhour + ':' + dminute + ':' + dsecond + '.' + msecond; 
	document.timeForm.stopWatch.value = timerDisplay; 
	timer = setTimeout("timerStart()",1); 
} 
function timerStartStopClear() { 
	if (init==0){ 
		timerClear();
		dateObj = new Date(); 
		timerStart(); 
		init=1; 
	} else { 
//		clearTimeout(timer);
		timerClear();
		init=0;
	} 
}
