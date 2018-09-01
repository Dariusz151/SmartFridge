var urlAddress = "https://localhost:44370/api/SmartFridge";

$(document).ready(function () {
    LoadData();
});



function LoadData() {

    $.ajax({
        url: urlAddress,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (fridge) {
            FillTable(fridge);
            //console.log('succes');
        },
        error: function (request, message, error) {
            //console.log('error');
            handleException(request, message, error);
        }
    });
}

function FillTable(fridge) {
    //$("#tableProvision tbody").remove();

    $.each(fridge, function (index, item) {
        console.log("Dostalem item: " + item + " o id: " + item.id);
        console.log("Ten item to: " + item.articleName);
        AddFridgeItemToTable(item);
        //provisionAddRow(item);
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

    $("#row" + item.id).append("<div class='col col_validDate'></div>");
    $("#row" + item.id + " .col_validDate").html(item.expirationDate);

    $("#row" + item.id).append("<div class='col col_functions'></div>");
    $("#row" + item.id + " .col_functions").html("<div class=form-check'><input class='form-check-input position-static' type='checkbox' id='blankCheckbox' value='option1' aria-label='aria'></div>");
}

function OnAddClick() {
    $(".addNewForm").append("div class='form'></div>");
}


//function provisionAddRow(item) {
//    if ($("#tableProvision tbody").length == 0) {
//        $("#tableProvision").append("<tbody></tbody>");
//    }
//    $("#tableProvision tbody").append(
//        provisionBuildTableRow(item));
//}

//function provisionBuildTableRow(item) {

//    var newRow = "<tr>" +
//        "<td><input   class='form-control input-tag' type='text' value='" + item.tagName + "'/></td>" +
//        "<td><input   class='form-control input-checkpoint' type='text' value='" + item.checkPointTime + "'/></td>" +
//        "<td><input   class='form-control input-threshold' type='text' value='" + item.thresholdValue + "'/></td>" +
//        "<td><input  class='form-control input-direction'  type='text' value='" + item.direction + "'/></td>" +
//        "<td><input  class='form-control input-recipients' type='text' value='" + item.recipients + "'/></td>" +
//        "<td><input  class='form-control input-text' type='text' value='" + item.text + "'/></td>" +
//        "<td>" +
//        "<button type='button' " +
//        "onclick='UpdateElement(this);' " +
//        "class='btn btn-primary btn_edit' " +
//        "data-id='" + item.id + "' " +
//        "data-tag='" + item.tagName + "' " +
//        "data-checkpoint='" + item.checkPointTime + "' " +
//        "data-threshold='" + item.thresholdValue + "' " +
//        "data-direction='" + item.direction + "' " +
//        "data-recipients='" + item.recipients + "' " +
//        "data-text='" + item.text + "' " +
//        ">" +
//        "<span class='glyphicon glyphicon-edit' /> Update" +
//        "</button> " +
//        " <button type='button' " +
//        "onclick='DeleteElement(this);'" +
//        "class='btn btn-danger btn_edit' " +
//        "data-id='" + item.id + "'>" +
//        "<span class='glyphicon glyphicon-remove' />Delete" +
//        "</button>" +
//        "</td>" +
//        "</tr>";

//    return newRow;
//}

//function DeleteElement(item) {
//    var id = $(item).data("id");

//    var result = confirm("Want to delete?");
//    if (result) {

//        $.ajax({
//            url: "http://localhost:57066/api/Provision/" + id,
//            type: "DELETE",
//            contentType: "application/json",
//            success: function () {
//                //console.log("Usunieto wiersz o id: " + id);

//                LoadData();
//                $("#msg").css("color", "red");
//                $("#msg").text("Usunieto wiersz.");
//                setTimeout(function () { $("#msg").text(""); }, 3000);

//            },
//            error: function () {
//                console.log("Nie udalo sie usunac wiersza");
//            }
//        });
//    }
//}

//function onAddEmployee(item) {
//    var url = "http://localhost:57066/api/Provision";
//    var data = {};
//    data.tagName = $("#tagAdd").val();
//    data.checkPointTime = $("#checkpointAdd").val();
//    data.thresholdValue = $("#thresholdAdd").val();
//    data.direction = $("#directionAdd").val();
//    data.recipients = $("#recipientsAdd").val();
//    data.text = $("#textAdd").val();

//    $.ajax({
//        url: url,
//        dataType: "json",
//        type: "POST",
//        contentType: "application/json",
//        data: JSON.stringify(data),
//        success: function (item, textStatus, jqXHR) {
//            //console.log("Ttem: " + item)
//            //console.log("TextStatus: " + textStatus);
//            //console.log("jqXHR: " + jqXHR);
//            var createdId = item;
//            data.Id = item;
//            provisionAddRow(data);
//            $("#msg").css("color", "green");
//            $("#msg").text("Dodano wiersz.");
//            setTimeout(function () { $("#msg").text(""); }, 3000);

//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.log("error jqxhr: " + jqXHR);
//            console.log("error textStatus: " + textStatus);
//            console.log("errorThrown: " + errorThrown);
//        }
//    });
//}

//function UpdateElement(item) {

//    var id = $(item).data("id");
//    var data = {};
//    var url = "http://localhost:57066/api/Provision/";

//    data.id = $(item).data("id");
//    data.TagName = $(".input-tag", $(item).parent().parent()).val();
//    data.CheckPointTime = $(".input-checkpoint", $(item).parent().parent()).val();
//    data.ThresholdValue = $(".input-threshold", $(item).parent().parent()).val();
//    data.Direction = $(".input-direction", $(item).parent().parent()).val();
//    data.Recipients = $(".input-recipients", $(item).parent().parent()).val();
//    data.Text = $(".input-text", $(item).parent().parent()).val();

//    //console.log("Jestem w UpdateElement, Item id to: " + data.id);

//    $.ajax({
//        url: url,
//        dataType: 'json',
//        type: 'put',
//        contentType: 'application/json',
//        data: JSON.stringify(data),
//        success: function (data, textStatus, jqXHR) {
//            //console.log("Data: " + data)
//            //console.log("TextStatus: " + textStatus);
//            //console.log("jqXHR: " + jqXHR);
//            $("#msg").css("color", "green");
//            $("#msg").text("Aktualizowano wiersz.");
//            setTimeout(function () { $("#msg").text(""); }, 3000);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.log("error jqxhr: " + jqXHR);
//            console.log("error textStatus: " + textStatus);
//            console.log("errorThrown: " + errorThrown);
//        }
//    });
//}


function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
}