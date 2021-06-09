let listOfPersons = {};
let personObject = {};
let personsList = {};
let personid;
function preventBack() { window.history.forward(); }  
window.addEventListener('DOMContentLoaded', (event) => {
    getAllPersons();
    
    setTimeout("preventBack()", 0);  
    window.onunload = function () { null };  
});

const addPerson = (event) => {
    event.preventDefault();
    event.stopPropagation();
    personObject.name = getInputValueById('#name');
    personObject.address = getInputValueById('#address');
    personObject.email = getInputValueById('#email');
    personObject.phone = getInputValueById('#phone');
    personObject.city = document.querySelector('#city').value;
    personObject.zipcode = getInputValueById('#zipcode');
    personObject.state = getInputValueById('#state');
    personObject.userId = getuserIDFromStorage();
    registerPerson();
    alert(personObject);
   window.location.replace(siteProperties.dashboard_Page);
}

const editPerson = (event) => {
    // event.preventDefault();
    console.log("From edit person");
    console.log("PersonID:" + personid);

    let updatedPerson = {};
    // let personid = getSelectedPersonId();
    updatedPerson.name = getInputValueById('#editname');
    updatedPerson.address = getInputValueById('#editaddress');
    updatedPerson.email = getInputValueById('#editemail');
    updatedPerson.phone = getInputValueById('#editphone');
    updatedPerson.city = document.querySelector('#editcity').value;
    updatedPerson.zipcode = getInputValueById('#editzipcode');
    updatedPerson.state = getInputValueById('#editstate');
    updatedPerson.userId = getuserIDFromStorage();

    let postUrl = siteProperties.updatePerson_URL;
    // let postUrl1 = "http://localhost:3000/add"
    let methodcall = "PUT";

    postUrl = postUrl + personid;
    console.log("UpdateURL:" + postUrl);
    console.log("RegisterDataObject" + updatedPerson);
    makeServiceCall(methodcall, postUrl, true, updatedPerson)
        .then(responseText => {
            alert(JSON.parse(responseText).message);
            console.log("Response text:" + responseText);

        })
        .catch(error => {
            throw error;
        });


}

const getAllPersons = () => {
    let url = siteProperties.getAllPerson_URL;
    let methodCall = "GET";
    let data = {};
    makeServiceCall(methodCall, url, true)
        .then((responseText) => {

            console.log(responseText);
            localStorage.setItem('listofpersons', responseText);
            //  listOfPersons = responseText;
            listOfPersons = JSON.parse(responseText);
            personsList = JSON.parse(responseText);
            createInnerHtml();
        })
        .catch((error) => {
            throw error;
        })
}

const createInnerHtml = () => {
    let innerhtml;
    listOfPersons.data.reverse();
    //  persons.reverse();
    console.log("Persons list :" + JSON.stringify(listOfPersons.data));

    for (const personData of listOfPersons.data) {
        let fetch = document.querySelector('#table-display').innerHTML;
        // <div id="${personData._id}" onclick="myFunction(this)" class="card">
        // <p><b>ID:</b> ${personData._id}</p>  //<p><b>Last Updated:</b> ${personData.updatedAt} </p>
        innerhtml = ` 
        <div class="card">
        <p id="p_header"><b>ID:</b> ${personData._id}</p> 
        <p><b>Hello</b> ${personData.name}</p>
        <p><b>Email:</b> ${personData.email}</p>
        <p><b>Phone:</b> ${personData.phone}</p>
        <div class="buttonalign">
        <div id="${personData._id}" onclick="myFunction(this)" >
        <b><a data-toggle="modal" href="#editModal">Edit</a></b>
        </div>
        <div id="${personData.email}" onclick="myFunction1(this)" >
        <b><a href="#">Delete</a></b>
        </div>
        </div>
        </div>` + fetch;
        document.querySelector('#table-display').innerHTML = innerhtml;
    }
}

const registerPerson = () => {

    let postUrl = siteProperties.addPerson_URL;
    // let postUrl1 = "http://localhost:3000/add"
    let methodcall = "POST";

    console.log("RegisterDataObject" + personObject);
    makeServiceCall(methodcall, postUrl, true, personObject)
        .then(responseText => {
            alert(JSON.parse(responseText).message);
            console.log("Response text:" + responseText);
        })
        .catch(error => {
            throw error;
        });
}

const myFunction = (data) => {
    alert("Id clicked!!" + data.id);
    let persons = personsList.data;
    console.log("Persons Data from myd=fucntion:" + JSON.stringify(personsList.data));


    let bigCities = persons.find(function(e) {
        return e._id == data.id;
    });

    console.log("UpdatedData from myfucntion" + "Finded person" + JSON.stringify(bigCities));
    setForm(bigCities);
    getSelectedPersonId(bigCities);
}

const setForm = (data) => {
    console.log("Data from setformm " + JSON.stringify(data));
    setValue('#editname', data.name);
    setValue('#editaddress', data.address);
    setValue('#editemail', data.email);
    setValue('#editphone', data.phone);
    setValue('#editcity', data.city);
    setValue('#editzipcode', data.zipcode);
    setValue('#editstate', data.state);
    console.log(data.name)
}

const getSelectedPersonId = (data) => {
    console.log(data.name);
    personid = data._id;
}

const myFunction1 = (data) => {
    alert("Id clicked!!" + data.id);
    console.log("dataFrom myfunction1" + data.id)
    deletePerson(data.id);
}

const deletePerson = (id) => {
    let postUrl = siteProperties.deletePerson_URL;
    let methodcall = "DELETE";
    postUrl = postUrl + id;
    console.log("UpdateURL:" + postUrl);

    makeServiceCall(methodcall, postUrl, true)
        .then(responseText => {
            alert(JSON.parse(responseText).message);
            console.log("Response text:" + responseText);
            window.location.replace(siteProperties.dashboard_Page);
        })
        .catch(error => {
            throw error;
        });
}

const logout = (event) => {
    localStorage.clear();
    function preventBack() { window.history.forward(); }  
    setTimeout("preventBack()", 0);  
    window.onunload = function () { null };  
    window.location.replace(siteProperties.login_Page);

}