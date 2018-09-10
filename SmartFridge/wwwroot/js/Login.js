function SendLoginForm() {
    var fname = $("#loginUsername").val();
    var pswd = $("#password").val();

    var data = {};
    data.Username = fname;
    data.Password = pswd;

    console.log(data);
    
    $.ajax({
        url: "https://localhost:44370/api/Login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (item, textStatus, jqXHR) {
            console.log(item);
            console.log(jqXHR);
            console.log('succes"');
        },
        error: function (jqXHR, exception) {
            console.log('err"');

        }
    });

}