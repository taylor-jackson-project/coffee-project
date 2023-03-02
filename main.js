"use strict"

function renderCoffee(coffee) {
    let html = '<article class="card coffee p-0">';
    html += '<div class="card-header">' + coffee.id + '</div>';
    html += '<button class="card-body btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalBox' + coffee.id + '">' + coffee.name + '</button>';
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
     const retrievedData = JSON.parse(window.localStorage.getItem("savedCoffees"));
     if(retrievedData){
         coffees = retrievedData;
     }
 }
 function clearCoffees(){
     window.localStorage.removeItem("savedCoffees");
 }

function addCoffee(e) {
    e.preventDefault()
    let coffeeId = coffees.length + 1;
    let coffeeName = coffeeAdd.value;
    let coffeeRoast = roastAdd.value;
    let newCoffee = {id: coffeeId, name: coffeeName, roast: coffeeRoast};
    coffees.push(newCoffee);
    organizeCoffees(coffees);
    createModals(coffees);
}

function createModals(coffees){
    let html = '';
    coffees.forEach(function(coffee) {
        html += '<div class="modal fade" id="modalBox' + coffee.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">'
        html += '<div class="modal-dialog">';
        html += '<div class="modal-header">';
        html += '<h5 class="modal-title" id="exampleModalLabel">' + coffee.name + '</h5>';
        html += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
        html += '</div>';
        html += '<div class="modal-body text-center">';
        if(coffee.id > 14){
            html += 'It appears you have input a coffee roast that we don\'t have listed. We would love to accomadate that!\n' +
                '                    Please contact us at; <a href="https://www.gmail.com">gandjcoffee@googlemail.com</a>'
        } else {
            html += coffee.description;
        }
        html += '</div>'
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    coffeeModals.innerHTML = html;
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light', description: 'The Light City Coffee is a roast also called a New England roast by some coffee connoisseurs.\n' +
            '                    This is the first stage in which the coffee becomes drinkable during the roasting process. A true way to\n' +
            '                    differentiate between the quality of different beans!'},
    {id: 2, name: 'Half City', roast: 'light', description: 'The Half City Coffee is roasted similarly to full city coffee, left only slightly longer during the process.\n' +
            '                    Only a true coffee fanatic will be able to discern the differences between the two, however the notes are subtle\n' +
            '                    yet very altering.'},
    {id: 3, name: 'Cinnamon', roast: 'light', description: 'Don\'t let our Cinnamon roasted coffee fool you, it has nothing to do with the taste! This roast is\n' +
            '                    referred to a Cinnamon roast due to it\'s color when discharged from the roasting process. This roast\n' +
            '                    is for drinkers who aren\'t quite ready for a Medium roast, but need something with a bit more kick than\n' +
            '                    our lighter Light and Half City roasts!'},
    {id: 4, name: 'City', roast: 'medium', description: 'Our City roast most famous roast of coffee! During our roasting process, our famous City roast is the\n' +
            '                    first step in our line of Medium roast coffees. This is where the flavor truly begins to peak without\n' +
            '                    becoming too bitter. A great introduction into the world of flavorful coffee!'},
    {id: 5, name: 'American', roast: 'medium', description: 'Our American Roast is the point where our ethically sourced beans have achieved their rich and medium\n' +
            '                    brown color without any of it\'s natural oils appearing on the surface of the liquid. This roast produces\n' +
            '                    a very flavorful yet complex cup of coffee with a signature bold and snappy flavor to it.'},
    {id: 6, name: 'Breakfast', roast: 'medium', description: 'Every Breakfast roast coffee is different in it\'s own way, however ours is an excellent middle of the\n' +
            '                    road choice. Experts have described it as mild, balanced, and straightforward. A go-to choice for your\n' +
            '                    first morning cup of coffee!'},
    {id: 7, name: 'High', roast: 'dark', description: 'Our High Roast coffee is, as the name implies, roasted at a slightly higher temperature than our normal medium\n' +
            '                    roasts. It\'s much similar to the Breakfast roast, with just a little bit more of a sharp flavor profile. Good\n' +
            '                    for those who truly want an energetic start to their morning!'},
    {id: 8, name: 'Continental', roast: 'dark', description: 'Want a little darker and more of a full-body flavored roast than our High roast? Look no further than our\n' +
            '                    Continental roasted coffee! Our Continental roast is loaded with flavor notes of deep cocoa, red apple,\n' +
            '                    and caramel!'},
    {id: 9, name: 'New Orleans', roast: 'dark', description: 'Our signature New Orleans roast coffee brews a rich, dark roast with a robust flavor profile. A true taste\n' +
            '                    of New Orlean\'s energetic and artful culture!'},
    {id: 10, name: 'European', roast: 'dark', description: 'Just got back from a trip to Europe and want a package of coffee that reminds you of your experience?\n' +
            '                    Well, our European coffee fits your desire perfectly! With a deep and full flavored dark roast with smoky\n' +
            '                    overtones, yet delightfully smooth, you\'ll feel like you\'re in a Paris Cafe inside your own kitchen!'},
    {id: 11, name: 'Espresso', roast: 'dark', description: 'Ah, a true classic. The Espresso. One of our darker and richer roasts to date. Want a rich, intense,\n' +
            '                    yet never-bitter coffee? Our signature Espresso Roast is the choice for you. Blended and roasted\n' +
            '                    to perfection to bring our our high profile flavors, a true coffee nut must-have!'},
    {id: 12, name: 'Viennese', roast: 'dark', description: 'Our Viennese roast coffee is a medium-dark roast that has the richness of a dark roast, without the\n' +
            '                    carbon-smoky flavor. Our beans are roasted to a deep dark reddish brown and only slightly oily to perfect\n' +
            '                    the flavor profile.'},
    {id: 13, name: 'Italian', roast: 'dark', description: 'Our second-darkest roast available! Our beans are roasted to an exceptionally oily and dark color.\n' +
            '                    This is not for the faint of heart, packed with a heavy kick and intense flavor, this is only for\n' +
            '                    our most serious of coffee connoisseurs!'},
    {id: 14, name: 'French', roast: 'dark', description: 'The heaviest, and darkest roasted coffee available from our selection. We roast these beans for slightly\n' +
            '                    longer than is standard. Though most frown upon the practice, we have perfected the artform to produce\n' +
            '                    the most packed beans possible! Intense, intense, intense!'},
];

const coffeeCards = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit-search');
const roastSelection = document.querySelector('#roast-selection');
const coffeeSearch = document.querySelector('#coffee-search-bar');
const coffeeAdd = document.querySelector('#coffee-add-bar');
const roastAdd = document.querySelector('#roast-selection-add')
const submitButtonAdd = document.querySelector('#submit-add')
const clearButton = document.querySelector('#clear-coffee')
const coffeeModals = document.querySelector('#coffeeModals')

retrievePreviouslyAddedCoffees(coffees)
organizeCoffees(coffees);
createModals(coffees);


coffeeSearch.addEventListener('keyup', searchByName)
submitButton.addEventListener('click', selectByRoast);
submitButtonAdd.addEventListener('click', addCoffee)
clearButton.addEventListener('click', clearCoffees)
