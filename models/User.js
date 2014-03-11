var mongoose = require('mongoose'),Schema = mongoose.Schema;
var Object_id = Schema.ObjectId;
var Site = require('./Site');


module.exports = mongoose.model('User', {
	username: {type:String,required:true,unique:true},
	password: {type:String,required:true},
	email:{type:String,required:true},
	created_at: {type:Date,default:Date.now},
	updated_at: {type:Date,default:Date.now},
	user_sites: {type:[],ref:'Site'}
});
