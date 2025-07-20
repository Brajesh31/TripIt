import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const DailyPlaces = ({ trip }) => {
  return (
    <div>
      <h2 className='font-bold text-large'>Places to Visit</h2>

      <div>
        {trip?.tripData?.travelPlan?.dailyItinerary?.map((item, index) => (
          <div className='mt-5' key={index}>
            <h2 className='font-medium text-lg'>Day {item.day}: {item.theme}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {item.activities?.map((place, idx) => (
                <div className='my-3' key={idx}>
                  <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPlaces;