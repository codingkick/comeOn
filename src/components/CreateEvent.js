import React from 'react'
import { ReactBingmaps } from 'react-bingmaps'
import { Container,Row,Col } from 'react-bootstrap'
import { Header } from './Header'
import { useState,useEffect } from 'react'
import { EventForm } from './EventForm'

export const CreateEvent = () => {

  const [infoboxesWithPushPins, setinfoboxesWithPushPins] = useState([]);
  const [userLocation, setuserLocation] = useState([0,0]);
  const [done, setdone] = useState("false");
  const [lat, setlat] = useState(0);
  const [lng, setlng] = useState(0);
  const styleMap = {height:'70vh'};


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      console.log(position.coords);
      setuserLocation([latitude,longitude]);
      setlat(latitude);
      setlng(longitude);
    });

    }, [])

    useEffect(() => {
      if(userLocation[0]!==0 && userLocation[1]!==0){
        console.log(userLocation)
        setinfoboxesWithPushPins([
          {color:"yellow",location : userLocation,addHandler : "mouseover",
          "infoboxOption": { title: 'Event Location', description: 'Event location is this' },
          "pushPinOption":{ title: 'Event pin', description: 'Pin' },
          "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
          }
        ]);
        setdone("true");
      }
    }, [userLocation])
    
    const latChange = (event)=>{
      setlat(event.target.value);
    }

    const lngChange = (event)=>{
      setlng(event.target.value);
    }
  
    const latChange2 = (val)=>{
      setlat(val);
    }
    const lngChange2 = (val)=>{
      setlng(val);
    }
    const loadMapAgain = (event)=>{
      setdone("false");
      setuserLocation([parseFloat(lat),parseFloat(lng)]);
    }
    
    function shiftMarker(location){
      setdone("false");
      setlat(location.latitude);
      setlng(location.longitude);
      setuserLocation([location.latitude,location.longitude]);
    }

  return (
    <div>
      <Header></Header>
      <br/>
      <Container>
        <Row>
          <Col xs = {18} md={8} style={styleMap}>
          {done==="false"? <>nothing</>:<ReactBingmaps
              infoboxesWithPushPins = {infoboxesWithPushPins}
              bingmapKey = "AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH"
              center = {userLocation}
              zoom = {17}
              mapTypeId = {"aerial"}
              getLocation = {
                {
                  type : "click",callback:(location)=>shiftMarker(location)
                }
              }
              > 
            </ReactBingmaps>}
          </Col>

          <Col xs = {18} md={4}>
            <EventForm latitude={lat} longitude={lng} latFunc={latChange} lngFunc={lngChange} loadMap={loadMapAgain} latFunc2={latChange2} lngFunc2={lngChange2}></EventForm>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}
