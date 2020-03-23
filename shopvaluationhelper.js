// ==UserScript==
// @name         Shop Valuation Helper
// @version      0.1
// @description  Shows how much a shop page is worth. Replace asterisk in @include tag with your username.
// @author       b-en-nui
// @include      http://www.neopets.com/browseshop.phtml?owner=*
// @include      http://www.neopets.com/browseshop.phtml?lower=*
// @include      http://www.neopets.com/market.phtml?type=sales
// @noframes
// @grant        none
// ==/UserScript==

(function(){
    "use strict";
    var content = document.getElementsByClassName('content')[0];
    var urlpart = window.location.href;
    if (urlpart.includes('browseshop.phtml')){
        var shopTable = content.getElementsByTagName('table')[0];
        var shopItemArray = shopTable.getElementsByTagName('td');
        var totalPrice = 0;
        for (let item of shopItemArray) {
            var text = item.innerHTML;
            var stock = text.match(new RegExp('</b><br>(.*) in stock'))[1];
            var price = text.match(new RegExp('Cost : (.*) NP'))[1].replace(',','');
            totalPrice = totalPrice + Number(stock)*Number(price)
        }
        var appendedHTML = '<center><h2>Shop value: ' + totalPrice.toLocaleString() + ' np</h2></center>';
        shopTable.insertAdjacentHTML('beforebegin', appendedHTML);
    }
    else{
        var salesTable = content.getElementsByTagName('table')[2];
        var priceRows = salesTable.getElementsByTagName('tr');
        var totalSales = 0;
        for (let item of priceRows) {
            var rows = item.getElementsByTagName('td');
            if (rows[3]){
                var salePrice = rows[3].innerText.replace(',','').replace(' NP','').replace('Price','0')
                totalSales = totalSales + Number(salePrice)
            }
        }
        var earliestDateBrit = priceRows[1].getElementsByTagName('td')[0].innerText
        var day = earliestDateBrit.substring(0,2)
        var month = earliestDateBrit.substring(3,5)
        var year = earliestDateBrit.substring(6,10)
        var earliestDate = month + '-' + day + '-' + year;
        var appendedHTML2 = '<center><h2>Sold ' + totalSales.toLocaleString() + ' np in items since ' + earliestDate + '</h2></center>'
        salesTable.insertAdjacentHTML('beforebegin', appendedHTML2);
    }

})();
