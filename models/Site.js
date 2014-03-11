var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SiteSchema = new Schema({
		site_id:{type:ObjectId},
		site_name:{type:String,required:true,unique:true},
		installed_on:String,
		plugin_type:String,
		created_at: {type:Date,default:Date.now},
	    updated_at: {type:Date,default:Date.now}
});
module.exports = mongoose.model('Site', SiteSchema);
