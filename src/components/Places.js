import React, { useState } from 'react';
import './Places.css';
import Output from './Output';


function Places(props) {

  //creates constants to represent values
  const [destination,setDestination] = useState("")
  const [source,setSource] = useState("")
  const [showOutput,setShowOutput] = useState(false)
  const [outputs,setOutputs] = useState([])
  const sourceInfo = props.places
  const destInfo = props.destinations

  //if there are no matching sources or destinations, display invalid entry
  if(!destInfo || !sourceInfo){
    return(
      <div>
      Invalid entry
      </div>
    )
  }

  //when the user hits submit, make an API call to return the round trip
  //flights from the source to the destination
  function handleSubmit(e){
    //setup for API
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

      //sets up URL for API call using the variables passed by props
      let slash = "/"
      let baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/'
      let fullURL =  baseUrl.concat(props.currencys,"/en-US/", destination, slash, source, slash, props.dates, slash, props.returndates)

      //stores result from API call to get flights
      let response = await fetch(fullURL, reqOptions)
      response = await response.json()
      setOutputs(response)

    }

    //sets the output to visible and fetches API
    fetchMyAPI()
    setShowOutput(true)

  }
  //creates two dropdown menues, one for the source and one for the destinations
  //containing the values that the API matches to the user input
  return(
    <div className="airportSelect">
      <form onSubmit={handleSubmit}>
        <div>Source
          <select onChange={e => setSource(e.target.value)}>
            <option value="none"></option>
              {sourceInfo.map(source =>{
                return(
                  <option key = {source.PlaceId}  value = {source.PlaceId}>
                  {source.PlaceName}</option>
                )})}
          </select>
        </div>
        <div>Destination
          <select onChange={e => setDestination(e.target.value)}>
            <option value="none"></option>
              {destInfo.map(destination =>{
                return(
                  <option key = {destination.PlaceId} value = {destination.PlaceId}>
                  {destination.PlaceName}</option>
                )})}
          </select>
        </div>
        <button className="search">Submit</button>

      </form>

      { showOutput ? <Output info={outputs}></Output> : <></>}
    </div>
    )
}
export default Places;
