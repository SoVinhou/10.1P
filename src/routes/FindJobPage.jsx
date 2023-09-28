import NavBar from "../NavBar";
import EmailBox from "../EmailBox";
import Bottom from "../Bottom";
import Jobs from "../Jobs";
import JobsCardsLists from "../JobsCardsLists";

function FindJobPage() {
  return (
    <div>
        <NavBar />
        <JobsCardsLists />
        <EmailBox />
        <Bottom />
    </div>
  )
}

export default FindJobPage;