import React from 'react'
import { useState } from 'react';

export const EventForm = ({latitude,longitude,latFunc,lngFunc,loadMap}) => {

    const [eventName, seteventName] = useState("");
    const [eventDescription, seteventDescription] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");



    function changeEventName(e){
        seteventName(e.target.value);
    }

    function changeEventDescription(e){
        seteventDescription(e.target.value);
    }


    
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
