'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Installation {
  id: string
  name: string
  location_lat: number
  location_lng: number
  country: string
  region: string
  community: string
  kit_type: string
  capacity_kwh: number
  waste_processed_kg: number
  energy_generated_kwh: number
  co2_saved_tons: number
  status: string
}

interface InteractiveMapProps {
  installations: Installation[]
}

// Custom icons for different kit types
const createCustomIcon = (kitType: string) => {
  const colors = {
    'Bio-Gas Digester': '#22c55e',
    'Pyrolysis Unit': '#f59e0b',
    'Solar Hybrid': '#3b82f6',
    'Gasifier': '#8b5cf6',
    'default': '#6b7280'
  }

  const color = colors[kitType as keyof typeof colors] || colors.default

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>
      </div>
      <style>
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      </style>
    `,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

// Component to fit map bounds to installations
const FitBounds = ({ installations }: { installations: Installation[] }) => {
  const map = useMap()

  useEffect(() => {
    if (installations.length > 0) {
      const bounds = L.latLngBounds(
        installations.map(installation => [
          installation.location_lat,
          installation.location_lng
        ])
      )
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [installations, map])

  return null
}

const InteractiveMap = ({ installations }: InteractiveMapProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-full bg-gray-200 animate-pulse rounded-xl" />
  }

  // Default center (Nairobi, Kenya)
  const defaultCenter: [number, number] = [-1.2921, 36.8219]

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <FitBounds installations={installations} />
      
      {installations.map((installation) => (
        <Marker
          key={installation.id}
          position={[installation.location_lat, installation.location_lng]}
          icon={createCustomIcon(installation.kit_type)}
        >
          <Popup className="custom-popup">
            <div className="p-2 min-w-[250px]">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {installation.name}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Location:</div>
                  <div className="font-medium">{installation.community}, {installation.region}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Type:</div>
                  <div className="font-medium">{installation.kit_type}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Capacity:</div>
                  <div className="font-medium">{installation.capacity_kwh} kWh</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Status:</div>
                  <div className={`font-medium ${
                    installation.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {installation.status}
                  </div>
                </div>
              </div>
              
              <hr className="my-3" />
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Impact Metrics</h4>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waste Processed:</span>
                    <span className="font-medium text-green-600">
                      {installation.waste_processed_kg.toLocaleString()} kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Generated:</span>
                    <span className="font-medium text-blue-600">
                      {installation.energy_generated_kwh.toLocaleString()} kWh
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">CO₂ Saved:</span>
                    <span className="font-medium text-emerald-600">
                      {installation.co2_saved_tons} tons
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="mt-3 w-full bg-primary-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors duration-200">
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default InteractiveMap