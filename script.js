function initialize() {
    groceryDisplay = document.getElementById("groceries");
    groceryForm = document.getElementById("groceryForm");
    // default grocery list with their quantities of 1
    groceryList = ["Apples", "Potatoes", "Carrots", "Onions", "Tomatoes"];
    dictGroceryList = { "Apples": 1, "Potatoes": 1, "Carrots": 1, "Onions": 1, "Tomatoes": 1 }

    displayDict();
}

function displayDict() {
    // display all the groceries from the list in an order and then have their quantities printed with them but take that value from the dictionary
    listtoput = "";
    for (var i = 0; i < groceryList.length; i++) {
        listtoput += (i + 1) + ": " + groceryList[i] + "(Qty): " + dictGroceryList[groceryList[i]] + "<br/>";
    }
    groceryDisplay.innerHTML = listtoput;
}
function shiftUp() {
    
    numtoshift = groceryForm.fname.value;
    // if the number that we shift is in the valid range, we can swap places of the current and value above it
    if (!(numtoshift <= 1) && !(numtoshift > groceryList.length)) {
        moveOut = groceryList[numtoshift - 2];
        moveIn = groceryList[numtoshift - 1];
        groceryList[numtoshift - 2] = moveIn;
        groceryList[numtoshift - 1] = moveOut;
        document.getElementById("nameGive").value = numtoshift - 1;
        displayDict();
    }
}

function shiftDown() {
    numtoshift = groceryForm.fname.value;
        // if the number that we shift is in the valid range, we can swap places of the current and value below it

    if ((numtoshift > 0) && (numtoshift < groceryList.length)) {

        moveOut = groceryList[numtoshift];
        moveIn = groceryList[numtoshift - 1];
        groceryList[numtoshift - 1] = moveOut;
        groceryList[numtoshift] = moveIn;
        document.getElementById("nameGive").value = (parseInt(numtoshift) + 1);
        displayDict();
    }
}
function addGrocery() {
    groceryAdd = groceryForm.fname.value;
    var pending = groceryAdd.toUpperCase();
    var go = true;
    // by default we can add the grocery
    for (var i = 0; i < groceryList.length; i++) {
        var checkin = groceryList[i].toUpperCase();
        // if the groceery is already in the list we can't go and swap values anymore
        if (checkin == pending) {
            var go = false;
        }
    }
    if (go) {
        groceryList.push(groceryAdd);
        dictGroceryList[groceryAdd] = 1;
    }
    displayDict();
}
function deleteGrocery() {
    groceryDelete = groceryForm.fname.value;
    groceryDelete = groceryList[groceryDelete - 1];
    groceryDelete = groceryDelete.toUpperCase();
    groceryIndex = -5;
    // we never should have the groceryIndex as negative 5 but if the grocery is not in the list, groceryIndex stays -5 and we don't end up deleting a grocery
    for (var i = 0; i < groceryList.length; i++) {
        var check = groceryList[i].toUpperCase();
        if (check == groceryDelete) {
            groceryIndex = i;
        }
    }
    console.log(groceryIndex);
    if (groceryIndex != -5) {
        groceryList.splice(groceryIndex, 1);
    }
    displayDict();
}
function changeQuantity(x) {
    groceryChange = groceryForm.fname.value;
    groceryChange = groceryList[groceryChange - 1];
    groceryChange = groceryChange.toUpperCase();
    whichOne = 0
    // get the index of the grocery that we want to change from within the dictionary
    for (var i = 0; i < Object.keys(dictGroceryList).length; i++) {
        var temp = Object.keys(dictGroceryList)[i];
        var temp = temp.toUpperCase();
        if (temp == groceryChange) { whichOne = Object.keys(dictGroceryList)[i]; }

    }
    // new
    newx = (dictGroceryList)[whichOne] + x
    if (!(newx < 0)){
        (dictGroceryList)[whichOne] += x;
    }

    displayDict();

}

function toggleQuantity(run) {

    shiftUpButton = document.getElementById("shiftUpX");
    shiftDownButton = document.getElementById("shiftDownX");
    changeQuantx = groceryForm.nName.value;
    positiveQuan = "changeQuantity("+changeQuantx+");";
    negativeQuan = "changeQuantity("+(changeQuantx*-1)+");";
    if(run){
        shiftUpButton.setAttribute("onclick", positiveQuan);
        shiftDownButton.setAttribute("onclick", negativeQuan);
        shiftUpButton.innerHTML = "Add " +changeQuantx+" to Quantity";
        shiftDownButton.innerHTML = "Subtract " +changeQuantx+" Quantity";
    }
    else if (shiftUpButton.getAttribute("onclick") == "shiftUp();") {
        console.log("shiftup was shiftUp");
        shiftUpButton.setAttribute("onclick", positiveQuan);
        shiftDownButton.setAttribute("onclick", negativeQuan);
        shiftUpButton.innerHTML = "Add " +changeQuantx+" to Quantity";
        shiftDownButton.innerHTML = "Subtract " +changeQuantx+" Quantity";
    } else {
        shiftUpButton.setAttribute("onclick", "shiftUp();");
        shiftDownButton.setAttribute("onclick", "shiftDown();");

        shiftUpButton.innerHTML = "Shift Up";
        shiftDownButton.innerHTML = "Shift Down";
    }
}

