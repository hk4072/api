var Class = require('classes').Class;
var Service = require('./Service');
var mongoose = require('mongoose');
var User = require('../models/User');
var async = require('async');
var Key_User = require('../models/Key_User');
var bcrypt   = require('bcrypt-nodejs');



/*
	This is the service having all the bussiness logic of handling all the 
	Tasks against user

 */
exports.UserServices = Class('UserServices').Extends('Service', {
    userNameIsCorrectlyFormatted: function (username, callback) {
        // verify that roomname conforms to the legal format for a room's name
        // var nameTokens = roomname.split(" ");
        // var numOfTokens = nameTokens.length;
        if (username.charAt(0) == ' ') { // if roomname starts with whitespace, return error msg
            var errorUserCreateMsg = "User name must not start with space";
            console.log(errorUserCreateMsg);
            callback(errorUserCreateMsg);
        }
        else {
            var regEx = /[^a-zA-Z0-9 ]/; // this regEx matches or tells if any of the
            // chars except a-z and A-Z and 0-9 are present in a string
            var specialCharMatchFound = regEx.test(username);
            if(specialCharMatchFound === true) {
                // respond with error msg
                var errorUserCreateMsg = "user name must not have any characters other than alphabets, numbers, and/or spaces";
                console.log(errorUserCreateMsg);
                callback(errorUserCreateMsg);
            }
            else {
                console.log("user name has correct format");
                callback(null);
            }
        }
    },
    saveUser : function(user,callback){
        user.save(function(err) {
            if (err){
                callback(err);     
            }else{
                callback(user);
            }
        });
    },
    _CreateAndSaveKey : function(user_id,callback){
        var generated_hash = bcrypt.hashSync(user_id, bcrypt.genSaltSync(8), null);
        var kuser = new Key_User();
        kuser.user_id = user_id;
        kuser.generated_id = generated_hash;
        kuser.save(function(err){
            if(err){
                callback(err);
            }else{
                callback(kuser);
            }

        });
    },  
    createUser: function (req, callback) {
        var success = false;
        var errorCode = ""; 
        var obj = new UserServices();
        async.waterfall([
            function (callback) {
                obj.userNameIsCorrectlyFormatted(req.param('username'), callback);
            },
            function (callback,errorUserCreateMsg) {
                    console.log(errorUserCreateMsg);
                    var sites = [];
                    var newUser  = new User();
                    newUser.username = req.param('username');
                    newUser.password = req.param('password');
                    newUser.email    = req.param('email');
                    newUser.user_sites = sites;
                    obj.saveUser(newUser,callback);
            },
            
        ],
            // optional callback
            function (newUser) {
                callback(null,newUser)
            });
    }
});