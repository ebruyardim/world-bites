"use client";

import type React from "react";

import { useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// URL to a topojson world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const mapRef = useRef<HTMLDivElement>(null);

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  }

  function handleMoveEnd(position: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPosition(position);
  }

  function handleCountryClick(countryName: string) {
    setSelectedCountry(countryName);
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
        >
          -
        </button>
      </div>

      <div
        className="h-[500px] w-full relative"
        ref={mapRef}
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 150,
          }}
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName =
                    geo.properties.name || geo.properties.NAME || "Unknown";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleCountryClick(countryName)}
                      onMouseEnter={() => {
                        setTooltipContent(countryName);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill:
                            selectedCountry === countryName
                              ? "#FF6B9D"
                              : "#D6E8FF",
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: "#FFB6C1",
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#FF6B9D",
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltipContent && (
          <div
            className="absolute bg-white px-2 py-1 rounded shadow-md text-sm pointer-events-none z-10"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: "translate(10px, -100%)",
              marginTop: "-10px",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
}
