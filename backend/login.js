const express = require('express');
const router = express.Router();
const { User, Course ,Admin} = require('./mongoose');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); //cookies



router.post('/login', (req, res) => {
    //console.log(typeof(req.body['id']))
    const { encryptedUsername, encryptedPassword } = req.body;
    console.log(CryptoJS.AES.decrypt(encryptedUsername, 'secret_default_key').toString(CryptoJS.enc.Utf8))
    const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, 'secret_default_key').toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'secret_default_key').toString(CryptoJS.enc.Utf8);
    User.findOne({username: decryptedUsername}).then(function(result){
        if(result == null){
            Admin.findOne({adminName: decryptedUsername}).then(function(admin){
                if(admin == null){
                    res.send("Invaild")
                }else{
                    if(admin.password == decryptedPassword){
                        res.cookie("adminLogged",'true')
                        res.send("adminVaild")
                    }else{
                        res.send("Invaild")
                    }

                }
            })
        }else{
            const match = decryptedPassword == result.password
            if(match ){
                res.cookie("username",result.username)
                res.cookie("logged",'true')
                res.send('userVaild')
            }else{
                res.send("Invaild")
            }
        }
    })
})

module.exports = router;