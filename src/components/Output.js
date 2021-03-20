import React from 'react';

import './Outputs.css';

function Output(props) {

  //creates constants using data passed in through props
  const flight = props.info
  const flightQuotes = flight.Quotes
  const flightSource = flight.Places
  const flightDestination = flight.Places
  const flightCurrency = flight.Currencies
  const flightCarriers = flight.Carriers

  //makes sure there are values for  all variables, returning no flights if not
  if(!flightQuotes || !flightCurrency ||!flightSource[0]
    ||!flightSource[1]||!flightDestination[0]||!flightDestination[1]){
      return(
        <div>
        There are no flights between these locations on the specified dates
        </div>
      )
    }

    //iterates through list of flight carriers to match each id to the name
    let carriersMap = new Map()
    for(let i = 0; i < flightCarriers.length; i++){
      carriersMap.set(flightCarriers[i].CarrierId, flightCarriers[i].Name)
    }

    //displays the cost, departure and return date, departure and return carrier
    //Highlighting the first row (lowest price) yellow in CSS
    return(
      <div className="out">
        <p>Flights from {flightSource[0].Name} to {flightDestination[1].Name}</p>
        <table >
          <thead>
            <tr>
              <th>Cost</th>
              <th>Departure Date (yyyy/mm/dd)</th>
              <th>Departure Carrier</th>
              <th>Return Date (yyyy/mm/dd)</th>
              <th>Return Carrier</th>
            </tr>
          </thead>
          <tbody className = "output">
            {flightQuotes.map(quote => {
            return (<tr key={quote.QuoteId}>
              <th>{flightCurrency[0].Symbol}{quote.MinPrice}</th>
              <th>{quote.OutboundLeg.DepartureDate.substring(0,10)}</th>
              <th>{carriersMap.get(quote.OutboundLeg.CarrierIds[0])}</th>
              <th>{quote.InboundLeg.DepartureDate.substring(0,10)}</th>
              <th>{carriersMap.get(quote.InboundLeg.CarrierIds[0])}</th>
            </tr>)
            })}
          </tbody>
        </table>
      </div>
    )
}
export default Output;
