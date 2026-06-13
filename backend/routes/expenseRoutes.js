const express=require("express");
const router=express.Router();
const{getExpenses,createExpenses,deleteExpenses,updateExpenses}=require("../controllers/expenseController");
const authMiddleware=require("../middleware/authMiddleware");
router.get("/",authMiddleware,getExpenses);


router.post("/",authMiddleware,createExpenses);

router.delete("/:id",authMiddleware,deleteExpenses);

router.put("/:id",authMiddleware,updateExpenses);
module.exports=router;