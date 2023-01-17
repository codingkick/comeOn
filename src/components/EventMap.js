import React from 'react'
import Radar from 'radar-sdk-js';
import { ReactBingmaps } from 'react-bingmaps';
import { useState,useEffect } from 'react';
import { Header } from './Header';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { app } from '../firebase';
import { getDatabase, ref, onValue} from "firebase/database";

export const EventMap = () => {
  // console.log(app);
  const db = getDatabase();
  const eventRef = ref(db,'events/');
  onValue(eventRef,(snapshot)=>{
    const data = snapshot.val();
    console.log(data);
  },{
    onlyOnce : true
  });

  const styleMap = {position : 'absolute',width:'90vw',height:'80vh',left:'5vw',top:'10vh'};
    const [locationSet, setlocationSet] = useState(false);
    const [userLocation, setuserLocation] = useState([26.7742,74.9646]);
    // const infoboxesWithPushPins = [{location : userLocation,addHandler : "mouseover",
    // "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
    // "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
    // "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
    // }]
    const [infoboxesWithPushPins, setinfoboxesWithPushPins] = useState([])
    useEffect(() => {
        Radar.initialize("prj_live_pk_ae938e2752f6e2305f036288d899e76fab8ef7d0");
        Radar.trackOnce(function(err, result) {
          if (!err) {
            // do something with result.location, result.events, result.user
            setuserLocation([result.location.latitude,result.location.longitude]);
          }
          else
          {
            console.log(err);
          }
        });
      }, [])

      useEffect(() => {
        // console.log("hey")
        setinfoboxesWithPushPins(state=>[...state,
          {location : userLocation,addHandler : "mouseover",
          "infoboxOption": { title: 'Your Location', description: 'Infobox' },
          "pushPinOption":{ title: 'You', description: 'Pin' },
          "infoboxAddHandler" : {"type" : "click",callback : function(){console.log("more details")}}
          }
        ]);
        setlocationSet(true);
      }, [])
      

      return (<>
        {console.log(infoboxesWithPushPins)}
          {locationSet === true ?
          <div style={styleMap}>
            <ReactBingmaps
              infoboxesWithPushPins = {infoboxesWithPushPins}
              bingmapKey = "AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH"
              center = {userLocation}
              zoom = {14}
              mapTypeId = {"road"}
              > 
            </ReactBingmaps>
            <br/>
            <Container>
              <Row>
                <Col md={4}></Col>
                <Col md={4} xs={18}><Button>Add an event on map</Button></Col>
                <Col md={4}></Col>
              </Row>
            </Container>
          </div>:<div>processing...</div>
      }
          </>
        );
}
