import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel?.name) {
      getPlacePhoto();
    }
  }, [hotel]);

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel.name,
      };

      const resp = await GetPlaceDetails(data);
      const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoRef) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error('Failed to fetch hotel photo:', error.message);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.name + ', ' + hotel?.address
      )}`}
      target="_blank"
    >
      <div className="hover:scale-103 transition-all cursor-pointer">
        <img
          src={photoUrl || '/Placeholder.jpg'}
          className="rounded-xl sm:h-50 w-50"
          alt={hotel?.name}
          onError={(e) => (e.currentTarget.src = '/Placeholder.jpg')}
        />

        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
          <h2 className="text-sm">💰{hotel?.price}/Night</h2>
          <h2 className="text-sm">⭐️ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;