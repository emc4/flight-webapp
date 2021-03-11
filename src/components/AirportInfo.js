import React, { useState } from 'react';
import './AirportInfo.css';
import Places from './Places';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function AirportInfo() {
    const [places,setPlaces] = useState([])
    const [source,setSource] = useState("")
    const [destination,setDestination] = useState("")
    const [date,setDate] = useState("")
    const [currency,setCurrency] = useState("")

    const [showPlaces,setShowPlaces] = useState(false)

    function handleSubmit(e) {
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
            console.log("DATE" + date)

            //NOT WORKING!!
            let baseUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/"
            let slash = "/"
            let fullURL = baseUrl.concat(currency,"/en-US/?")

            let response = await fetch(fullURL + new URLSearchParams({query: source}), reqOptions)

            response = await response.json()
            console.log(response.Places)
            setPlaces(response.Places)
            console.log(places)

        }
        fetchMyAPI()
        setShowPlaces(true)
        setSource("")
        setDate("")
        setDestination("")
        setCurrency("")
    }
    return(
        <div className="airportinfo">
           <form onSubmit={handleSubmit}>
                <label htmlFor="sourceInput"> Departure State or Country:</label>
                <input id="sourceInput" value={source} onChange={e => setSource(e.target.value)} required/>
                <label htmlFor="destinationInput"> Desitination State or Country:</label>
                <input id="destinationInput" value={destination} onChange={e => setDestination(e.target.value)} required/>
                <label htmlFor="dateInput"> Departure Date:</label>
                <input id="dateInput" value={date} onChange={e => setDate(e.target.value)} required/>
                <label htmlFor="currencyInput"> Currency:</label>
                <input id="currencyInput" value={currency} onChange={e => setCurrency(e.target.value)} required/>
                {/* <label htmlFor="dateInput"> Departure Date:</label>
                 <DatePicker id="dateInput" selected={date} dateFormat="yyyy-MM-dd" onChange={e => setDate(e)}  required/>*/}
                <button className="search">Submit</button>
           </form>
           { showPlaces ? <Places places={places}></Places> : <></>}
        </div>
    )
}

export default AirportInfo;
