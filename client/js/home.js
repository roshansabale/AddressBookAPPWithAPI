let registerDataObject = {};
let userDataObject = {};
window.addEventListener('DOMContentLoaded', (event) => {
    //event.preventDefault();
    const fname = document.querySelector('#firstname');
    const textError = document.querySelector('.text-error');
    fname.addEventListener('input', function() {
        try {
            if (fname.value.length == 0) {
                textError.textContent = "";
                return;
            }

            console.log(fname.value);
            (new AddressBook()).firstname = fname.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const lname = document.querySelector('#lastname');
    lname.addEventListener('input', function() {
        try {
            if (lname.value.length == 0) {
                textError.textContent = "";
                return;
            }
            console.log(lname.value);
            (new AddressBook()).lastname = lname.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const password = document.querySelector('#password');
    password.addEventListener('input', function() {
        try {
            if (password.value.length == 0) {
                textError.textContent = "";
                return;
            }
            console.log(password.value);
            (new AddressBook()).password = password.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
});

const save = (event) => {
    try {
        event.preventDefault();
        event.stopPropagation();
        console.log("From save method");
        setRegisterDataObjectect();
        registerUser();
    } catch (e) {
        return;
    }
}

const setRegisterDataObjectect = () => {
    registerDataObject.firstName = getInputValueById('#firstname');
    registerDataObject.lastName = getInputValueById('#lastname');
    registerDataObject.email = getInputValueById('#email');
    registerDataObject.password = getInputValueById('#password');
    registerDataObject.address = getInputValueById('#address');
    registerDataObject.city = document.querySelector('#city').value;
    registerDataObject.zipCode = getInputValueById('#zipcode');
    registerDataObject.state = getInputValueById('#state');
    registerDataObject.phone = getInputValueById('#phone');
    registerDataObject.acceptStatus = getInputValueById('#acceptStatus');
    // userDataObject = JSON.stringify(registerDataObject);
    console.log("From Setregister method " + JSON.stringify(registerDataObject));
    console.log("RegisterObjectData " + registerDataObject.name);
}

const registerUser = () => {

    let postUrl = siteProperties.registerUser_URL;
    // let postUrl1 = "http://localhost:3000/add"
    let methodcall = "POST";

    console.log("RegisterDataObject" + registerDataObject);
    makeServiceCall(methodcall, postUrl, true, registerDataObject)
        .then(responseText => {
            alert(JSON.parse(responseText).message);
            console.log("Response text:" + responseText);
            resetForm();
            window.location.replace(siteProperties.login_Page);
        })
        .catch(error => {
            throw error;
        });
}