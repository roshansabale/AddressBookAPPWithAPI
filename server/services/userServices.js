const { request, response } = require("express");
const model = require("../models/userModel");
// const person = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.userRegistration = (request, callback) => {
    try {
        // const salt = bcrypt.genSalt(10);


        model.userModel.findOne({ "email": request.body.email }, (error, user) => {
            if (user)
                callback("Email already exist!!");
            else {
                let userDetails;

                bcrypt.hash(request.body.password, 10, (error, encrypted) => {
                    console.log("Encrypted pwd:" + encrypted);
                    userDetails = new model.userModel({
                        "firstName": request.body.firstName,
                        "lastName": request.body.lastName,
                        "email": request.body.email,
                        "password": encrypted,
                        "address": request.body.address,
                        "state": request.body.state,
                        "city": request.body.city,
                        "phone": request.body.phone,
                        "zipCode": request.body.zipCode,
                        "acceptStatus": request.body.acceptStatus,
                    })

                    userDetails.save()
                        .then(user => {
                            callback(null, user);
                        })
                        .catch(err => {
                            callback(err);
                        })
                });
            }
        })
    } catch (err) {
        callback(err);
    }
}

exports.loginUser = (request, callback) => {
    let response = {};
    model.userModel.findOne({ "email": request.body.email }, (error, user) => {
        if (user) {
            const validatePwd = bcrypt.compare(request.body.password, user.password, (error, encrypted) => {
                if (!encrypted) {
                    response = { message: "Password not matched!!" };
                    callback(response);
                } else {
                    const token = jwt.sign({
                        email: request.body.email,
                        userID: request.body._id
                    }, 'secret', { expiresIn: "6000s" });

                    console.log("Token" + token);
                    response.firstName = user.firstName;
                    response.lastName = user.lastName;
                    response.userID = user._id;
                    response.email = request.body.email;
                    response.token = token;
                    callback(null, response);
                }
            })
        } else {
            response = { message: "User not found!!" };
            callback(response);
        }
    });
}

exports.addContact = (request, callback) => {
    let response = {};
    model.personModel.findOne({ "email": request.body.email }, (error, contact) => {
        if (contact) {
            response = { message: "Email Already exist!!" };
            callback(response);
        } else {

            let contactDetails;
            contactDetails = new model.personModel({
                "name": request.body.name,
                "email": request.body.email,
                "phone": request.body.phone,
                "address": request.body.address,
                "state": request.body.state,
                "city": request.body.city,
                "zipCode": request.body.zipCode,
                "userId": request.body.userId
            })
            contactDetails.save()
                .then(contact => {
                    callback(null, contact);
                })
                .catch(error => {
                    callback(error);
                })
        }
    })

}

exports.getContacts = (request, callback) => {
    let id = request.headers['userid'];
    console.log("id" + id);
    let contacts = [];
    model.personModel.find({ userId: id }, (error, data) => {
        if (error) {
            callback(error);
        } else {
            // contacts.push(data);
            // console.log(data[0].userId);
            callback(null, data);
        }
    });
}

exports.updateContact = (request, data, callback) => {
    let id = request.headers['userid'];
    console.log("Data:" + data.userID);
    console.log(id);
    const d = model.personModel.findByIdAndUpdate(id, data)
        .then(updatedData => {
            callback(null, updatedData);
        })
        .catch(error => {
            callback(error);
        })
}

exports.deleteContact = (request, response, callback) => {
    let id = request.params.userEmail;
    try {
        model.personModel.findOne({ email: id }, (error, contact) => {
            if (!contact) {
                let responseData = { Message: "Contact not found for provided email" };
                callback(responseData);
            } else {
                model.personModel.deleteOne({
                        email: id
                    })
                    .then(deletedContact => {
                        // response.send({ message: 'Contact Deleted Sucessfully! ' });
                        callback(null, deletedContact);
                    })
                    .catch(err => {
                        callback(err);
                    })
            }
        });
    } catch (err) {
        callback(err);
    }


}