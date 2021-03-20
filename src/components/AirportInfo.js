import React, { useState } from 'react';
import './AirportInfo.css';
import Places from './Places';


function AirportInfo() {


  //sets the values that will be passed to places
  const [places,setPlaces] = useState([])
  const [destinations,setDestinations] = useState([])
  const [dates,setDates] = useState([])
  const [returndates,setReturnDates] = useState([])
  const [currencys,setCurrencys] = useState([])

  //sets the values that will be set when data entered
  const [source,setSource] = useState("")
  const [destination,setDestination] = useState("")
  const [date,setDate] = useState("")
  const [returndate,setReturnDate] = useState("")
  const [currency,setCurrency] = useState("")
  const [showPlaces,setShowPlaces] = useState(false)

  //When the user submits the locations the API is called
  function handleSubmit(e) {

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

      //builds up URL needed to make API call
      let baseUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/"
      let fullURL = baseUrl.concat(currency,"/en-US/?")

      //stores the results when the source locations are found
      let response = await fetch(fullURL + new URLSearchParams({query: source}), reqOptions)
      response = await response.json()

      //stores the result when the destination locations are found
      let output = await fetch(fullURL + new URLSearchParams({query: destination}), reqOptions)
      output = await output.json()

      //sets all values that will be passed to places
      setPlaces(response.Places)
      setDestinations(output.Places)
      setDates(date)
      setReturnDates(returndate)
      setCurrencys(currency)
    }

    //resets values and makes the places visible
    fetchMyAPI()
    setShowPlaces(true)
    setSource("")
    setDate("")
    setReturnDate("")
    setDestination("")
    setCurrency("")
  }
  return(
    //Creates form with labels for user to enter flight options
    <div className="airportinfo">
       <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="sourceInput"> Departure State or Country:</label>
              <input id="sourceInput" value={source} onChange={e => setSource(e.target.value)} required/>
            </div>
            <div>
              <label htmlFor="destinationInput"> Desitination State or Country:</label>
              <input id="destinationInput" value={destination} onChange={e => setDestination(e.target.value)} required/>
            </div>
            <div>
              <label htmlFor="dateInput"> Departure Date:</label>
              <input id="dateInput" placeholder = "yyyy-mm-dd" value={date} onChange={e => setDate(e.target.value)} required/>
            </div>
            <div>
              <label htmlFor="returndateInput"> Return Date:</label>
              <input id="returndateInput" placeholder = "yyyy-mm-dd" value={returndate} onChange={e => setReturnDate(e.target.value)} required/>
            </div>
            <div>
              <label htmlFor="currencyInput"> Currency:</label>
              <input id="currencyInput" value={currency} onChange={e => setCurrency(e.target.value)} required/>
            </div>
            <button className="search">Submit</button>
       </form>
       { showPlaces ? <Places places={places} destinations = {destinations} dates = {dates} returndates = {returndates} currencys = {currencys}></Places> : <></>}
    </div>
    )
}
export default AirportInfo;
