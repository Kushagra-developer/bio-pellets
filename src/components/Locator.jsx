import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { getDistance } from 'geolib';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import plantsData from '../data/plantsData.json';

// ✅ Razorpay checkout script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Locator = () => {
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pincode, setPincode] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [map, setMap] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paying, setPaying] = useState(false);

  const MAX_RADIUS_METERS = 30000;

  // ✅ Read from environment variables (Vite uses import.meta.env)
  const openCageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  const onMapLoad = useCallback((mapInstance) => setMap(mapInstance), []);

  const locatePlants = (userLocation) => {
    setUserCoords(userLocation);
    const nearbyPlants = plantsData
      .map((plant) => ({
        ...plant,
        distance: getDistance(userLocation, {
          latitude: plant.latitude,
          longitude: plant.longitude,
        }),
      }))
      .filter((plant) => plant.distance <= MAX_RADIUS_METERS)
      .sort((a, b) => a.distance - b.distance);

    setFilteredPlants(nearbyPlants);
    setLoading(false);
  };

  const handleUseCurrentLocation = () => {
    setLoading(true);
    setError('');
    setFilteredPlants([]);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        locatePlants(userLocation);
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  const handleUsePincode = async () => {
    setLoading(true);
    setError('');
    setFilteredPlants([]);

    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: { key: openCageApiKey, q: pincode, countrycode: 'in', limit: 1 },
      });

      const result = response.data.results[0];
      if (result) {
        const coords = {
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
        };
        locatePlants(coords);
      } else {
        setError('Unable to find location for this pincode.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching location for pincode.');
      setLoading(false);
    }
  };

  // ✅ Razorpay Integration
  const handleRazorpayPayment = async () => {
    setPaying(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert('❌ Razorpay SDK failed to load. Check your internet connection.');
      setPaying(false);
      return;
    }

    const options = {
      key: razorpayKey, // ✅ now loaded from .env
      amount: 100,
      currency: 'INR',
      name: 'Bio Pellet Locator',
      description: 'Access Plant Locator',
      image: 'https://yourlogo.url/logo.png',
      handler: function (response) {
        alert('✅ Payment successful!');
        setPaymentComplete(true);
      },
      prefill: {
        name: 'Kushagra',
        email: 'kushagra@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#2b6777',
      },
      modal: {
        ondismiss: () => {
          alert('Payment cancelled ❌');
          setPaying(false);
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setPaying(false);
  };

  // ✅ Before payment complete: show paywall
  if (!paymentComplete) {
    return (
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '30px',
          fontFamily: 'Segoe UI, sans-serif',
          backgroundColor: '#f5f7fa',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2b6777', marginBottom: '20px' }}>
          Complete Payment to Access Plant Locator
        </h2>

        <button
          onClick={handleRazorpayPayment}
          disabled={paying}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: paying ? '#94b8b5' : '#2b6777',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: paying ? 'not-allowed' : 'pointer',
          }}
        >
          {paying ? 'Processing Payment...' : 'Pay with Razorpay'}
        </button>
      </div>
    );
  }

  // ✅ After payment: show locator map
  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f5f7fa',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2b6777',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        🌿 Bio Pellet Plant Locator
      </h2>

      <button
        onClick={handleUseCurrentLocation}
        style={{
          backgroundColor: '#52ab98',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 20px',
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        📍 Use My Current Location
      </button>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Or enter your Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={{
            padding: '10px',
            width: '220px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleUsePincode}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2b6777',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          🔍 Search by Pincode
        </button>
      </div>

      {loading && <p style={{ fontStyle: 'italic', color: '#555' }}>Loading nearby plants...</p>}
      {error && <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{error}</p>}

      {isLoaded && userCoords && (
        <div
          style={{
            height: '400px',
            marginTop: '20px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <GoogleMap
            center={{ lat: userCoords.latitude, lng: userCoords.longitude }}
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={onMapLoad}
          >
            <Marker
              position={{ lat: userCoords.latitude, lng: userCoords.longitude }}
              label={{ text: 'You', color: 'white', fontWeight: 'bold' }}
              icon={
                window.google
                  ? {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      fillColor: '#4285F4',
                      fillOpacity: 1,
                      strokeWeight: 2,
                      strokeColor: 'white',
                    }
                  : undefined
              }
            />
            {filteredPlants.map((plant, idx) => (
              <Marker key={idx} position={{ lat: plant.latitude, lng: plant.longitude }} title={plant.name} />
            ))}
          </GoogleMap>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <h4>{plant.name}</h4>
              <p>
                {plant.address}, {plant.city}, {plant.state} - {plant.pincode}
              </p>
              <p>📍 Distance: {(plant.distance / 1000).toFixed(2)} km</p>
            </div>
          ))
        ) : (
          !loading && <p style={{ textAlign: 'center', color: '#777' }}>No bio pellet plants found within 30 km radius.</p>
        )}
      </div>
    </div>
  );
};

export default Locator;
