let userDetails;

function makeServiceCall(methodType, url, async, data =null) {
    console.log("Data Is:" + data);
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("XHR:",xhr);
           if (xhr.readyState >= 0 || xhr.status === 200) {
               
                if (xhr.status === 200 || xhr.status === 201) {
                    let abc = JSON.stringify(xhr.responseText);
                    setTimeout(() => {
                        resolve(xhr.responseText);
                    }, 500);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
           }
        }
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };

        xhr.open(methodType, url, async);
        if (data != null) {
            if( localStorage.getItem('ResponseData') != null) {
            let token = getuserTokenFromStorage();
            console.log("Token"+token);
            xhr.setRequestHeader('token', token);
            }
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
            console.log("From if condition" + JSON.stringify(data));
        } else {
       
            let userId = getuserIDFromStorage();
            let token = getuserTokenFromStorage();
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('token', token);
            xhr.setRequestHeader('userid', userId);
            console.log(userId + "UserID and Token " + token)
            alert('UserID' + userId + token)
            xhr.send();
            //}
        }
    });
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    console.log("value from get input value" + value);
    return value;

}

const resetForm = () => {
    setValue('#firstname', '');
    setValue('#lastname', '');
    setValue('#password', '');
    setValue('#email', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#zipcode', '');
    setValue('#state', '');
    setValue('#phone', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setResponseInStorage = (responseData) => {
    console.log("Response Saved!!" + responseData);
    localStorage.setItem('ResponseData', responseData);
}

const getuserIDFromStorage = () => {
    userDetails = localStorage.getItem('ResponseData');
    let userID = JSON.parse(userDetails).response.userID;
    console.log("User id from local storage method" + userID);
    return userID;
}

const getuserTokenFromStorage = () => {
    userDetails = localStorage.getItem('ResponseData');
    console.log("UserDetails",userDetails);
    let usertoken = JSON.parse(userDetails).response.token;
    console.log("User id from local storage method" + usertoken);
    return usertoken;

}