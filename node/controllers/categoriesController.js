var crypto = require('crypto');
var mongoose =require('mongoose');
var category=mongoose.model('categories');

exports.add=function(req,res){
    if(req.body.addedBy && req.body.name){
        var newCategory=new category();
        newCategory.set('name',req.body.name);
        newCategory.set('addedBy',req.body.addedBy);

        newCategory.save(function(err,cat){
            if(err){
                res.status(500).json({err})
            }else{
                res.status(200).json(cat);
            }
        })
    }else{
        res.status(500).json({err:'userId and category name are required',modelExpected:{addedBy:'',name:''}})
    }  
}

exports.getAll=function(req,res){
    if(req.body._id){
    category.find({addedBy:req.body._id}).exec(function(err,categories){
        if(err){
            res.status(500).json({err})
        }else{
            res.status(200).json(categories);
        }
    })}
    else{
        res.status(500).json({err:'userId is required',modelExpected:{_id:''}})
    }
}

exports.delete=function(req,res){
    if(req.body._id){
        category.findOne({_id:req.body._id})
        .remove()
        .exec(function(err){
            if(err){ res.status(500).json({err})}
            else{res.status(200).json({msg:'removed'})}
        });
    }else{
        res.status(500).json({err:'category id is required'})
    }
}

exports.update=function(req,res){
    if(req.body._id){
        category.findOne({_id:req.body._id}).exec(function(err,singleCategory){
            if(err){
                res.status(500).json({err})
            }else{
                if(req.body.name&&req.body.addedBy){
                    singleCategory.name=req.body.name;
                    singleCategory.addedBy=req.body.addedBy;
                    singleCategory.save(function(err,cat){
                        if(err){
                            res.status(500).json({err})
                        }else{
                            res.status(200).json({msg:'Update successfull'})
                        }
                    })
                }else{
                    res.status(500).json({err:'name or addedBy are empty or undefined'});
                }
            }
        })}
    else{
        res.status(500).json({err:'category id is required',modelExpected:{_id:''}})
    }
}

exports.getById=function(req,res){
    if(req.body._id){
        category.findOne({_id:req.body._id}).exec(function(err,singleCategory){
            if(err){
                res.status(500).json({err})
            }else{
                res.status(200).json(singleCategory);
            }
        })}
    else{
        res.status(500).json({err:'id is required',modelExpected:{id:''}})
    }
}

exports.getByUserId=function(req,res){
    if(req.body.userId){
        category.find({addedBy:req.body.userId}).exec(function(err,categories){
            if(err){
                res.status(500).json({err})
            }else{
                res.status(200).json(categories);
            }
        })}
    else{
        res.status(500).json({err:'userId is required',modelExpected:{userId:''}})
    }
}