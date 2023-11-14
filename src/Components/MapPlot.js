import React from "react";
import {ComposableMap,Geographies,Geography} from "react-simple-maps";
//used to change up state names to abbr and back, couldve made an object but im lazy
const states = require('us-state-converter');
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const MapPlot = ({ data }) => {
  const fullStateNames = data.map(warehouse => {
    return states.fullName(warehouse.warehouse_state);
  })
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill={fullStateNames.includes(geo.properties.name) ? "#9DC183" : "grey"}
              />
            ))}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapPlot;
