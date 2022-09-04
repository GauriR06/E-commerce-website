const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const addPaymentAmt = async(req,res)=>{
      try{
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',  
          line_items: req.body.items.map(item =>{
            return{
              price_data: {
                currency: 'AED',
                product_data:{
                  name: "Total"
                },
                unit_amount: item.total
      
              },
              quantity: 1
            }
          }),
          success_url: 'http://localhost:3000/payment_page',
          cancel_url: 'http://localhost:3000/cart'
        })
        res.json({url: session.url})
      } catch (err) {
        console.log(err)
      }
      
  
};

module.exports = {
  addPaymentAmt
};