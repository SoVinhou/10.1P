import NavBar from "../NavBar";
import Bottom from "../Bottom";
import EmailBox from "../EmailBox";
import PaymentForm from "../payment/PaymentForm"

function PaymentPage() {
  return (
    <div>
      <NavBar />
      <PaymentForm />
      <EmailBox />
      <Bottom />
    </div>
  )
}

export default PaymentPage;