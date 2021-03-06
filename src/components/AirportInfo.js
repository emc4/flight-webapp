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
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/referral/v1.0/%7Bcountry%7D/%7Bcurrency%7D/%7Blocale%7D/%7Boriginplace%7D/%7Bdestinationplace%7D/%7Boutboundpartialdate%7D/%7Binboundpartialdate%7D?shortapikey=ra66933236979928&apiKey=%7Bshortapikey%7D" + new URLSearchParams({query: source, destination, date}), reqOptions)
            response = await response.json()
            console.log(response)
            //setPlaces(response)
        }
        fetchMyAPI()
        setShowPlaces(true)
        setSource("")
        setDate("")
        setDestination("")
    }

    return(
        <div className="airportinfo">
           <form onSubmit={handleSubmit}>
                <label htmlFor="sourceInput"> Departure State or Country:</label>
                <input id="sourceInput" value={source} onChange={e => setSource(e.target.value)} required/>
                <label htmlFor="destinationInput"> Desitination State or Country:</label>
                <input id="destinationInput" value={destination} onChange={e => setDestination(e.target.value)} required/>
                <label htmlFor="dateInput"> Departure Date:</label>
                <DatePicker id="dateInput" selected={date} onChange={e => setDate(e)} dateFormat="yyyy-MM-dd" required
                />
                <button className="search">Submit</button>
           </form>
           { showPlaces ? <Places places={places}></Places> : <></>}
        </div>
    )
}

export default AirportInfo;
