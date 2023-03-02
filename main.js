"use strict"

function renderCoffee(coffee) {
    let html = '<article class="card coffee col-6 p-0" style="width: 47%">';
    html += '<div class="card-header">' + coffee.id + '</div>';
    html += '<div class="card-body">' + coffee.name + '</div>';
    html += '<div class="card-footer">' + coffee.roast + '</div>';
    html += '</article>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function selectByRoast(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast || selectedRoast === "all") {
            filteredCoffees.push(coffee);
        }
    });
    organizeCoffees(filteredCoffees);
}

function searchByName(e){
    e.preventDefault();
    let userInput = coffeeSearch.value;
    let correctedInput = userInput.toLowerCase();
    let filteredCoffees = [];
    coffees.forEach(function (coffee){
        let filtered = coffee.name.toLowerCase();

        if(filtered.indexOf(correctedInput) > -1){
            console.log("win");
            filteredCoffees.push(coffee);
        }
    });
    organizeCoffees(filteredCoffees);
}

function organizeCoffees(filteredCoffees){
    /*
    // utilizes both the sort function and an arrow function to organize objects in the array by their ID
    // This method is harder to grasp at current level, so we are utilizing the method below.
    let sortedCoffees = filteredCoffees.sort(
        (coffee1,coffee2) => (coffee1.id < coffee2.id) ? 1 : (coffee1.id > coffee2.id) ? -1 : 0);
     */

    // This method is easier to figure out and explain.
    // If the first coffee is greater than the second, they swap (coffee2, coffee1)
    // If the first coffee is less than the second, they will stay in the same order.
    // If they are equal, they will stay in the same spot
    let sortedCoffees = filteredCoffees.sort(function (coffee1,coffee2){
        if (coffee1.id > coffee2.id){
            return -1;
        } else if (coffee1.id < coffee2.id){
            return 1;
        }
        return 0;
    })
    coffeeCards.innerHTML = renderCoffees(sortedCoffees);
    window.localStorage.setItem("savedCoffees", JSON.stringify(coffees));
}

 function retrievePreviouslyAddedCoffees(){
     //window.localStorage.removeItem("savedCoffees");
     const retrievedData = JSON.parse(window.localStorage.getItem("savedCoffees"));
     if(retrievedData){
         coffees = retrievedData;
     }
 }

function addCoffee(e) {
    e.preventDefault()
    let coffeeId = coffees.length + 1
    let coffeeName = coffeeAdd.value
    let coffeeRoast = roastAdd.value
    let newCoffee = {id: coffeeId, name: coffeeName, roast: coffeeRoast}
    coffees.push(newCoffee)
    organizeCoffees(coffees)
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
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

const coffeeCards = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit-search');
const roastSelection = document.querySelector('#roast-selection');
const coffeeSearch = document.querySelector('#coffee-search-bar');
const coffeeAdd = document.querySelector('#coffee-add-bar');
const roastAdd = document.querySelector('#roast-selection-add')
const submitButtonAdd = document.querySelector('#submit-add')

retrievePreviouslyAddedCoffees(coffees)
organizeCoffees(coffees);


coffeeSearch.addEventListener('keyup', searchByName)
submitButton.addEventListener('click', selectByRoast);
submitButtonAdd.addEventListener('click', addCoffee)
