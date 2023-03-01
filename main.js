"use strict"

function renderCoffee(coffee) {
    var html = '<article class="card coffee col-6 p-0" style="width: 47%">';
    html += '<div class="card-header">' + coffee.id + '</div>';
    html += '<div class="card-body">' + coffee.name + '</div>';
    html += '<div class="card-footer">' + coffee.roast + '</div>';
    html += '</article>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    organizeCoffees(filteredCoffees);
}

function searchCoffees(e){
    e.preventDefault();
    var userInput = coffeeSearch.value;
    var correctedInput = userInput.toLowerCase();
    var filteredCoffees = [];
    coffees.forEach(function (coffee){
        var filtered = coffee.name.toLowerCase();

        if(filtered.indexOf(correctedInput) > -1){
            console.log("win");
            filteredCoffees.push(coffee);
        }
    });
    organizeCoffees(filteredCoffees);
}

function organizeCoffees(filteredCoffees){
    let sortedCoffees = filteredCoffees.sort(
        (p1,p2) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0);
    coffeeCards.innerHTML = renderCoffees(sortedCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var coffeeCards = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSearch = document.querySelector('#coffee-search-bar');

organizeCoffees(coffees);

coffeeSearch.addEventListener('keyup', searchCoffees)
submitButton.addEventListener('click', updateCoffees);
