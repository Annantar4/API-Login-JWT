import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";


export const getUsers = async(req, res)=>{
    try {
        const user = await User.findAll({
            attributes:['id', 'name', 'email']
        });
        res.status(200).json({
            msg: "Success",
            user
        });
    } catch (error) {
        res.status(404).json({msg : error})
    }
}

export const createUsers = async(req, res) =>{

    const {names, emails, passwords} = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(passwords, salt);
    try {
        await User.create({
            name:names,
            email:emails,
            password:hash   
        });
        res.status(201).json({msg : "Success"});
    } catch (error) {
        console.log(error);
    }
}

export const loginUsers = async(req, res)=>{
    const {email, password} = req.body;

    try {
       const userLogin = await User.findOne({
        where : {
            email: email
        }
       }) 
       if(!userLogin) return res.status(404).json({msg:"email not found"});
       const match = await bcrypt.compare(password, userLogin.password);
       if(!match) return res.status(401).json({msg:"password salah"});
       const userId = userLogin.id;
       const userName = userLogin.name;
       const userEmail = userLogin.email;
       const token = jwt.sign({userId,userName,userEmail}, '', {expiresIn: '2h'});
       const refreshToken = jwt.sign({userId,userName,userEmail}, '', {expiresIn: '1h'});

       await User.update({
        refresh_token : refreshToken
       },{
        where : {
            id : userId
        }
       });

       res.cookie('refreshToken', refreshToken,{
        httpOnly : true,
        maxAge : 24 * 60 * 60 * 1000 
       });

       res.status(200).json({
        token : token
       });
    } catch (error) {
        res.status(403).json("login gagal");
    }
}

export const getOneUser = async(req, res)=>{
    try {
        const user = await User.findOne({
            where: req.id,
            attributes: ['id', 'name', 'email']
        })
        if(!user) return res.status(404).json({msg: "Not Found"});
        res.status(200).json({
            msg : 'Success',
            user : user
        });
    } catch (error) {
        res.status(500).json(error);
    }
}