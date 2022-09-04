require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const WomenProduct = require("./models/women_products")
const MenProduct = require("./models/men_products")
const GirlsProduct = require("./models/girls_products")
const BoysProduct = require("./models/boys_products")
const BigGirlsProduct = require("./models/big_girls_products")
const BigBoysProduct = require("./models/big_boys_products")
const Featured = require("./models/featured_products")
const Cart = require("./models/cart")
const SignedInAcc = require("./models/signedIn_acc")

const ClientController = require('./controllers/clientController');
const CartController = require('./controllers/cartController');
const PaymentController = require('./controllers/payment');



//------------------------------------------------------------------------------------

const app = express()
app.use(express.urlencoded({extended: true}))
// app.listen(3000)

const db_uri = "mongodb+srv://corizo:test1234@cluster0-corizo.0yg0acl.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_uri).then(()=> {
    app.listen(3000)
    console.log("db connected")
    console.log(`LILAC site listening at http://localhost:3000`);

}).catch((err)=>{
    console.log(err)
})

app.use(express.static('public'));
app.set("view engine", "ejs")

app.use(express.json()); 
// app.use(express.urlencoded({ extended: true }));


const session = require('express-session');
app.use(session({secret: 'some secret code', resave: false, saveUninitialized:true}));


//------------------------------------------------------------------------------------

//Add Products
// app.get("/add-prod", (req,res)=>{
//     const task = new Task({
//         task_name: "Update Testing Plan",
//         employee_name: "Nancy",
//         deadline_date: "2022-09-10",
//         status: "Completed",
//     })

//     task.save().then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })



//------------------------------------------------------------------------------------

//GET

//home page
app.get("/", (req,res)=>{
    res.redirect('/signIn')
})

app.get('/home', (req,res)=>{
    Featured.find().then((result)=>{
        res.render("home", {
            title: "Home",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/home/:id', (req,res)=>{
    const id = req.params.id
    Featured.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})


//mens page
app.get('/mens', (req,res)=>{
    MenProduct.find().then((result)=>{
        res.render("men", {
            title: "MEN'S WEAR",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/mens/:id', (req,res)=>{
    const id = req.params.id
    MenProduct.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})


//womens page
app.get('/womens', (req,res)=>{
    WomenProduct.find().then((result)=>{
        res.render("women", {
            title: "WOMEN'S WEAR",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/womens/:id', (req,res)=>{
    const id = req.params.id
    WomenProduct.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})


//girls page
app.get('/girls', (req,res)=>{
    GirlsProduct.find().then((result)=>{
        res.render("girls", {
            title: "GIRLS 2-10Y WEAR",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/girls/:id', (req,res)=>{
    const id = req.params.id
    GirlsProduct.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})


//boys page
app.get('/boys', (req,res)=>{
    BoysProduct.find().then((result)=>{
        res.render("boys", {
            title: "BOYS 2-10Y WEAR",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/boys/:id', (req,res)=>{
    const id = req.params.id
    BoysProduct.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})


//big boys page
app.get('/big_boys', (req,res)=>{
    BigBoysProduct.find().then((result)=>{
        res.render("big_boys", {
            title: "BOYS 10-14Y WEAR",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/big_boys/:id', (req,res)=>{
    const id = req.params.id
    BigBoysProduct.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})


//big girls page
app.get('/big_girls', (req,res)=>{
    BigGirlsProduct.find().then((result)=>{
        res.render("big_girls", {
            title: "GIRLS 10-14Y WEAR",
            products: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/big_girls/:id', (req,res)=>{
    const id = req.params.id
    BigGirlsProduct.findById(id).then((result)=>{
        res.render("product_summary", {
            title: "product-details",
            product: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})

//------------------------------------------------------------------------------------
app.get('/home', (req,res)=>{
    res.render("home", {
        title: "Home"
    })
})

app.get('/t&c', (req,res)=>{
    res.render("t&c", {
        title: "Terms and Conditions"
    })
})

app.get('/mens', (req,res)=>{
    res.render("men", {
        title: "Men's"
    })
})

app.get('/womens', (req,res)=>{
    res.render("women", {
        title: "Women's"
    })
})

app.get('/kids', (req,res)=>{
    res.render("kids", {
        title: "Kids'"
    })
})


//------------------------------------------------------------------------------------

//sign in page
app.get('/signIn', (req,res)=>{
    res.render("signIn", {
        title: "Sign In"
    })
})

// app.get('/signIn_success', (req,res)=>{
//     res.render("signIn_success", {
//         title: "Sign In Successful"
//     })
// })

//Sign In verification
app.post('/signIn_success', ClientController.loginControl)


//Sign Out
// app.get('/signOut', ClientController.logout)
app.get('/signOut', ClientController.logout)

//Create Account
app.get('/createAcc', (req,res)=>{
    res.render("createAcc", {
        title: "Create Account"
    })
})

// app.get('/createAcc_success', (req,res)=>{
//     res.render("createAcc_success", {
//         title: "Registration Successful"
//     })
// })

//creating an account
app.post('/createAcc_success', ClientController.createAcc)



//------------------------------------------------------------------------------------

//Shopping cart page

//load cart items
app.get('/cart', CartController.loadCart)

// (req,res)=>{
//     Cart.find().then((result)=>{
//         let price = CartController.showCart
//         console.log(price)
//         res.render("cart", {
//             title: "Shopping Cart",
//             products: result,
//             subtotal: price.totalPrice
//         })
//     }).catch((err)=>{
//         console.log(err)
//     })

// }


app.get('/addItemContent', (req,res)=>{
    res.render('addToCart_success', {
        title: 'Item Added',
    })
})

app.get('/deleteCartItem', (req,res)=>{
    res.render('deleteCartItem', {
        title: 'Item Deleted',
    })
})


//add item to cart
// app.post('/cart', (req,res)=>{
//     const addItemContent = req.body
//     console.log(addItemContent)
//     const addItem = new Cart(addItemContent)
//     // console.log(JSON.parse(addItemContent))
//     addItem.save().then((result)=>{
//         res.json({redirect: '/addItemContent'})
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

app.post('/cart', CartController.addToCart)


//remove item from cart
// app.post('/deleteCartItem', (req,res)=>{
//     const product_id = req.body.prodID
//     Cart.findByIdAndDelete(product_id).then((result)=>{
//         res.redirect('/deleteCartItem') 
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

app.post('/deleteCartItem', CartController.removeFromCart)

// app.get('/signOut', CartController.removeAllItems)


//------------------------------------------------------------------------------------

//Payment


app.get('/payment_page', (req,res)=>{
    
    Cart.find().then((resultCart)=>{
        SignedInAcc.find().then((result)=>{
            res.render('payment_page', {
                title: 'Payment Successfull',
                address: result[0].delivery_addr,
                cartItems: resultCart
            })
        }).catch((err)=>{
            console.log(err)
        })    
    }).catch((err)=>{
        console.log(err)
    })    
})

app.post('/payment_page', PaymentController.addPaymentAmt)





//------------------------------------------------------------------------------------

//footer pages

app.get('/about', (req,res)=>{
    res.render("about", {
        title: "About Us"
    })
})

app.get('/contact', (req,res)=>{
    res.render("contact", {
        title: "Contact Us"
    })
})

app.get('/branches', (req,res)=>{
    res.render("branches", {
        title: "Our Branches"
    })
})

//------------------------------------------------------------------------------------


//product summary page
app.get('/prodSummary', (req,res)=>{
    res.render("product_summary", {
        title: "Product Summary"
    })
})

// app.get('/prodDisplay', (req,res)=>{
//     res.render("product_display", {
//         title: "Product Display"
//     })
// })


//------------------------------------------------------------------------------------


//404
app.use((req,res)=>{
    res.status(404).render("404", {
        title: "Error"
    })
})

