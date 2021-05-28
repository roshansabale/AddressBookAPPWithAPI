let loginObject = {};
let responseData = {};
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
    console.log("LoginObject from call" + loginObject);
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
            throw error;
        })
}