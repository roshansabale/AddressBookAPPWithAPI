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
    const passwordError = document.querySelector('.text-password');
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

    const email = document.querySelector('#email');
    const emailError = document.querySelector('.email-error');
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

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        try {
            if (address.value.length == 0) {
                addressError.textContent = "";
                return;
            }
            console.log(address.value);
            (new AddressBook()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    const zipcode = document.querySelector('#zipcode');
    const zipError = document.querySelector('.zip-error');
    zipcode.addEventListener('input', function() {
        try {
            if (zipcode.value.length == 0) {
                zipError.textContent = "";
                return;
            }
            console.log(zipcode.value);
            (new AddressBook()).zipcode = zipcode.value;
            zipError.textContent = "";
        } catch (e) {
            zipError.textContent = e;
        }
    });

    const state = document.querySelector('#state');
    const stateError = document.querySelector('.state-error');
    state.addEventListener('input', function() {
        try {
            if (state.value.length == 0) {
                stateError.textContent = "";
                return;
            }
            console.log(state.value);
            (new AddressBook()).state = state.value;
            stateError.textContent = "";
        } catch (e) {
            stateError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function() {
        try {
            if (phone.value.length == 0) {
                phoneError.textContent = "";
                return;
            }
            console.log(phone.value);
            (new AddressBook()).phone = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
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
