import React from 'react'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, SetphotoUrl] = useState()

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      SetphotoUrl(PhotoUrl);
    })
  }
  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className='hover:scale-105 transition-all '>
        <img src={photoUrl ? photoUrl : '/Placeholder.jpg'} className='grid grid-cols-3 h-50 w-50 object-cover rounded-xl' />
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget for a traveller count {trip?.userSelection?.noOfTraveller}</h2>
      </div>
    </Link>
  )
}

export default UserTripCardItem
