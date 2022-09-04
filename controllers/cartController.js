const Cart = require("../models/cart")

let cart = {products:[], totalPrice:0};

const addToCart = (req,res)=>{
    const addItemContent = req.body
    // console.log(addItemContent)
    const addItem = new Cart(addItemContent)
    // console.log(JSON.parse(addItemContent))
    addItem.save().then((result)=>{
        res.json({redirect: '/addItemContent'})
    }).catch((err)=>{
        console.log(err)
    });

    calcTotalpush(addItemContent)
    
}


const removeFromCart = (req,res)=>{
    const product_id = req.body.prodID
    Cart.findByIdAndDelete(product_id).then((result)=>{
        calcTotalpop(result)
        res.redirect('/deleteCartItem') 
    }).catch((err)=>{
        console.log(err)
    })
}

const removeAllItems = () => {
    Cart.deleteMany({}).then((result)=>{
        cart.totalPrice = 0
        cart.products = []
        console.log("Cart cleared after Sign Out")
    }).catch((err)=>{
        console.log(err)
    })
}

const calcTotalpush = (product) => {  
    cart.products.push(product)
    cart.totalPrice += (Number(product.prod_price) * Number(product.prod_quantity))
    // console.log(showCart());
    
}

const calcTotalpop = (deleted_obj) =>{
    for(let i=0; i<cart.products.length; i++){
        if(cart.products[i].prod_id == deleted_obj.prod_id && cart.products[i].prod_quantity == deleted_obj.prod_quantity && cart.products[i].prod_size == deleted_obj.prod_size){
            cart.products.splice(i,1);
            break;
        }
    }
    
    cart.totalPrice -= (Number(deleted_obj.prod_price) * Number(deleted_obj.prod_quantity))
}

const showCart = ()=>{
    return cart;
}


const loadCart = (req,res)=>{
    Cart.find().then((result)=>{
        
        let price = cart.totalPrice
        // console.log(price)
        res.render("cart", {
            title: "Shopping Cart",
            products: result,
            subtotal: price
        })
        
    }).catch((err)=>{
        console.log(err)
    })
}



module.exports = {
    addToCart,
    removeFromCart,
    calcTotalpush,
    calcTotalpop,
    removeAllItems,
    showCart,
    loadCart
};