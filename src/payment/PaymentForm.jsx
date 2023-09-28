import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import './PaymentStyle.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    console.log(window.opener)

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if(!error) {
            try {
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:4000/PaymentForm", {
                    amount: 1000,
                    id
                });

                if(response.data.success) {
                    console.log("Successful payment");
                    setSuccess(true);
                    window.opener.postMessage("paymentMade", "http://localhost:3000");
                    console.log("posted");
                }

            } catch (error) {
                console.log("Error", error);
                window.alert("Error");
            }
        } else {
            console.log(error.message);
            window.alert(error.message); }
    };

    return (
        <div className="header-Payment">
                <div className="PaymentForm">
                {!success ? (
                    <div className="PaymentBox">
                        <h1>Payment Form</h1>
                        <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: "5px", textAlign: "center", width: "600px" }}>
                            <input type="text" id="firstName" name="firstName" placeholder="First name" />
                        </div>
                        <div style={{ marginTop: "5px", textAlign: "center", width: "600px" }}>
                            <input type="text" id="lastName" name="lastName" placeholder="Last name" />
                        </div>
                        <div style={{ marginTop: "5px", textAlign: "center", width: "600px" }}>
                            <input type="number" id="age" name="age" placeholder="Age" />
                        </div>
                        <div style={{ marginTop: "5px", textAlign: "center", width: "600px" }}>
                            <input type="text" id="streetNumber" name="streetNumber" placeholder="Address" />
                        </div>
                            <CardElement />
                            <button style={{ marginTop: "40px" }}>Pay</button>
                        </form>
                    </div>
                ) : (
                    navigate("/PurchaseCompletion")
                )}
            </div>
        </div>
      )
}