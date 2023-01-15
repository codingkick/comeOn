import './App.css';
import React from 'react';
import { mappls } from  'mappls-web-maps';
import { useState,useEffect } from 'react';

function App() {
  const  styleMap  = {width:  '70%', height:  '50vh', display:'inline-block'};
  
  useEffect(() => {
    

  const  mapProps  = 
  { 
    center: [28.6562, 77.2410], 
    traffic:  false, 
    zoom:  8, 
    geolocation:  true,
    clickableIcons:  true 
  }
  var mapObject ;
  var markerObject1;
  var mapplsClassObject=  new  mappls();

  mapplsClassObject.initialize("801cb30b77463388a85b90907f366329",()=>{
    mapObject = mapplsClassObject.Map({id:  "map", properties: mapProps});

    var  geoData=
{
  "type":  "FeatureCollection",
  "features": 
    [
      {
        "type":  "Feature",
        "properties":
          {
            "description":"noida",
            "icon":"https://apis.mapmyindia.com/map_v3/2.png"
          },
        "geometry": 
          {
            "type":  "Point",
            "coordinates": [28.544,77.5454]
          }
      },
      {
        "type":  "Feature",
        "properties": 
          {
            "description":"faridabad",
            "icon":"https://apis.mapmyindia.com/map_v3/2.png"
          },
        "geometry": 
          {
            "type":  "Point",
            "coordinates": [28.27189158,77.2158203125]
          }
      },
      {
        "type":  "Feature",
        "properties": 
          {
            "description":"<h1>hi</h1>",
            "icon":"https://apis.mapmyindia.com/map_v3/1.png"
          },
        "geometry": 
          {
            "type":  "Point",
            "coordinates": [28.549511,77.2678250]
          }
      }
    ]
};
    markerObject1 = mapplsClassObject.addGeoJson({
      map : mapObject,
      data : geoData,
      fitbounds : true,
      cType : 0
    })

    // var infoWindow = infoWindow = mapplsClassObject.InfoWindow({
    //   map : mapObject,
    //   position : {lat : 28.27189158,lng : 77.2158203125},
    //   content : "window here!!",
    //   class : "info_class",
    //   maxWidth : 300,
    //   closeButton : true
    // });
    markerObject1.addListener('click',function(){
      console.log('hey!!');
    })

  });

  }, [])
  
  
    
  return (
    <div className="App">
      <div id="map" style={styleMap}></div>
      </div>
  );
}

export default App;
