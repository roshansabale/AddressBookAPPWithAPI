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
});