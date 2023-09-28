import React, { createContext, useState, useEffect} from "react";
import { fetchStaffAndDocuments } from "../utils/firebase";

export const JobsListsContext = createContext({
    staff: [],
})

export const JobsListsPovider = ({children}) =>{
    const [staff, setStaff] = useState([])
    useEffect(()=>{
        const fetchStaffMap = async() =>{
            const staffMap = await fetchStaffAndDocuments();
            console.log(staffMap)
        }
        fetchStaffMap();
    }, [])
    const value = {staff}
    return(
        <JobsListsContext.Provider value = {value}> {children}</JobsListsContext.Provider>
    )
}