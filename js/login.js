function login(){
    var user, password

    user = document.getElementById("user").value
    password = document.getElementById("password").value

    if(user == "jose" && password == "1234"){
        window.location="inicio2.html"
    }
    else alert("credenciales invalidas")
}