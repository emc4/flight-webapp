import React, { useState } from 'react';
import './Places.css';
import Output from './Output';


function Places(props) {
  const [destination,setDestination] = useState("")
  const [source,setSource] = useState("")
  const [showOutput,setShowOutput] = useState(false)
  const [outputs,setOutputs] = useState([])
  const sourceInfo = props.places
  const destInfo = props.destinations

  console.log(sourceInfo)
  console.log(destInfo)

  if(!destInfo || !sourceInfo){
    return(
      <div>
      Invalid entry
      </div>
    )
  }


  function handleSubmit(e)
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
        let fullURL =  baseUrl.concat(props.currencys,"/en-US/", destination, slash, source, slash, props.dates, slash, props.returndates)

         let response = await fetch(fullURL, reqOptions)

         response = await response.json()

         setOutputs(response)

     }
     fetchMyAPI()
     setShowOutput(true)

  }
  return(
    <div className="airportSelect">
    <form onSubmit={handleSubmit}>
      <select onChange={e => setSource(e.target.value)}>
      <option value="none">—</option>

        {sourceInfo.map(source =>{
          return(
            <option key = {source.PlaceId}  value = {source.PlaceId}>{source.PlaceName}</option>
          )})}
      </select>
        <select onChange={e => setDestination(e.target.value)}>
        <option value="none"></option>

          {destInfo.map(destination =>{
            return(
              <option key = {destination.PlaceId} value = {destination.PlaceId}>{destination.PlaceName}</option>
            )})}
        </select>
        <button className="search">Submit</button>

      </form>

        { showOutput ? <Output info={outputs}></Output> : <></>}



      </div>
      )


    }
    export default Places;
