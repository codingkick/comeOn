import React from 'react'

export const RecommendedAddress = ({recommended}) => {
    console.log(recommended.address.adminDistrict,recommended.address.adminDistrict2,recommended.address.neighbourhood,recommended.address.countryRegion)
    
  return (
    <div>
        <li>
            {recommended.address.adminDistrict+','+recommended.address.adminDistrict2+','+recommended.address.neighbourhood+','+recommended.address.countryRegion}
        </li>
    </div>
  )
}
