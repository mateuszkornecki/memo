"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// place your code below

const parent = document.querySelector('.parent');
let cardsId = [];
let cardsValue = [];
const displayPairCounter = document.querySelector('.pair-counter');
let pairCounter = 0;

//! Using Fisher-Yates Algorithm to shuffle array >> got it from https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * array.length)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
const createCards = (value) => {
    const array = [];
    for (let i = 0; i < (value) / 2; i++) {
        array.push(i);
        array.push(i);
        console.log(array);
    }
    shuffle(array);
    for (let i = 0; i < value; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = i;
        card.innerHTML = array[i];
        parent.appendChild(card);
    }
}


const game = () => {
    parent.addEventListener('click', (e) => {
        if (cardsId.length < 2 && e.target.className === 'card') {
            let id = parseInt(e.toElement.id);
            const card = document.getElementById(id);
            card.classList.add('card--reverse');
            cardsId.push(id);
            cardsValue.push(card.innerHTML);

            //If pairs were found
            if (cardsValue[0] === cardsValue[1]) {
                pairCounter++;
                displayPairCounter.innerHTML = `Znaleziono ${pairCounter} par!`
                cardsId.forEach(element => {
                    const a = document.getElementById(element);
                    a.classList.remove('card');
                })
                cardsValue = [];
                cardsId = [];
            }
        } else if (e.target.className === 'card') {
            cardsValue = [];
            cardsId.forEach(element => {
                const a = document.getElementById(element);
                a.classList.remove('card--reverse');
            })
            cardsId = [];
        }
    });
}
createCards(16);
game();