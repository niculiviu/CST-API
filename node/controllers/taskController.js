var crypto = require('crypto');
var mongoose =require('mongoose');
var Task=mongoose.model('task');

exports.add=function(req,res){
if(req.body.name&&req.body.addedBy&&req.body.category){
    var newTask=new Task();

    newTask.set('name',req.body.name);
    newTask.set('addedBy',req.body.addedBy);
    newTask.set('category',req.body.category);

    newTask.save(function(err,task){
        if(err){
            res.status(500).json({err});
        }else{
            res.status(200).json(task);
        }
    })}
    else{
        res.status(500).json({err:'name, addedBy and category are required',modelRequired:{name:'',addedBy:'',category:''}})
    }
}

exports.update=function(req,res){
    Task.findOne({_id:req.body._id}).exec(
        function(err,task){
            if(err){
                res.status(500).json({err});
            }else{
                if(req.body.name&&req.body.isDone&&req.body.category){
                        task.name=req.body.name;
                        task.isDone=req.body.isDone;
                        task.category=req.body.category;
                        task.save(function(err,t){
                            if(err){
                                res.status(500).json({err})
                            }else{
                                res.status(200).json(t);
                            }
                        })
                }else{
                    res.status(500).json({err:'Error!'})
                }
                
            }
        }
    )
}

exports.delete=function(req,res){
    if(req.body._id){
    Task.findOne({_id:req.body._id}).remove().exec(function(err){
        if(err){res.status(500).json({err})}
        else{res.status(200).json({msg:'deleted'})}
    })
    }else{
        res.status(500).json({err:'You should send an task object'});
    }
}

exports.getAll=function(req,res){
    Task.find({addedBy:req.body.addedBy}).exec(function(err,tasks){
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(tasks);
        }
    })
}

exports.getById=function(req,res){
    if(req.body._id){
    Task.findOne({_id:req.body._id}).exec(function(err,task){
        if(err){res.status(500).json({err})}
        else{res.status(200).json(task)}
    })
    }else{
        res.status(500).json({err:'you should send a task id'});
    }

}