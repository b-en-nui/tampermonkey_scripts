// ==UserScript==
// @name         Jhudora / Illusen Quest Logger
// @version      0.1
// @description  Records items asked for in an I or J-Quest run
// @author       b-en-nui
// @include      http://www.neopets.com/faerieland/darkfaerie.phtml*
// @include      http://www.neopets.com/medieval/earthfaerie.phtml*
// @noframes
// @grant        none
// ==/UserScript==

(function(){
    "use strict";
    var content = document.getElementsByClassName("content")[0];
    var appendedHTML = '<center><h2>This run so far:</h2><form id="inputform"><input id="item" type="text" placeholder="Last item retrieved? (press enter)" size="27" required /><br><br></form><div id="list"></div><br><button id="button">Clear All</button></center>';
    content.insertAdjacentHTML('beforeend', appendedHTML);
    const form = document.getElementById('inputform');
    const ul = document.getElementById('list');
    const button = document.getElementById('button');
    const input = document.getElementById('item');
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

    localStorage.setItem('items', JSON.stringify(itemsArray))
    const data = JSON.parse(localStorage.getItem('items'))

    const liMaker = text => {
        const tr = document.createElement('tr')
        tr.textContent = text
        ul.appendChild(tr)
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        itemsArray.push(input.value)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        liMaker(input.value)
        input.value = ''
    })

    data.forEach(item => {
        liMaker(item)
    })

    button.addEventListener('click', function() {
        var r = confirm("Are you sure? You can't undo!")
        if (r == true) {
            localStorage.removeItem('items')
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild)
            }
        }
    })
})();
