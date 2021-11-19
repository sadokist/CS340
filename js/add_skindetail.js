let addSkinForm = document.getElementById('add-skindetails-form-ajax');

// Modify the objects we need
addSkinForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSkinName = document.getElementById("input-skinname");
    let inputSkinPrice = document.getElementById("input-skinprice");

    // Get the values from the form fields
    let skinNameValue = inputSkinName.value;
    let skinPriceValue = inputSkinPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        skin_name: skinNameValue,
        skin_price: skinPriceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-skindetail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSkinName.value = '';
            inputGunId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("skindetailtable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let skinNameCell = document.createElement("TD");
    let skinPriceCell = document.createElement("TD");

    // Fill the cells with correct data
    skinNameCell.innerText = newRow.skin_name;
    skinPriceCell.innerText = newRow.skin_price;

    // Add the cells to the row 
    row.appendChild(skinNameCell);
    row.appendChild(skinPriceCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}