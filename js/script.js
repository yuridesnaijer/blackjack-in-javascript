//globale variabelen aanmaken om de getrokken kaarten in op te slaan
var userCardArray = [];
var userCardTotal = 0;
var bankCardArray = [];
var bankCardTotal = 0;

//init functie voor het afhandelen van de buttons
function init (){
    var pickCard =  document.getElementById('pickCard');
    pickCard.addEventListener('click', takeCard);

    var stop = document.getElementById('stop');
    stop.addEventListener('click', bank);

    var reset = document.getElementById('reset');
    reset.addEventListener('click', refresh);
}

//refresh voor een nieuw spel
function refresh (){
    location.reload();
}

//deze functie word aangeroepen als de bank aan de beurt is
function bank(){
    console.log('de bank pakt een kaart');
    var deckNumber = [2,3,4,5,6,7,8,9,10]; //array met de mogelijken kaartnummers die je kan trekken
    var deckSymbol = ['Harten', 'Schoppen', 'Klavers', 'Ruiten'];//array met de mogelijke symbolen van de kaarten

    var i = Math.floor(Math.random() * 9);// random getallen worden gegenereerd om later de array mee uit te lezen
    var j = Math.floor(Math.random() * 4);


    var cards = document.getElementById('cards');
    var div = document.createElement('div');            // dit stuk zorgt er voor dat de kaart in het dom wordt geladen
    div.className = 'bankCard';
    cards.appendChild(div);

    div.innerHTML = '<p>bank</p>' + deckSymbol[j] + '<br>' + deckNumber[i];

    bankCardArray.push(deckNumber[i]); // de getrokken kaart word opgeslagen in de array

    bankTotal();
}

function bankTotal(){
    var totaal = 0;
    var message = document.getElementById('bankTotaal');

    for(var i = 0; i < bankCardArray.length; i++){  // hier wordt het totaal van de bank berekend
        totaal += bankCardArray[i];
    }

    if(totaal < userCardTotal){ //als het totaal van de bank lager is dan het totaal van de speler word de functie om een kaart te genereren opnieuw aangeroepen
        bank();
    } else { // als dit niet het geval is wordt het totaal van de bank getoond in het dom en word de functie checkFinal aangeroepen
        message.innerHTML = 'Bank totaal: ' + totaal;

        bankCardTotal = totaal;
        console.log(bankCardTotal);
        checkFinal();
    }
}

function checkFinal(){

    var message = document.getElementById('userMessage'); // plaats opzoeken waar de melding moet komen

    if(bankCardTotal > 21){ // als de bank meer dan 21 heeft getrokken wint de speler.
        message.innerHTML = 'Speler Wint!';
    } else {    // zoniet dan word gekeken wat wel het geval is
        if(userCardTotal > bankCardTotal){
            message.innerHTML = 'Speler Wint!';
        } else if (userCardTotal === bankCardTotal){
            message.innerHTML = 'Gelijk Spel!';
        } else if (userCardTotal < bankCardTotal){
            message.innerHTML = 'Bank Wint!';
        }
    }

}


//User functions//

function takeCard(e){ // in principe hetzelde als de bank functie... had beter in het een object gekunt misschien? ik wist niet hoe...
    e.preventDefault();
    console.log('je pakt een kaart');
    var deckNumber = [2,3,4,5,6,7,8,9,10];
    var deckSymbol = ['Harten', 'Schoppen', 'Klavers', 'Ruiten'];

    var i = Math.floor(Math.random() * 9);
    var j = Math.floor(Math.random() * 4);
    var cards = document.getElementById('cards');
    var div = document.createElement('div');
    div.className = 'userCard';
    cards.appendChild(div);

    div.innerHTML = deckSymbol[j] + "<br /> " + deckNumber[i];

    userCardArray.push(deckNumber[i]);

    userTotal();
}

function userTotal(){
    var totaal = 0;
    var message = document.getElementById('userTotaal');  // in principe hetzelde als de bankTotal functie... had beter in het een object gekunt misschien? ik wist niet hoe...

    for(var i = 0; i < userCardArray.length; i++){
       totaal += userCardArray[i];
    }

    message.innerHTML = 'Jouw totaal is: ' + totaal;

    userCardTotal = totaal;
    console.log(userCardTotal);

    userCheck();
}

function userCheck(){ // hier wordt van te voren gechecked of de speler 21 heeft, dan wint hij automatisch, en als hij meer dan 21 heeft verliest hij automatisch.
    var message = document.getElementById('userMessage');

    if (userCardTotal === 21){
        message.innerHTML = '21! Je hebt gewonnen!';
    } else if(userCardTotal >21){
        message.innerHTML = 'Het totaal is meer dan 21. Je hebt verloren.';
    }
}
//End user functions//


window.addEventListener('load', init); // als de pagina geladen is word de functie init uitgevoerd.