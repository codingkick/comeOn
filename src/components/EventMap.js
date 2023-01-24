import React from 'react'
import Radar, { async } from 'radar-sdk-js';
import { ReactBingmaps } from 'react-bingmaps';
import { useState,useEffect } from 'react';
import { Header } from './Header';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { app,db } from '../firebase';
import { getDatabase, ref, onValue} from "firebase/database";
import { useHistory } from 'react-router-dom';

export const EventMap = () => {
  // console.log(app);

  const [city,setcity] = useState("Jaipur");
  useEffect(()=>{
    const eventRef = ref(db,'events/');
    onValue(eventRef,(snapshot)=>{
      const data = snapshot.val();
      // console.log(data);
      Object.entries(data).map(function(val,ind){
        console.log(val[1]);
        const func2 = async()=>{
          try{
            const t = "http://dev.virtualearth.net/REST/v1/Locations/"+ val[1].latitude+","+val[1].longitude +"?o=json&key=AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH";
            const res = await fetch(t);
            const d = await res.json();
            if(d.resourceSets[0].resources[0].address.adminDistrict2 === city)
            {
              setinfoboxesWithPushPins(state=>[...state,
                  {location : [val[1].latitude,val[1].longitude],addHandler : "mouseover",
                  "infoboxOption": { title: 'event loc', description: 'Infobox' },
                  "pushPinOption":{ title: 'event', description: 'Pin' },
                  "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
                  }
                ]);
            }
          }
          catch(err){
            console.log(err);
          }
        }

        (async ()=>await func2())();
        
      })
    },{
      onlyOnce : true
    });

  },[city])

  const history = useHistory();
  // console.log(history);
  const styleMap = {position : 'absolute',width:'90vw',height:'80vh',left:'5vw',top:'10vh'};
    const [locationSet, setlocationSet] = useState(false);
    const [userLocation, setuserLocation] = useState([0,0]);
    // const infoboxesWithPushPins = [{location : userLocation,addHandler : "mouseover",
    // "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
    // "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
    // "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
    // }]
    const [infoboxesWithPushPins, setinfoboxesWithPushPins] = useState([])
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(position.coords);
        setuserLocation([latitude,longitude]);
      });

      }, [])

      useEffect(() => {
        if(userLocation[0]!==0 && userLocation[1]!==0){
          console.log(userLocation)
          setinfoboxesWithPushPins(state=>[...state,
            {location : userLocation,addHandler : "mouseover",
            "infoboxOption": { title: 'Your Location', description: 'Infobox' },
            "pushPinOption":{ title: 'You', description: 'Pin' },
            "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
            }
          ]);
          setlocationSet(true);
        }
        
      }, [userLocation])
      
      
      // console.log("city : ",city);

      useEffect(()=>{
        // console.log(userLocation);
        const func = async()=>{
          try{
            const s = "http://dev.virtualearth.net/REST/v1/Locations/"+ userLocation[0]+","+userLocation[1] +"?o=json&key=AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH";
            const response = await fetch(s);
            const data = await response.json();
            // console.log(data);
            setcity(data.resourceSets[0].resources[0].address.adminDistrict2);
          }
          catch(err)
          {
            console.log(err);
          }
        }
        if(userLocation[0] !== 0 || userLocation[1] !== 0)
        {
          (async ()=>await func())();
        }
      },[userLocation])

      return (<>
        {console.log(infoboxesWithPushPins)}
          {locationSet === true ?
          <div style={styleMap}>
            <ReactBingmaps
              infoboxesWithPushPins = {infoboxesWithPushPins}
              bingmapKey = "AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH"
              center = {userLocation}
              zoom = {18}
              mapTypeId = {"aerial"}
              regularPolygons = {
                [
                  {
                    "center":userLocation,
                    "radius":10,
                    "points":30,
                    "option": {fillColor: 'rgba(161,224,255,0.4)', strokeThickness: 0}
                  }
                ]
              }
              > 
            </ReactBingmaps>
            <br/>
            <Container>
              <Row>
                <Col md={4}></Col>
                <Col md={4} xs={18}><Button onClick={function(){history.push('/createEvent')}}>Add an event on map</Button></Col>
                <Col md={4}></Col>
              </Row>
            </Container>
          </div>:<div>processing...</div>
      }
          </>
        );
}


//http://dev.virtualearth.net/REST/v1/Locations?q=jaipur+railway+station%2C+india&o=json&inclnb=1&key=AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH&maxResults=10