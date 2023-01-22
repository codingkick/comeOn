import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RecommendedAddress } from "./RecommendedAddress";
import { Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import "../styles/Form.css";
import Table from "react-bootstrap/Table";

import { selectUser } from "../state/reducers/user";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

export const EventForm = ({
  latitude,
  longitude,
  latFunc,
  lngFunc,
  loadMap,
  latFunc2,
  lngFunc2,
}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [eventName, seteventName] = useState("");
  const [eventDescription, seteventDescription] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [completeAddress, setcompleteAddress] = useState("");
  const [recommendedAddress, setrecommendedAddress] = useState([]);
  // console.log(recommendedAddress.length,recommendedAddress);

  const submitMethod = (e) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    console.log("event added");
    set(ref(db, "events/" + timestamp), {
      userEmail: user.email,
      eventName: eventName,
      eventDescription: eventDescription,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      startTime: startTime,
      endTime: endTime,
    });

    alert("event created and saved to database");
  };

  function changeEventName(e) {
    seteventName(e.target.value);
  }

  function changeEventDescription(e) {
    seteventDescription(e.target.value);
  }

  function changeCompleteAddress(e) {
    setcompleteAddress(e.target.value);
  }

  function changeLatitude(e) {
    latFunc(e);
  }

  function changeLongitude(e) {
    lngFunc(e);
  }

  function changeStartTime(e) {
    setstartTime(e.target.value);
  }

  function changeEndTime(e) {
    setendTime(e.target.value);
  }

  useEffect(() => {
    var now = new Date();
    var offset = now.getTimezoneOffset() * 60000;
    var adjustedDate = new Date(now.getTime() - offset);
    var formattedDate = adjustedDate.toISOString().substring(0, 16);
    setstartTime(formattedDate);
    setendTime(formattedDate);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (completeAddress !== "") {
          const s =
            "http://dev.virtualearth.net/REST/v1/Locations?q=" +
            completeAddress +
            "&o=json&inclnb=1&key=AixTKAvEgAki5Zwsi0SV1breMlpZHUynV3HKZJEHyBjvtoymETk1rxtTw6DvBYUH&maxResults=10";
          const response = await fetch(s);
          const data = await response.json();
          // console.log(data.resourceSets);
          if (data.resourceSets.length !== 0) {
            var tmp = [];
            for (var i = 0; i < data.resourceSets[0].resources.length; i++) {
              // console.log(data.resourceSets[i]);
              tmp.push(data.resourceSets[0].resources[i]);
            }
            setrecommendedAddress(tmp);
          }
        }
      } catch (err) {
        // console.log(err);
      }
    };
    (async () => await fetchLocation())();
  }, [completeAddress]);

  return (
    <div containerRight>
      <form method = "post" onSubmit={(e)=>{submitMethod(e)}}>
        <label className="row">
            <div className="eventName">
              <input
                type="text"
                value={eventName}
                onChange={(e) => changeEventName(e)}
                placeholder="Event Name"
                required
              />
            </div>
          </label>
          <label className="row">
            {/* Event Description: */}
            <div className="description">
              <textarea
                type="textarea"
                rows="3"
                cols="40"
                value={eventDescription}
                onChange={(e) => changeEventDescription(e)}
                placeholder="Event Description"
                required
              />
            </div>
          </label>

          <FormControl
            type="search"
            placeholder="Search Location"
            className="me-2"
            aria-label="Search"
            value={completeAddress}
            onChange={(e) => changeCompleteAddress(e)}
          />
          {recommendedAddress.map(function (item, ind) {
            return (
              <RecommendedAddress
                key={ind}
                recommended={item}
                latFunc={(val) => {
                  latFunc2(val);
                }}
                lngFunc={(val) => lngFunc2(val)}
              ></RecommendedAddress>
            );
          })}

          <Table className="table" size="sm">
                    <thead>
                      <tr>
                        <td>Latitude</td>
                        <td>Longitude</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            value={latitude}
                            onChange={(e) => changeLatitude(e)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={longitude}
                            onChange={(e) => changeLongitude(e)}
                            required />
                        </td>
                      </tr>
                    </tbody>
          </Table>

          <Table className="table" size="sm">
            <thead>
              <tr>
                <td>Start At: </td>
                <td>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => changeStartTime(e)}
                    placeholder="Select Start Time" />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ends At:</td>
                <td>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => changeEndTime(e)}
                    placeholder="Select Start Time" />
                </td>
              </tr>
            </tbody>
          </Table>

          <Table className="table" size="sm">
          <thead>
            <tr>
              <td>
                <Button
                  variant="outline-success"
                  onClick={(e) => {
                    e.preventDefault();
                    loadMap(e);
                  }}
                >
                  Search
                </Button>
              </td>
              <td>
              <input type="submit"></input>
              </td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
        
      </form>
    </div>
  );
};
