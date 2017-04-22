var mongoose = require('mongoose'),Schema=mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var UserSchema = new Schema({
	email: {type: String, unique: true},
	password: String,
    firstName: String,
    lastName: String,
    dateAdded: {type:Date, default: Date.now},
    role:String,
    code:String,
    company:{type:Schema.ObjectId,ref:'company'}
});
mongoose.model('user',UserSchema);
UserSchema.plugin(deepPopulate);

