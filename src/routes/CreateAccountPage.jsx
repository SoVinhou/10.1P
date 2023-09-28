import SignUp from "../SignUp";
import NavBar from "../NavBar";
import Bottom from "../Bottom";
import EmailBox from "../EmailBox";

function CreateAccountPage() {
  return (
    <div>
      <NavBar />
      <SignUp />
      <EmailBox />
      <Bottom />
    </div>
  )
}

export default CreateAccountPage;