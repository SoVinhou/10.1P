const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(cors())

app.post('/SignUp' , (req,res)=>{
    const email = req.body.email
    
    const msg = ({
        to: {
            email: email,
        },
        from: "sovinhouung7@gmail.com",
        subject: "Thank You For Signing Up!",
        templateId: process.env.TEMPLATE_ID,
        dynamic_template_data: {
            name: email,
        }
    })

    const sendMail = async () => {

        try {
            await sgMail.send(msg);
            console.log("Message Send Successfully!")
        } catch (error) {
            console.error(error);
    
            if (error.response) {
                console.error(error.response.body)
            }
        }
    }

    sendMail();
})


app.post("/PaymentForm", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
	  const payment = await stripe.paymentIntents.create({
		amount,
		currency: "AUD",
		description: "DevLink MarketPlace",
		payment_method: id,
		confirm: true,
		return_url: "http://localhost:3000/PurchaseCompletion" 
	  })
	  console.log("Payment", payment)
	  res.json({
		message: "Payment successful",
		success: true
	  })
	} catch (error) {
	  console.log("Error", error)
	  res.json({
		message: "Payment failed",
		success: false
	  })
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})




