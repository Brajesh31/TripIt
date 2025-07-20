import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuShare } from "react-icons/lu";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { toast } from "sonner";

const InfoSec = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState("/Placeholder.jpg");

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            getPlacePhoto();
        }
    }, [trip]);

    const getPlacePhoto = async () => {
        try {
            const data = { textQuery: trip.userSelection.location.label };
            const resp = await GetPlaceDetails(data);
            const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;

            if (photoRef) {
                setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoRef));
            } else {
                console.warn("No photo found – using placeholder");
            }
        } catch (err) {
            console.error("Place photo fetch failed:", err);
        }
    };


    const handleShare = async () => {
        const shareData = {
            title: `Trip to ${trip?.userSelection?.location?.label}`,
            text: `Check out this ${trip?.userSelection?.noOfDays}-day trip plan to ${trip?.userSelection?.location?.label}!`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                toast.success("📋 Link copied to clipboard");
            }
        } catch (err) {
            console.error("Sharing failed:", err);
        }
    };


    return (
        <div>
            <img
                src={photoUrl}
                className="h-[400px] w-full object-cover rounded-xl"
                onError={(e) => (e.currentTarget.src = "/Placeholder.jpg")}
                alt={trip?.userSelection?.location?.label}
            />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location?.label}
                    </h2>

                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip.userSelection?.noOfDays} Days
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💵 {trip.userSelection?.budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🧳 Travellers: {trip.userSelection?.noOfTraveller}
                        </h2>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button onClick={handleShare} className="flex items-center gap-1">
                        <LuShare /> Share
                    </Button>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success(" Link copied to clipboard!");
                        }}
                        className="flex items-center gap-1"
                        variant="outline"
                    >
                        📋 Copy Link
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InfoSec;