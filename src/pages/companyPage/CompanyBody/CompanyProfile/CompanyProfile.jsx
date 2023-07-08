import React from 'react'
import { useParams } from "react-router-dom";

const CompanyProfile = () => {
  const { compID } = useParams();

  return (
    <div>CompanyProfile {compID}</div>
  )
}

export default CompanyProfile