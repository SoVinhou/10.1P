import NavBar from "../NavBar";
import Bottom from "../Bottom";
import EmailBox from "../EmailBox";
import Profile from "../Profile";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      <Profile />
      <EmailBox />
      <Bottom />
    </div>
  )
}

export default ProfilePage;