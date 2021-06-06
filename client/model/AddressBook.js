class AddressBook {
    id;

    get firstname() { return this._firstname; }
    set firstname(firstname) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{3,}$');
        if (nameRegex.test(firstname))
            this._firstname = firstname;
        else throw 'First Name is incorrect!!'
    }

    get lastname() { return this._lastname; }
    set lastname(lastname) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{3,}$');
        if (nameRegex.test(lastname))
            this._lastname = lastname;
        else throw 'Last Name is incorrect!!'
    }

    get password() { return this._password; }
    set password(password) {
        let nameRegex = RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');
        if (nameRegex.test(password))
            this._password = password;
        else throw 'Password is incorrect!!'
    }

    get email() { return this._email; }
    set email(email) {
        let nameRegex = RegExp("[a-z]{1}(.+)@([a-z0-9]{1,15})(.?([a-z]{2,}))+(.?(([a-z]{2,})*))$");
        if (nameRegex.test(email))
            this._email = email;
        else throw 'Email is incorrect!!'
    }

    get address() { return this._address; }
    set address(address) {
        let nameRegex = RegExp('^[a-zA-Z]{3,}$');
        if (nameRegex.test(address))
            this._address = address;
        else throw 'Address is incorrect!!'
    }

    get state() { return this._state; }
    set state(state) {
        let nameRegex = RegExp('^[a-zA-Z]{3,}$');
        if (nameRegex.test(state))
            this._state = state;
        else throw 'State is incorrect!!'
    }

    get city() { return this._city; }
    set city(city) {
        let nameRegex = RegExp('^[a-zA-Z]{3,}$');
        if (nameRegex.test(city))
            this._city = city;
        else throw 'State is incorrect!!'
    }

    get zipcode() { return this._zipcode; }
    set zipcode(zipcode) {
        let nameRegex = RegExp('^[0-9]{3}[ ]?[0-9]{3}$');
        if (nameRegex.test(zipcode))
            this._zipcode = zipcode;
        else throw 'zipcode is incorrect!!'
    }

    get phone() { return this._phone; }
    set phone(phone) {
        let nameRegex = RegExp("[789]{1}[0-9]{9}$");
        if (nameRegex.test(phone))
            this._phone = phone;
        else throw 'phone is incorrect!!'
    }

}