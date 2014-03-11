var async = require('async');//For Further usage
var loginSignUpService = require('../services/LoginSignupService');
var userService = require('../services/UserServices');
var usersevobj = new UserServices();

module.exports = function (app, passport) {

 app.get('/',
    function(req,res){
        res.render('CreateUser');
    }
);
app.get('/Failed',
    function(req,res){
        console.log("successfuly done");
    }
);
 app.get('/UserCreated',
    function(req,res){
        console.log("successfuly done");
    }
);
 app.post('/adduser', function(req,res){
    async.waterfall([
        function (callback) {
                    usersevobj.createUser(req,callback);
         },
         function (result, callback) {
                    if(result._id === undefined){
                           callback(null,result);       
                    }else
                    {
                        usersevobj._CreateAndSaveKey(result._id,callback);   
                    }
                 
        },
        function (failure,callback){
            callback(null,failure);
         },

        ],
         function (finaldata, result) {
              if(finaldata != null){
                    if(finaldata.generated_id){
                            res.send('<h1>Log: </h1></BR><h2>Response:</h2></BR><p>'+finaldata+'</p>');
                    }
             }
            else{
                    res.send('<h1>Log:</h1></BR><p>'+result+'</p>');
            }
        });
    

 }); 
 
/* app.post('/addUser',
        function(req, res, next) {
            // console.log('before authenticate');
            passport.authenticate('local', function(err, user, info) {
                // console.log('authenticate callback');
                if (err) {// error cases will be next(ed) or forwarded to the last callback
                    console.log("Login error: " + err);
                     
                }
                if (!user) { 
                    console.log("LoginController::Login authentication failed");
                    console.log("authentication Failed");
                     
                }
                req.logIn(user, function(err) {
                    console.log(user);
                    if (err) { // error cases will be next(ed) to the last callback
                        err = "There was an error establishing" +
                                " your session. Please login again to proceed";
                        console.log("Error establishing session");
                    }
                    else {
                        console.log("successful login");
                    	//code to redirect user goes here    
                 	}
                });
            }) (req, res, next);
        },
        function(err, req, res, next) {
            console.log("Login error in final callback: " + err);
            
        }
    );
}*/

/*app.post('/addUser', passport.authenticate('local-signup', {
        successRedirect : '/UserCreated', // redirect to the secure profile section
        failureRedirect : '/Failed', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
 }));
*/
}