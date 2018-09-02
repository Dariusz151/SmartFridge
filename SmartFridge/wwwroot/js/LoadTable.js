var urlAddress = "https://localhost:44370/api/SmartFridge";

function LoadData() {
    $.ajax({
        url: urlAddress,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (fridge) {
            FillTable(fridge);
        },
        error: function (request, message, error) {
            console.log("error: " + message);
        }
    });
}

function FillTable(fridge) {
    //$("#cont_tableBody").remove();
    $.each(fridge, function (index, item) {
        AddFridgeItemToTable(item);
    });
}

function AddFridgeItemToTable(item) {
    $("#cont_tableBody").append("<div class='row' id='row" + item.id + "'></div>");

    $("#row" + item.id).append("<div class='col col_articleName'></div>");
    $("#row" + item.id + " .col_articleName").html(item.articleName);

    $("#row" + item.id).append("<div class='col col_quantity'></div>");
    $("#row" + item.id + " .col_quantity").html(item.quantity);

    $("#row" + item.id).append("<div class='col col_weight'></div>");
    $("#row" + item.id + " .col_weight").html(item.weight);
    
    $("#row" + item.id).append("<div class='col col_functions'></div>");
    $("#row" + item.id + " .col_functions").html("<div class=form-check'><input class='form-check-input position-static' type='checkbox' id='blankCheckbox' value='option1' aria-label='aria'></div>");
}

LoadData();