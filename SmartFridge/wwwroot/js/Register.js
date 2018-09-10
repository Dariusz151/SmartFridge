

function SendRegisterForm() {
    var fname = $("#registerUsername").val();
    var pswd = $("#password").val();

    var data = {};
    data.Username = fname;
    data.Password = pswd;
    
    $.ajax({
        url: "https://localhost:44370/api/Register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (item, textStatus, jqXHR) {
            console.log('succes"');
        },
        error: function (jqXHR, exception) {
            console.log('err"');

        }
    });

}