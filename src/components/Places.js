import React, { useState } from 'react';
import './Places.css';
import Output from './Output';


function Places(props) {
  const [destination,setDestination] = useState("")

  const [source,setSource] = useState("")

  const [showPlaces,setShowPlaces] = useState(false)
  const [outputs,setOutputs] = useState([])


  function onChangeValue(e) {

    if((source !== "") && (destination !== "")){
      nextPage(e)

    }
    console.log("Source" + source);
    console.log("dest" + destination)
  }

  function nextPage(e)
  {

     console.log("Run the next page!")
     console.log(props.dates)
     console.log(props.currencys)
     e.preventDefault()
     async function fetchMyAPI() {
         const reqOptions = {
             method: 'GET',
             headers: {
                 "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
                 "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                 "useQueryString": true
             }
         }
        let slash = "/"
        let baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/'
        let fullURL =  baseUrl.concat(props.currencys,"/en-US/", destination, slash, source, slash, props.dates)

         let response = await fetch(fullURL, reqOptions)

         response = await response.json()

         setOutputs(response.Places)

     }
     fetchMyAPI()
     setShowPlaces(true)

  }
  return(
    <div className="places">
      <table name = "all">
        <thead>
          <tr>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody onChange={onChangeValue}>
        <tr>Sumbit
        <input type="radio" name="submit" onChange={e => setDestination(e.target.value)}/> </tr>

          <th>
            <table name = "source">
              <thead>
                <tr>
                  <th></th>
                  <th>Airport Name</th>
                  <th>Airport ID</th>
                </tr>
              </thead>
              <tbody >

                {props.places.map(place => {
                  return (<tr key={place.PlaceId}>
                    <th><input type="radio" value={place.PlaceId} name="src" onChange={e => setSource(e.target.value)}/> </th>
                    <th>{place.PlaceName}</th>
                    <th>{place.PlaceId}</th>
                  </tr>)
                })}
              </tbody>
            </table>
          </th>
          <th>
            <table name = "destination">
              <thead>
                <tr>
                  <th></th>
                  <th>Airport Name</th>
                  <th>Airport ID</th>
                </tr>
              </thead>
              <tbody >
                {props.destinations.map(destination => {
                  return (<tr key={destination.PlaceId}>
                    <th><input type="radio" value={destination.PlaceId} name="dest" onChange={e => setDestination(e.target.value)}/> </th>
                    <th>{destination.PlaceName}</th>
                    <th>{destination.PlaceId}</th>
                  </tr>)
                  })}
                </tbody>
              </table>
            </th>

          </tbody>
        </table>
        { showPlaces ? <Output outputs={outputs}></Output> : <></>}
      

      </div>
      )


    }
    export default Places;
