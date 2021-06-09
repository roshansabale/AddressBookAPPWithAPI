let loginObject = {};
let responseData = {};

function preventBack() { window.history.forward(); }  

window.addEventListener('DOMContentLoaded', (event) => {

    setTimeout("preventBack()", 0);  
    window.onunload = function () { null };  
    // event.preventDefault();
    const email = document.querySelector('#email');
    const emailError = document.querySelector('.text-error');
    email.addEventListener('input', function() {
        try {
            if (email.value.length == 0) {
                emailError.textContent = "";
                return;
            }

            console.log(email.value);
            (new AddressBook()).email = email.value;
            emailError.textContent = "";
        } catch (e) {
            emailError.textContent = e;
        }
    });

    const password = document.querySelector('#password');
    const passwordError = document.querySelector('.password-error');
    password.addEventListener('input', function() {
        try {
            if (password.value.length == 0) {
                passwordError.textContent = "";
                return;
            }
            console.log(password.value);
            (new AddressBook()).password = password.value;
            passwordError.textContent = "";
        } catch (e) {
            passwordError.textContent = e;
        }
    });
});
const login = (event) => {
    event.preventDefault();
    event.stopPropagation();
    loginObject.email = getInputValueById('#email');
    loginObject.password = getInputValueById('#password');
    makeLogin();
}

const makeLogin = () => {
    let url = siteProperties.login_URL;
    let methodCall = "POST";
    console.log("LoginObject from call",loginObject);
    makeServiceCall(methodCall, url, true, loginObject)
        .then((responseText) => {
            responseData = responseText;
            console.log("ResponseTextData" + JSON.parse(responseData).response.userID + "Toekn of User" + JSON.parse(responseData).response.token);
            setResponseInStorage(responseData);
            // localStorage.setItem('ResponseData', responseData);
            let userDetails = localStorage.getItem('ResponseData');
            console.log("UserID logined" + JSON.parse(userDetails).response.userID);
            console.log("ResponseText" + responseText);
            alert(JSON.parse(responseText).message);
            window.location.replace(siteProperties.dashboard_Page);
        })
        .catch((error) => {
            console.log("Error",error);
            throw error;
        })
}