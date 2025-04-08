"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = () => {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { fill: "#D6D6DA", stroke: "#FFFFFF" },
                hover: { fill: "#F53", stroke: "#FFFFFF" },
                pressed: { fill: "#E42", stroke: "#FFFFFF" },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;
