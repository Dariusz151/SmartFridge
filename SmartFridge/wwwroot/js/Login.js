﻿var articlesTable = [];

function SendLoginForm() {
    var login = $("#login_login").val();
    var pswd = $("#login_password").val();
    console.log("siema222");
    var data = {};
    data.Login = login;
    data.Password = pswd;
    
    $.ajax({
        url: "https://localhost:44370/api/Login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (item) {
             /*
             * 
             * PRZELACZENIE NA TABELE PO ZALOGOWANIU
             * 
             * */
            localStorage.setItem("userID", item);
            window.location.replace("https://localhost:44370/static/index.html");

            //LoadTableByUser(item);
            /*
             * 
             * DODAC OBSLUGE POWODZENIA LOGOWANIA
             * 
             * */

        },
        error: function (jqXHR, exception) {
              /*
             * 
             * DODAC OBSLUGE NIEPOWODZENIA LOGOWANIA
             * 
             * */
        }
    });
}

function LoadTableByUser(userID) {
    var urlAddress = "https://localhost:44370/api/SmartFridge";
    $.ajax({
        url: urlAddress + "/" + userID,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (fridge) {
            //console.log(fridge);
            SaveArticles(fridge);
            FillTable(fridge);
        },
        error: function (request, message, error) {
            console.log("error: " + message);
        }
    });
}

function SaveArticles(fridge) {
    $.each(fridge, function (index, item) {
        articlesTable[index] = item;
    });
    //console.log("Articles: ");
    //console.log(articlesTable);
}

function FillTable(fridge) {
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
    $("#row" + index + " .col_functions").html("<input class='form-check-input position-static' type='checkbox' id='checkbox" + index + "' value='option1' aria-label='aria'>");
}