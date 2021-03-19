import React from 'react';

import './Outputs.css';

function Output(props) {
  const flight = props.info
  const flightQuotes = flight.Quotes
  const flightSource = flight.Places
  const flightDestination = flight.Places
  const flightCurrency = flight.Currencies

  const flightCarriers = flight.Carriers
  console.log(props.info)
  console.log(flight)
  if(!flightQuotes || !flightSource || !flightDestination || !flightCurrency){
    return(
      <div className="output">
              There are no flights between these locations
      </div>
    )
  }

 let carriersMap = new Map()
  for(let i = 0; i < flightCarriers.length; i++){
    carriersMap.set(flightCarriers[i].CarrierId, flightCarriers[i].Name)
  }

  console.log(carriersMap)

  console.log(flightQuotes)
    return(
        <div className="out">
        <p>Flights from {flightSource[0].Name} to {flightDestination[1].Name}</p>
        <p>Sorted by Price Low to High</p>
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
