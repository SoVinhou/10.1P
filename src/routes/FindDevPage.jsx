import NavBar from "../NavBar";
import EmailBox from "../EmailBox";
import Bottom from "../Bottom";
import JobsEmp from "../JobsEmp";
import JobsCardsListsEmp from "../JobsCardsListsEmp";

function FindDevPage() {
  return (
    <div>
        <NavBar />
        <JobsCardsListsEmp />
        <EmailBox />
        <Bottom />
    </div>
  )
}

export default FindDevPage;