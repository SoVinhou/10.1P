import React, { useState } from 'react';
import './JobPage.css'
import './index.css'
import EmploymentOpt from './EmploymentOpt';
import FreelanceOpt from './FreelancingOpt';

function JobPage() {

    const [jobType, setJobType] = useState(null);

    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    }

    return (
        <div style={{marginTop:"60px", marginBottom:"80px"}} className="Body">
            <div className="NewJobBanner">
                <h1>New Job</h1>
            </div>

            <div style ={{ display: "flex", justifyContent: "center" }}>
                <label>
                    <input type="radio" name="jobType" value="employment" onChange={handleJobTypeChange} />
                    <span style={{ fontSize: "25px" , fontWeight: "bold"}}>Employment</span>
                </label> 
                <label>
                    <input type="radio" name="jobType" value="freelance" onChange={handleJobTypeChange} />
                    <span style={{ fontSize: "25px" , fontWeight: "bold"}}>Freelance</span>
                </label>
            </div>   
            {jobType === 'employment' && (
                <div>
                    <EmploymentOpt />
                </div>
            )}
            {jobType === 'freelance' && (
                <div>
                    <FreelanceOpt />
                </div>
            )}
        </div>
    );
}


export default JobPage;