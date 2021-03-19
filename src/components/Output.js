import React, { useState} from 'react';
import './Places.css';

function Output(props) {
  const [showPlaces,setShowPlaces] = useState(false)


    return(
        <div className="output">
            <table>
                <thead>
                    <tr>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>Carrier</th>
                    </tr>
                </thead>
                <tbody>
                    {props.outputs.map(output => {
                        return (<tr key={output.QuoteId}>
                            <th>{output.Price}</th>
                            <th>{output.Name}</th>
                            <th>{output.DepartureDate}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
         </div>
    )
}
export default Output;
