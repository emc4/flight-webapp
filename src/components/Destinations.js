import React from 'react';
import './Places.css';

function Destinations(props) {

    return(
        <div className="destinations">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Airport ID</th>
                        <th>Airport Name</th>
                        <th>Country ID</th>
                        <th>Region ID</th>
                        <th>City ID</th>
                        <th>Country Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.places.map(place => {
                        return (<tr key={place.PlaceId}>
                            <th><button className="select">Select</button></th>
                            <th>{place.PlaceId}</th>
                            <th>{place.PlaceName}</th>
                            <th>{place.CountryId}</th>
                            <th>{place.RegionId}</th>
                            <th>{place.CityId}</th>
                            <th>{place.CountryName}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
         </div>
    )
}
export default Places;
