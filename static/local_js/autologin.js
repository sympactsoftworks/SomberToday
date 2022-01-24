function get_cookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const get_token = () => {
    const token = get_cookie("token");
    const email = get_cookie('email');
    const url = window.location.href;
    const location = url.substring(0, url.lastIndexOf('/') + 1) + 'api/v1/util/checktoken';
    const data = {
        token: token,
        email: email
    }
    const processed_data = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', location, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(processed_data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response == true) {
                alert("Good token");
            } else {
                alert("Wrong token");
            }
        }
    }
}

window.onload = get_token;