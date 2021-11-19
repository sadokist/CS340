let addOrderForm = document.getElementById('add-orders-form-ajax');


addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayerId = document.getElementById("input-playerid");
    let inputSkinId = document.getElementById("input-skinid");
    let inputStickerId = document.getElementById("input-stickerid");
    let inputOrderDate = document.getElementById("input-orderdate");
    let inputTotalPrice = document.getElementById("input-totalprice");

    // Get the values from the form fields
    let playerIdValue = inputPlayerId.value;
    let skinIdValue = inputSkinId.value;
    let stickerIdValue = inputStickerId.value;
    let orderDateValue = inputOrderDate.value;
    let totalPriceValue = inputTotalPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        player_id: playerIdValue,
        skin_id: skinIdValue,
        sticker_id: stickerIdValue,
        order_date: orderDateValue,
        total_price: totalPriceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlayerId.value = '';
            inputSkinId.value = '';
            inputStickerId.value = '';
            inputOrderDate.value = '';
            inputTotalPrice.value = '';
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
    let currentTable = document.getElementById("ordertable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let orderIdCell = document.createElement("TD");
    let playerIdCell = document.createElement("TD");
    let skinIdCell = document.createElement("TD");
    let stickerIdCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIdCell.innerText = newRow.order_id;
    playerIdCell.innerText = newRow.player_id;
    skinIdCell.innerText = newRow.skin_id;
    stickerIdCell.innerText = newRow.sticker_id;
    orderDateCell.innerText = newRow.order_date;
    totalPriceCell.innerText = newRow.total_price;

    // Add the cells to the row 
    row.appendChild(orderIdCell);
    row.appendChild(playerIdCell);
    row.appendChild(skinIdCell);
    row.appendChild(stickerIdCell);
    row.appendChild(orderDateCell);
    row.appendChild(totalPriceCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}