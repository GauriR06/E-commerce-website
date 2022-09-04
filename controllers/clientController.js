const Account = require("../models/accounts")
const SignedInAcc = require("../models/signedIn_acc")

const CartController = require('../controllers/cartController');
let deli_add;
const loginService = (typedUsername, typedPassword, callback) => {
    
    //check if the user is in the DB
    Account.find({username:typedUsername}).then((result)=>{
        if(result[0].password === typedPassword){
            console.log('pass');
            deli_add = result[0].delivery_addr
            return callback(null, true, result);
        }
        else{
            console.log('fail');
            return callback(null, true, null);   
        }
    }).catch((err)=>{
        console.log(err)
        return callback(null, true, null);
    })
    
};

const loginControl = (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    
    console.log("-------------------------------- ");
    console.log(username);
    console.log(password);
    console.log("-------------------------------- ");

    if (!username || !password) {
        res.render('signIn_fail', {
            title: 'Sign In Failed',
            message: `Sign In Failed... Please try again.`
        })
        res.end();
    } else {
        if (req.session && req.session.user) {
            res.render('signIn_success', {
                title: 'Sign In Successful',
                message: `Already logged in`
            })
            res.end();
        } else {
            loginService(username, password, function(err, dberr, result) {
                if (result === null) {
                    console.log("Auhtentication problem!");
                    res.render('signIn_fail', {
                        title: 'Sign In Failed',
                        message: `Sign In Failed... Please try again.`
                    })
                    res.end();
                } else {
                    //add to session
                    CartController.removeAllItems()
                    req.session.user = username; 

                    //add delivery address of signed in acc 
                    const addr = new SignedInAcc({
                        delivery_addr: deli_add
                    })
                    addr.save().then((_result)=>{
                        res.render('signIn_success', {
                            title: 'Sign In Successful',
                            message: `Welcome back, ${result[0].first_name}!`
                        })
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            });
        }
    }
};


const createAcc = (req,res)=>{
    Account.find({username:req.body.username}).then((_result)=>{
        // console.log(_result[0] === undefined)

        //if no record with same username is found, then create account
        if(_result[0] === undefined){
            const acc = new Account(req.body)
            acc.save().then((result)=>{
                console.log(result.username)
                console.log(result.password)
                res.render('createAcc_success', {
                    title: 'Registration Successful',
                    U: result.username,
                    P: result.password,
                    FN: result.first_name
                })
            }).catch((err)=>{
                console.log(err)
            }) 
        }
        else{
            res.render('createAcc_fail',{
                title: 'Registration Failed'
            })   
        }
    }).catch((err)=>{
        console.log(err)

    }) 
};

const removeSignInAddr = () => {
    SignedInAcc.deleteMany({}).then((result)=>{
        console.log("Signed Out")
    }).catch((err)=>{
        console.log(err)
    })
}

const logout = (req, res) => {
    if(req.session && !req.session.user){
        res.render('signIn', {
            title: 'Sign In'
        }) 
    } 
    else{
        res.render('signOut', {
            title: 'Sign Out Successful',
            message: `Sign Out Successful!!`
        })

        removeSignInAddr()
        CartController.removeAllItems()
        req.session.destroy();
        res.end();
    }
    
};
    
    
module.exports = {
    loginControl,
    loginService,
    createAcc,
    removeSignInAddr,
    logout
};