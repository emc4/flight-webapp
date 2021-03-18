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
                        return (<tr key={output.QuotesID}>
                            <th>{output.Quotes}</th>
                            <th>{output.Carriers}</th>
                            <th>{output.Dates}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
         </div>
    )
}
export default Output;
