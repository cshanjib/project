// JavaScript Document
var width = 150;
var height = 209;
var myCard = new Card("A", "C");
//document.getElementById("sa").style.background='url(images/card-sprite.png) -'+150+'px 0 no-repeat';
//document.getElementById("wrap").appendChild(myCard.divNode());
var playerCards=[];
//document.getElementById("wrap").appendChild(cardDeck[i++].divNode);
var wrapper = document.getElementById("wrap");
var back = document.createElement('div');
back.className = 'card-back';
wrapper.appendChild(back);

var game = new Game();
game.init();


function Game(){
	var that = this;
	this.card;
	this.intervalId=0;
	
	
	this.init = function(){
		//that.cardDeck = setupCards();
		that.setupCards();
		
		that.intervalId = setInterval(that.pass, 800);
		
		//playerCards.push(that.card[getRandom(0,52)]);
		//wrapper.appendChild(playerCards[0].divNode);
	}
	
	this.pass = function(){
		
		var x =0;
		this.inter=0;
		var thatt = this;
		this.id;
		if(that.card.length > 49){
			var c = that.card[getRandom(0,51-(51-that.card.length))];
			wrapper.appendChild(c.divNode);
			var index = that.card.indexOf(c);
			that.card.splice(index, 1);
			playerCards.push(c);
			
			thatt.id=setInterval(function(){
				if(x < 800-(playerCards.length-1)*200){
					x=x+10;
					c.divNode.style.left = x +'px';
				}else{
					clearInterval(thatt.id);	
				}
				
				
			}, 5);
				
			
			
		}else{
			clearInterval(that.intervalId);
			var aa = document.createElement('div');
			aa.innerHTML = that.decideResult(playerCards[0],playerCards[1],playerCards[2]);
			aa.className='msg';
			wrapper.appendChild(aa);
		}
	}
	
	
	
	
	this.decideResult = function(card1, card2, card3){
		card1 = new Card("A", "C");
		card2 = new Card("K", "C");
		card3 = new Card("A", "H");
		console.log("fsjkdfkfjkdn");
		console.log(card1.rank+" "+card2.rank+" "+card3.rank);
		if(card1.rank == card2.rank && card2.rank == card3.rank){
			return 'Three of a kind '+ card1.rank;	
		}else if(isRun([card1, card2, card3])){
			if(card1.suit == card2.suit && card2.suit == card3.suit){
				return 'Double Run';
			}else{
				return 'You got Run';
			}
		}else if(card1.suit == card2.suit && card2.suit == card3.suit){
			return 'You got Color';
		}else if(isDouble([card1, card2, card3])){
			return 'You got Two of a kind'+ card1.rank;
		}else{
			return 'You got Top'+ sortMax([card1, card2, card3])[0];
		}
		
		return 'Not Yet Defined' + playerCards.length;
	}
	
	this.move = function(){
		
	}
	
	
	
	
	
	this.setupCards = function(){
		var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
  		var suits = new Array("C", "D", "H", "S");
  		var i, j, k;
  		var m;

  		m = ranks.length * suits.length;

  		// Set array of cards.

  		this.cards = new Array(m);

	  // Fill the array with 'n' packs of cards.
		for (j = 0; j < suits.length; j++){
		  for (k = 0; k < ranks.length; k++){
			this.cards[j * ranks.length + k] = new Card(ranks[k], suits[j]);
		  }
		}
	
		that.card = this.cards;
	}
	
	
//--------------Shuffling the cards Deck	
	this.cardShuffle = new function(n) {
	
		var i, j, k;
		var temp;
	
	  // Shuffle the stack 'n' times.
		for (i = 0; i < n; i++)
			for (j = 0; j < that.cards.length; j++) {
				k = Math.floor(Math.random() * that.cards.length);
				temp = that.cards[j];
				that.cards[j] = that.cards[k];
				that.cards[k] = temp;
			}
	}
	
}
//--------------End Shuffling the cards Deck






//--------------Card Object----------------
function Card(rank, suit) {

  this.rank = rank;
  this.suit = suit;
  that = this;
  this.toString   = cardToString;
  this.divNode = makeNode();
  
  //this.createNode = cardCreateNode;
	function makeNode(){
		var tempNode = document.createElement("div");
		tempNode.className='card-front';
		var x,y;
		if(that.rank == 'A' || that.rank == '1'){
			x = 0;
		}else{
			x = (1-cardNum(that.rank))*width;
		}
		if(that.suit == 'C'){
			y = 0;	
		}else if(that.suit == 'D'){
			y = -height;
		}else if(that.suit == 'H'){
			y = -2*height;
		}else if(that.suit == 'S'){
			y = -3*height;
		}
		tempNode.style.background='url(images/card-sprite.png) '+x+'px '+y+'px no-repeat';
		return tempNode;

	}
	
	function cardToString() {
		var rank, suit;

		switch (this.rank) {
			case "A" :
      		  rank = "Ace";
      		  break;
			case "2" :
			  rank = "Two";
			  break;
			case "3" :
			  rank = "Three";
			  break;
			case "4" :
			  rank = "Four";
			  break;
			case "5" :
			  rank = "Five";
			  break;
			case "6" :
			  rank = "Six";
			  break;
			case "7" :
			  rank = "Seven";
			  break;
			case "8" :
			  rank = "Eight";
			  break;
			case "9" :
			  rank = "Nine";
			  break;
			case "10" :
			  rank = "Ten";
			  break;
			case "J" :
			  rank = "Jack"
			  break;
			case "Q" :
			  rank = "Queen"
			  break;
			case "K" :
			  rank = "King"
			  break;
			default :
      		  rank = null;
      		  break;
  		}

		switch (this.suit) {
			case "C" :
			  suit = "Clubs";
			  break;
			case "D" :
			  suit = "Diamonds"
			  break;
			case "H" :
			  suit = "Hearts"
			  break;
			case "S" :
			  suit = "Spades"
			  break;
			default :
			  suit = null;
			  break;
		}

		if (rank == null || suit == null)
			return "";

		return rank + " of " + suit;
	}
}

//--------------End Card Object----------------



//--------------User Functions----------------

function cardNum(ranks) {

	var rank;

	switch (ranks) {
		case "A" :
		  rank = 14;
		  break;
		case "2" :
		  rank = 2;
		  break;
		case "3" :
		  rank = 3;
		  break;
		case "4" :
		  rank = 4;
		  break;
		case "5" :
		  rank = 5;
		  break;
		case "6" :
		  rank = 6;
		  break;
		case "7" :
		  rank = 7;
		  break;
		case "8" :
		  rank = 8;
		  break;
		case "9" :
		  rank = 9;
		  break;
		case "10" :
		  rank = 10;
		  break;
		case "J" :
		  rank = 11;
		  break;
		case "Q" :
		  rank = 12;
		  break;
		case "K" :
		  rank = 13
		  break;
		default :
		  rank = null;
		  break;
	}
	return rank;
}

function isRun(cards){
	cards = sortMax(cards);
	for(var j=1;j<cards.length-1;j++){
		
		if(cardNum(cards[0].rank) != 14 || cardNum(cards[1].rank) == 14 || cardNum(cards[j].rank) != cardNum(cards[j+1].rank)+1){
			break;		
		}
		
		if(j == cards.length-2){
			return cards;
		}
	}
	console.log('asdsad');
	for(var j=0;j<cards.length-1;j++){
		if(cardNum(cards[j].rank) != cardNum(cards[j+1].rank)+1){
			return false;		
		}	
		
	}

	return cards;	
}

function isDouble(cards){
	var n = 13;
	cards = sortMax(cards);
	for(var i=0;i<cards.length;i++){
		for(var j=i+1;j<cards.length;j++){
			if(cardNum(cards[i].rank)==cardNum(cards[j].rank)){
				return cards;
			}
		}
	}
	return false;	
}

function sortMax(cards){
	for(var i=0;i<cards.length;i++){
		for(var j=i+1;j<cards.length;j++){
			if(cardNum(cards[i].rank)<cardNum(cards[j].rank)){
				var temp = cards[i];
				cards[i] = cards[j];
				cards[j] = temp;
			}
		}
	}
	
	return cards;	
}


function getRandom(min, max) {
        return Math.floor((Math.random() * max) + min);

}



//var card1 = new Card("A", "C");
//var arr = [new Card("A", "C"),new Card("3", "C"),new Card("2", "C")];
//var i = isRun(arr);
//console.log(i);



  
