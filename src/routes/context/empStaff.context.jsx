import React, { createContext, useState, useEffect} from "react";
import { fetchStaffAndDocumentsEmp } from "../utils/firebase";

export const JobsListsContextEmp = createContext({
    staff: [],
})

export const JobsListsProviderEmp = ({children}) =>{
    const [staff, setStaff] = useState([])
    useEffect(()=>{
        const fetchStaffMap = async() =>{
            const staffMap = await fetchStaffAndDocumentsEmp();
            console.log(staffMap)
        }
        fetchStaffMap();
    }, [])
    const value = {staff}
    return(
        <JobsListsContextEmp.Provider value = {value}> {children}</JobsListsContextEmp.Provider>
    )
}