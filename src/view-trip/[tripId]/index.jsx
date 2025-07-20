import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner';
import InfoSec from '../components/InfoSec';
import Hotels from '../components/Hotels'
import DailyPlaces from '../components/DailyPlaces';
import Footer from '@/components/Footer';

const Viewtrip = () => {

  const { tripId } = useParams();

  const [trip, setTrip] = useState([])

  useEffect(() => {
    tripId && getTripData();
  }, [tripId])

  const getTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document:', docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No Trip FOund!!");
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSec trip={trip} />
      <Hotels trip={trip} />
      <DailyPlaces trip={trip} />
      <Footer trip={trip} />
    </div>
  )
}

export default Viewtrip
