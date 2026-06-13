const Expense=require("../models/Expense")
exports.getExpenses=async(req,res)=>{
    try{
    const expenses=await Expense.find({user:req.user});
    res.json(expenses);}
    catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.createExpenses=async(req,res)=>{
   try{

    const expense=await Expense.create({...req.body,user:req.user});
    res.json(expense);}
    catch(err){
        res.status(500).json({
            error:err.message
        });
    }
        
};
exports.deleteExpenses=async (req,res)=>{
    await Expense.findByIdAndDelete({_id:req.params.id,user:req.user});
    res.json({message:"deleted"});
};
exports.updateExpenses=async(req,res)=>{
const updatedExpense=await Expense.findOneAndUpdate({_id:req.params.id,user:req.user},req.body,{new:true});
res.json(updatedExpense);
};