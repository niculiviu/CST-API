var mongoose = require('mongoose'),Schema=mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var CompanySchema = new Schema({
	name:{type:String,required:true},
    dateAdded: {type:Date, default: Date.now},
    admin:{type:Schema.ObjectId,ref:'user'},
    developers:[{type:Schema.ObjectId,ref:'user'}]
});
mongoose.model('company',CompanySchema);
CompanySchema.plugin(deepPopulate);

var ProjectSchema=new Schema({
	name:{type:String,required:true},
    dateAdded: {type:Date, default: Date.now},
    developers:[{type:Schema.ObjectId,ref:'user'}],
    watchers:[{type:Schema.ObjectId,ref:'user'}],
    company:{type:Schema.ObjectId,ref:'company',required: true}
});
mongoose.model('project',ProjectSchema);
ProjectSchema.plugin(deepPopulate);

var HoursSchema=new Schema({
    hours:{type:Number,required:true},
    date:{type:Date,required:true},
    dateAdded:{type:Date, default: Date.now},
    developer:{type:Schema.ObjectId,ref:'user',required: true},
    project:{type:Schema.ObjectId,ref:'project',required: true},
    company:{type:Schema.ObjectId,ref:'company',required: true}
});
mongoose.model('hours',HoursSchema);
HoursSchema.plugin(deepPopulate);
