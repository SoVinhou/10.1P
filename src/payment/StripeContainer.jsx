import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import NavBar from "../NavBar"
import EmailBox from "../EmailBox"
import Buttom from "../Bottom"

const PUBLIC_KEY = "pk_test_51NraUuLxPY9wwEazQV6XuVpjBFCmRGnfJyDv195Y6KxM7a6d3vBjZxIxcRuWMjFrOjgqR3WI8a8jPPjXmwwR4IrL00iq7XKK9N"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<NavBar />
			<PaymentForm />
			<EmailBox />
			<Buttom />
		</Elements>
	)
}