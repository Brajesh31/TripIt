import React, { useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudget, SelectTravelersList } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTravelPlan } from '../service/AImodel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }


    if (formData?.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.noOfTraveller) {
      toast("Please fill all the details")
    } else {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveller}', formData?.noOfTraveller)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays)



      const result = await generateTravelPlan(FINAL_PROMPT);
      const text = result?.response?.text();

      console.log("Gemini Response:", text);

      if (!result) {
        toast.error("⚠️ AI did not return a valid JSON plan");
        setLoading(false);
        return;
      }
      console.log("Gemini Response:", result);   // already parsed
      + await SaveAiTrip(result);

      setLoading(false);

    }
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId)

  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      onGenerateTrip();
    })
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️ 🌴 🌊 🏔️ !!</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide us some basic information, and your trip planner will generate a customized itinerary based on your preferences.</p>
      <div>
        <div className='mt-20 flex flex-col gap-10'>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              placeholder: 'Search for your dream destination...',
              place,
              onChange: (value) => { setPlace(value); handleInputChange('location', value) },
              isClearable: true,
            }}
          />

          <h2 className='text-3xl my-3 font-medium'>How many days are you planning to stay/trip?</h2>
          <Input placeholder={'Eg: 3'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>
      </div>

      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>What is your Budget? <br /> The budget is exclusively allocated for activities and dining purposes.</h2>
        <div className='grid grid-cols-3 gap-3 mt-5'>
          {SelectBudget.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
            ${formData?.budget == item.title && 'shadow-lg bg-gray-300 border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-600'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>How many people are you planning to travell with?</h2>
        <div className='grid grid-cols-3 gap-3 mt-5'>
          {SelectTravelersList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('noOfTraveller', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
            ${formData?.noOfTraveller == item.people && 'shadow-lg bg-gray-300 border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-600'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} className="hover: cursor-pointer" onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className='w-10' src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign In to the app to proceed with Google authentication securely!</p>
              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 itms-center hover:cursor-pointer'>

                <FcGoogle />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip;

/* <GooglePlacesAutocomplete
  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
  selectProps={{
    placeholder: 'Search for a city...',
    onChange: (place) => console.log('Selected place:', place),
    isClearable: true,
  }}
/> */