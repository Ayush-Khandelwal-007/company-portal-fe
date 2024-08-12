import React from 'react'
import {useParams} from "react-router-dom";

const CandidateDetails = () => {
    const {id} = useParams();
    return (
    <div>CandidateDetails {id}</div>
    )
}

export default CandidateDetails