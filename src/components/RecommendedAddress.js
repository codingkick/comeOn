import React from 'react'

export const RecommendedAddress = ({recommended,latFunc,lngFunc}) => {
    // console.log(recommended.address.adminDistrict,recommended.address.adminDistrict2,recommended.address.neighbourhood,recommended.address.countryRegion)
    
  return (
    <div>
          <button onClick={(e)=>{
            e.preventDefault();
            // console.log(recommended.point.coordinates);
            latFunc(recommended.point.coordinates[0]);
            lngFunc(recommended.point.coordinates[1]);
            }}>
          {recommended.address.adminDistrict+','+recommended.address.adminDistrict2+','+recommended.address.neighbourhood+','+recommended.address.countryRegion}
          </button>
    </div>
  )
}
