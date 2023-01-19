import React, { useEffect } from 'react'
import { useState } from 'react';
import { RecommendedAddress } from './RecommendedAddress';

export const EventForm = ({latitude,longitude,latFunc,lngFunc,loadMap}) => {

    const [eventName, seteventName] = useState("");
    const [eventDescription, seteventDescription] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
    const [completeAddress, setcompleteAddress] = useState("");
    const [recommendedAddress, setrecommendedAddress] = useState([]);
    // console.log(recommendedAddress.length,recommendedAddress);


    function changeEventName(e){
        seteventName(e.target.value);
    }

    function changeEventDescription(e){
        seteventDescription(e.target.value);
    }

    function changeCompleteAddress(e){
      setcompleteAddress(e.target.value);
    }

    useEffect(()=>{


      const fetchLocation = async ()=>{
        try{
          if(completeAddress !== '')
          {
            const s = 'http://dev.virtualearth.net/REST/v1/Locations?q='+completeAddress+'&o=json&inclnb=1&key=AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH&maxResults=10'
            const response = await fetch(s);
            const data = await response.json();
            // console.log(data.resourceSets);
            if(data.resourceSets.length !== 0)
            {
              var tmp = []
              for(var i=0;i<data.resourceSets[0].resources.length;i++)
              {
                // console.log(data.resourceSets[i]);
                tmp.push(data.resourceSets[0].resources[i])
              }
              setrecommendedAddress(tmp);
            }
          }
        }
        catch(err){
          // console.log(err);
        }
      }
      (async ()=>await fetchLocation())();

    },[completeAddress])
    
    
  return (
    <div>
        <form type="post">
              <label>Event name:
                <input type="text" value={eventName} onChange={(e)=>changeEventName(e)}/>
              </label>
              <label>Event Description:
                <input type="text" value={eventDescription} onChange={(e)=>changeEventDescription(e)}/>
              </label>
              <label>Search location:
                <input type="text" value={completeAddress} onChange={(e)=>changeCompleteAddress(e)}/>
                {
                    recommendedAddress.map(function(item,ind){
                      return(<RecommendedAddress key={ind} recommended={item}></RecommendedAddress>)
                    })
                }
              </label>
              <label>Latitude :
                <input type="text" value={latitude} onChange={(e)=>latFunc(e)}/>
              </label>
              <label>Longitude :
                <input type="text" value={longitude} onChange={(e)=>lngFunc(e)}/>
              </label>
              {/* <label>Event start time with date:
                <input type="text" value={startTime}/>
              </label>
              <label>Event end time with date:
                <input type="text" value={endTime}/>
              </label> */}
              <button onClick={(e)=>{e.preventDefault();loadMap(e)}}>search</button>
              <input type="submit" value="submit" />
        </form>
    </div>
  )
}
