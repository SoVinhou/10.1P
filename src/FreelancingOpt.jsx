import React, { useEffect, useState } from 'react';
import './JobPage.css'
import './index.css'
import { JobLists } from './JobLists';
import { useNavigate } from 'react-router-dom';
import { addCollectionAndDocument, storage } from './routes/utils/firebase';
import { v4 } from "uuid"; 
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function FreelanceOpt() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [projectLength, setProjectLength] = useState('');
    const [minPayment, setMinPayment] = useState('');
    const [maxPayment, setMaxPayment] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [experience, setExperience] = useState('');
    const [experienceDuration, setExperienceDuration] = useState('');
    const [image, setImageUpload] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const job = {
            type: 'freelance',
            title,
            description,
            skills,
            projectLength,
            minPayment,
            maxPayment,
            workingHours,
            experience,
            experienceDuration,
            image,
        };
        JobLists.push(job);
        console.log(JobLists);
        // get last index in JobLits Array
        const index = JobLists.length - 1;
        addCollectionAndDocument('jobs', JobLists[index]);
        navigate('/');
    };

    const handleUpload = async (e) => {
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        console.log('Uploaded Image!');
      
        const dbImage = ref(storage, `images/`);
        listAll(dbImage).then((res) => {
          res.items.forEach((itemRef) => {
            console.log(itemRef.name);
          }); 
        });
      
        const url = await getDownloadURL(imageRef);
        console.log(url);
        window.alert('Image Uploaded Successfully!');
        setImageUpload(url);
      };


    return (
        <div className="freelanceBody">
            <div>
                <div className="DescribeYourJob">
                    <h2>Describe Your Job</h2>
                </div>
                <div className="JobDescription">
                    <form onSubmit={handleSubmit}>
                        <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                            Title/Position
                            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} />
                        </label>
                        <br />
                        <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                            Job Description
                            <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginTop: "15px", padding: "10px", boxShadow: "0 0 2px", boxSizing: "border-box", height: "200px", fontFamily: "Arial, sans-serif"}} />
                        </label>
                        <br />
                        <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                            Skills
                            <input type="text" name="skills" value={skills} onChange={(e) => setSkills(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} placeholder='Please Add Relevant Skills ... ' />
                        </label>
                    </form>

                    <div className="ProjectConditionsBanner">
                        <h2>Project Condition</h2>
                    </div>

                    <div className="ProjectConditions">
                        <form onSubmit={handleSubmit}>
                            <br />
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                                Project Length
                                <input type="text" name="projectLength" value={projectLength} onChange={(e) => setProjectLength(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} />
                            </label>
                            <br />
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "-10px" }}>
                                Payment
                            </label>
                            <label style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", fontStyle: "italic" }}>
                                Min Payment:
                                <input type="text" name="minPayment" value={minPayment} onChange={(e) => setMinPayment(e.target.value)} style={{ marginTop: "15px", padding: "10px", boxShadow: "0 0 2px" }} />
                                <br />
                                Max Payment:
                                <input type="text" name="maxPayment" value={maxPayment} onChange={(e) => setMaxPayment(e.target.value)} style={{ marginTop: "15px", padding: "10px", boxShadow: "0 0 2px" }} />
                            </label>
                            <br />
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                                Working Hours
                                <input type="text" name="workingHours" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} />
                            </label>
                            <br />
                        </form>
                    </div>

                    <div className="ExperienceBanner">
                        <h2>Experience</h2>
                    </div>
                    <div className="Experience">
                        <form onSubmit={handleSubmit}>
                            <h4 style={{ fontSize: "25px", fontWeight: "bold", textAlign: "center", fontStyle: "italic" }}> This section is designed based on the type of the job.
                                <br />
                                It could be developed by conditional rendering.
                            </h4>
                            <label style={{ marginLeft: "490px", fontSize: "25px", fontWeight: "bold", marginTop: "7px", display: "inline-block" }}>
                                Experienced in
                                <input type="text" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px", marginLeft: "20px", borderRadius: "5px", display: "inline-block", alignItems: "center" }} />
                            </label>
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginTop: "7px", display: "inline-block", marginLeft: "60px" }}>
                                For at least
                                <input type="text" name="experienceDuration" value={experienceDuration} onChange={(e) => setExperienceDuration(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px", marginLeft: "20px", borderRadius: "5px", display: "inline-block", alignItems: "center" }} />
                            </label>
                            <label style={{ marginTop:"0px", fontSize: "25px", fontWeight: "bold", marginLeft:"960px", marginBottom: "10px" }}>
                                Upload Image
                                <input type="file" name="image" onChange={(e) => setImageUpload(e.target.files[0])} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px", marginBottom: "35px" }} />
                            </label>
                        </form>
                    </div>   
                        <button style={{ marginTop:"-20px", fontSize: "20px", padding:"10px 25px", marginBottom:"80px"}} onClick={handleUpload}>Upload Image</button>
                        <button style={{ fontSize: "35px", marginBottom:"100px"}} type="submit" onClick={handleSubmit}>POST</button>
                    </div>
            </div>
        </div>
    );
}

export default FreelanceOpt;