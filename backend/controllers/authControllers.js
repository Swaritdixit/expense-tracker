const bcrypt=require("bcryptjs");
const User=require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.register=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

      const existingUser = await User.findOne({ email });

    if (existingUser) {return res.status(409).json({ success:false,message: "Email already exists" }); }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{6,}$/;
         if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 chars and include a number"
      });
    }
    const hashedPassword=await bcrypt.hash(password,10);
const token = crypto.randomBytes(32).toString("hex");

        const user=await User.create({
            name,email,password:hashedPassword,verificationToken:token,isVerified:false
        });
         const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
   const verifyLink = `${process.env.BASE_URL}/auth/verify/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `<p>Click below to verify</p><a href="${verifyLink}">Verify Email</a>`
    });


        res.status(201).json({
            success:true,
            message:"successful registration",
            user:{
    id:user._id,
    name:user.name,
    email:user.email}
});
    }
    catch(err)
    {  

       return res.status(400).json({
  success: false,
  message: err.message
});
    }

};
const jwt=require("jsonwebtoken");
exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        if (!user.isVerified) {
  return res.status(403).json({
    success: false,
    message: "Please verify your email first"
  });
}
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Password"
            });
        }
        const token=jwt.sign({id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.json({token});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};