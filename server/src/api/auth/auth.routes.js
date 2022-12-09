
const express = require('express');
const router = express.Router();
const uuid = require('uuid');


const bcrypt = require('bcrypt');
const dbConn = require('../../dbconnection.js');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const fsPromises = require('fs').promises;

const handleLogin = async (req, res) => {
    console.log(req.body);
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    // verify user exists in database
    dbConn.query('SELECT * FROM User WHERE Primary_Email_Id=?', user, (err, loggedUser) => {
        if (err) return res.status(400).json({ 'message': 'Error ' });
        if (loggedUser.length === 0) return res.status(400).json({ 'message': 'User does not exist' });
        console.log(loggedUser);
        // verify password
        bcrypt.compare(password, loggedUser[0].Password, (err, result) => {
            // if (err) return res.status(400).json({ 'message': 'Error passwords dont match' });
            
            if (result === false) return res.status(400).json({ 'message': 'Incorrect password' });
            // create token
            const token = jwt.sign({ user,role: loggedUser[0].Role }, process.env.JWT_SECRET, { expiresIn: '10h' });
            // refresh token
            const refreshToken = jwt.sign({ user,role: loggedUser[0].Role  }, process.env.JWT_SECRET_REFRESH, { expiresIn: '1d' });
            // store refresh token in database
            dbConn.query('UPDATE User SET refreshtoken=? WHERE Primary_Email_Id=?', [refreshToken, user], (err, result) => {
                if (err) return res.status(400).json({ 'message': 'Error updating refresh token' });
                // send token to client
                res.cookie('token', token, { httpOnly: true });
                res.cookie('refreshToken', refreshToken, { httpOnly: true });
                res.status(200).json({ 'message': 'Login successful', 'token': token, 'refreshToken': refreshToken, user_id: loggedUser[0].User_ID, role: loggedUser[0].Role });
            });
        });
    });

};

router.post('/login', handleLogin);

// handle new user registration
const handleNewUser = async (req, res) => {
    // const { Primary_Email_Id,  password } = req.body;
    // if (!Primary_Email_Id || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    let Primary_Email_Id = req.body.Primary_Email_Id;

    // check for duplicate usernames in the db
    dbConn.query('SELECT * FROM User WHERE Primary_Email_Id=?', Primary_Email_Id, (err, result) => {
        if (err) return res.status(400).json({ 'message': 'Error ' });
        if (result.length > 0) return res.status(409).json({ 'message': 'User already exists' });
    
    });
    
    try {
        
        let Primary_Email_Id = req.body.Primary_Email_Id;
        let Alternate_Email_Id = req.body.Alternate_Email_Id;
        let User_Name = req.body.User_Name;
        let Birth_Gender = req.body.Birth_Gender;
        let DOB = req.body.DOB;
        let Mobile_Number = req.body.Mobile_Number;
        let pwd = req.body.Password;
        let Role = req.body.Role;
      
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // genrate uuid
        const uuidv4 = uuid.v4();

        let User = {Primary_Email_Id: Primary_Email_Id, Alternate_Email_Id: Alternate_Email_Id, User_Name: User_Name, 
            Birth_Gender: Birth_Gender, DOB: DOB, Mobile_Number: Mobile_Number, Password: hashedPwd, Role: Role, refreshtoken: null,User_ID: uuidv4};


        //store the new user
        dbConn.query('INSERT INTO User SET ?', User, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ 'message': 'Error ' });}
            res.status(201).json({ 'message': `User ${User_Name} created` });
        });
     
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

router.post('/newuser', handleNewUser);




const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    dbConn.query('SELECT * FROM User WHERE refreshtoken=?', refreshToken, (err, result) => {    
        if (err) return res.status(400).json({ 'message': 'Error ' });
        if (result.length === 0) return res.status(400).json({ 'message': 'Refresh token not found' }); 
        // Delete refreshToken from db
        dbConn.query('UPDATE User SET refreshtoken=? WHERE Primary_Email_Id=?', [null, result[0].Primary_Email_Id], (err, result) => {
            if (err) return res.status(400).json({ 'message': 'Error deleting refresh token' });
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.status(200).json({ 'message': 'Logout successful' });
        // clear cookie
});
   
    });
};


router.post('/logout', handleLogout);

// const handleRefreshToken = async (req, res) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204); //No content
//     const refreshToken = cookies.jwt;
    

module.exports = router;
