var mongoose = require('mongoose'),Schema = mongoose.Schema;
var Object_id = Schema.ObjectId;

module.exports = mongoose.model('Key_User', {
	user_id:{type:Object_id,required:true},
	generated_id:{type:String,required:true}
});
