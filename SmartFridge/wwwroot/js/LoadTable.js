﻿var urlAddress = "https://localhost:44370/api/SmartFridge";
var articles_id = [];

function LoadData() {
    $.ajax({
        url: urlAddress,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (fridge) {
            articles_id = SaveArticlesId(fridge);
            FillTable(fridge, articles_id);
        },
        error: function (request, message, error) {
            console.log("error: " + message);
        }
    });
}

function SaveArticlesId(fridge)
{
    var tmp = [];
    $.each(fridge, function (index, item) {
        tmp[index] = item.id;
    });
    return tmp;
}

function FillTable(fridge, articles_id) {
    $("#cont_tableBody").children().remove();
    
    $.each(fridge, function (index, item) {
        AddFridgeItemToTable(index, item);
    });
}

function AddFridgeItemToTable(index, item) {
    $("#cont_tableBody").append("<div class='row' id='row" + index + "'></div>");
    
    $("#row" + index).append("<div class='col col_articleName'></div>");
    $("#row" + index + " .col_articleName").html(item.articleName);

    $("#row" + index).append("<div class='col col_quantity'></div>");
    $("#row" + index + " .col_quantity").html(item.quantity);

    $("#row" + index).append("<div class='col col_weight'></div>");
    $("#row" + index + " .col_weight").html(item.weight);

    $("#row" + index).append("<div class='col-lg-1 col_functions'></div>");
    $("#row" + index + " .col_functions").html("<input class='form-check-input position-static' type='checkbox' id='checkbox" + index +"' value='option1' aria-label='aria'>");
}

LoadData();