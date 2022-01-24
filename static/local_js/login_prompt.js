const submit_button = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var email = document.getElementById('email');

const login = () => {
    const location = window.location.href;
    const url = location.substring(0, location.lastIndexOf('/') + 1) + 'api/v1/users/login';
    const data = {
        username: username.value,
        password: password.value,
        email: email.value
    }
    const processed_data = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(processed_data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response == true) {
                document.cookie = "token=12345";
                document.cookie = "email=" + email.value;
            } else {
                alert("Wrong username or password");
            }
        }
    }
}

submit_button.onclick = login;