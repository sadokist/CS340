let addSkinForm = document.getElementById('add-skins-form-ajax');

// Modify the objects we need
addSkinForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSkinName = document.getElementById("input-skinname");
    let inputGunId = document.getElementById("input-gunid");

    // Get the values from the form fields
    let skinNameValue = inputSkinName.value;
    let gunIdValue = inputGunId.value;

    // Put our data we want to send in a javascript object
    let data = {
        skin_name: skinNameValue,
        gun_id: gunIdValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-skin-ajax", true);
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
    let currentTable = document.getElementById("skintable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let skinIdCell = document.createElement("TD");
    let skinNameCell = document.createElement("TD");
    let gunIdCell = document.createElement("TD");

    // Fill the cells with correct data
    skinIdCell.innerText = newRow.skin_id;
    skinNameCell.innerText = newRow.skin_name;
    gunIdCell.innerText = newRow.gun_id;

    // Add the cells to the row 
    row.appendChild(skinIdCell);
    row.appendChild(skinNameCell);
    row.appendChild(gunIdCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}