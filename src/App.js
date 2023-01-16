import './App.css';
import React from 'react';
import Radar from 'radar-sdk-js';
import { ReactBingmaps } from 'react-bingmaps';
import { useState,useEffect } from 'react';

function App() {
  const [locationSet, setlocationSet] = useState(false);
  const [userLocation, setuserLocation] = useState([0,0]);
  const  styleMap  = {width:  '70%', height:  '50vh', display:'inline-block'};
  const infoboxesWithPushPins = [{"location" : [26.7742,74.9646],"addHandler" : "mouseover",
  "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
  "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
  "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
}]

  useEffect(() => {
    Radar.initialize("prj_live_pk_ae938e2752f6e2305f036288d899e76fab8ef7d0");
    Radar.trackOnce(function(err, result) {
      if (!err) {
        // do something with result.location, result.events, result.user
        console.log(result);
        setuserLocation([result.location.latitude,result.location.longitude]);
        setlocationSet(true);
      }
    });
  }, [])


  return (<>
  {console.log(userLocation)}
    {locationSet === true ?
    <div style={styleMap}>
      <ReactBingmaps 
        infoboxesWithPushPins = {infoboxesWithPushPins}
        bingmapKey = "AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH"
        center = {userLocation}> 
      </ReactBingmaps>
    </div>:<>process hora hai abhi</>
    // <div className="map__container">
    //   <BingMapsReact onMapReady={({map})=>{setmapReady(true)}}
    //   bingMapsKey="AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH" />
    //   </div>
}
    </>
  );
}

export default App;
