let addPlayerForm = document.getElementById('add-players-form-ajax');


addPlayerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input-username");
    let inputFirstName = document.getElementById("input-firstname");
    let inputLastName = document.getElementById("input-lastname");
    let inputEmail = document.getElementById("input-email");

    // Get the values from the form fields
    let usernameValue = inputUsername.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: usernameValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
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
    let currentTable = document.getElementById("playertable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let playerIdCell = document.createElement("TD");
    let usernameCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    // Fill the cells with correct data
    playerIdCell.innerText = newRow.player_id;
    usernameCell.innerText = newRow.username;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    emailCell.innerText = newRow.email;

    // Add the cells to the row 
    row.appendChild(playerIdCell);
    row.appendChild(usernameCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}