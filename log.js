function viewlogin() {
    var x = document.getElementById("signup");
    var y = document.getElementById("login");
    //console.log(x);
    x.style.display = "none";
    y.style.display = "block";
  }
  
  function viewsignup() {
    var y = document.getElementById("signup");
    var x = document.getElementById("login");
    y.style.display = "block";
    x.style.display = "none";

  }

  async function fetchJson()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    let result = await fetch("http://192.168.100.162:3000/auth/login",{
        method : "post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({"username":username,"password":password})
    });
    let body = await result.json();
    console.log(body);
    if(body['isSuccess'])
    {
      localStorage.setItem('flag',body['isSuccess']);
      localStorage.setItem('note',body['responseBody']['token']);
      window.location="first.html"
    }
    else{
      alert(body['responseBody']['errorMessage']);
    }    
}

async function register()
{
  var username = document.getElementById("user").value;
  var password = document.getElementById("pass").value;
  console.log(username, password);
  let result = await fetch("http://192.168.100.162:3000/auth/register",{
        method : "post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({"username":username,"password":password})
    });
    let body = await result.json();
    console.log(body);

    localStorage.setItem('note',body['responseBody']['token']);
}

