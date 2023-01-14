import './App.css';
import React from 'react';
import { mappls } from  'mappls-web-maps';

function App() {
  const  styleMap  = {width:  '99%', height:  '99vh', display:'inline-block'}
  const  mapProps  = { center: [28.6330, 77.2194], traffic:  false, zoom:  4, geolocation:  false, clickableIcons:  false }
  var mapObject ;
  var mapplsClassObject=  new  mappls();

  mapplsClassObject.initialize("801cb30b77463388a85b90907f366329",()=>{
    mapObject = mapplsClassObject.Map({id:  "map", properties: mapProps});

    //load map layers/components after map load, inside this callback (Recommended)
    mapObject.on("load", ()=>{
    // Activites after mapload
    })

  });
    
  return (
    <div className="App">
      <div id="map" style={styleMap}></div>
      </div>
  );
}

export default App;
