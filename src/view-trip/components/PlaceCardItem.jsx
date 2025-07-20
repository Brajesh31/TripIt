import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from 'react-icons/fa6';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`;

  useEffect(() => {
    if (place?.placeName) {
      getPlacePhoto();
    }
  }, [place]);

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place.placeName,
      };

      const resp = await GetPlaceDetails(data);

      const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoRef) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error('Failed to fetch place photo:', error.message);
    }
  };

  return (
    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
      <div className="border rounded-xl p-3 mt-2 flex gap-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer ">
        <img
          src={photoUrl || '/Placeholder.jpg'}
          className="w-[100px] h-[100px] rounded-xl object-cover "
          onError={(e) => (e.currentTarget.src = '/Placeholder.jpg')}
          alt={place.placeName}
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          <h2 className="mt-2">🕒 {place.time}</h2>
          <Button size="sm" className="mt-2 flex items-center gap-1">
            <FaMapLocationDot />
            Location
          </Button>
        </div>
      </div>
    </a>
  );
};

export default PlaceCardItem;