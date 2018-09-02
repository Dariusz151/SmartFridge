var urlAddress = "https://localhost:44370/api/SmartFridge";

function OnAddClick() {
    //$(".addNewForm").append("div class='form'></div>");

    var data = {};
    data.ArticleName = $("#articleNameInput").val();
    data.Quantity = $("#quantityInput").val();
    data.Weight = $("#weightInput").val();

    $.ajax({
        url: urlAddress,
        dataType: "text",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (item, textStatus, jqXHR) {
            alert('succes');
            LoadData();
        },
        error: function (jqXHR, exception) {
            alert('serror');
            LoadData();
        }
    });
}