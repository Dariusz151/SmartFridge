function OnAddClick() {
    var userID = localStorage.getItem("userID");

    var ulrAdress = "https://localhost:44370/api/SmartFridge";

    var data = {};
    data.ArticleName = $("#articleNameInput").val();
    data.Quantity = $("#quantityInput").val();
    data.Weight = $("#weightInput").val();
    data.userID = userID;

    console.log(data);

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
    //LoadData();
}