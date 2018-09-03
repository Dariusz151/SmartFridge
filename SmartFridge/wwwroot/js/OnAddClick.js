function OnAddClick() {

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

        },
        error: function (jqXHR, exception) {

        }
    });
    LoadData();
}