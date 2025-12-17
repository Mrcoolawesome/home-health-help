"use client"

import React, { useEffect, useState, useRef } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/base-ui/card";
import { Input } from "@/components/base-ui/input";
import { Label } from "@/components/base-ui/label";
import { SetPasswordHospice } from "./hospice-sign-up-form";

const libraries: Libraries = ["places"];

type InputData = {
  streetAddress: string,
  country: string,
  zipCode: number,
  city: string,
  state: string,
  placeId: string,
  phoneNum: string
}

type ComponentMapKey =
  | "subPremise"
  | "premise"
  | "street_number"
  | "route"
  | "country"
  | "postal_code"
  | "administrative_area_level_2"
  | "administrative_area_level_1";


export function ChooseLocation() {
  // Initalize the input with defaults so we don't have to use the '?' becuase we know for sure the input variables aren't undefined
  const [input, setInput] = useState<InputData>({
    streetAddress: "",
    country: "",
    zipCode: 0,
    city: "",
    state: "",
    placeId: "", // it's not guaranteed that a place will have an id
    phoneNum: ""
  });
  const [confirmed, setConfirmed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
    libraries,
  });  // need to load the maps api

  // This is just the handler for when the user selects a prediction.
  // It both ensures the prediction is valid, and then passes the data to another function that does the 
  // form filling stuff.
  const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
    if (!isLoaded) return;
    const place = address.getPlace();

    if (!place) {
      // set everything to the default values again
      setInput({
        streetAddress: "",
        country: "",
        zipCode: 0,
        city: "",
        state: "",
        placeId: "",
        phoneNum: ""
      });
      return;
    }
    formData(place);
  };

  // Function that does the form filling
  const formData = (data: google.maps.places.PlaceResult) => {
    const addressComponents = data?.address_components;

    const componentMap = {
      subPremise: "",
      premise: "",
      street_number: "",
      route: "",
      country: "",
      postal_code: "",
      administrative_area_level_2: "",
      administrative_area_level_1: "",
    };

    if (addressComponents) {
      for (const component of addressComponents) {
        const componentType = component.types[0] as ComponentMapKey;
        if (componentMap.hasOwnProperty(componentType)) {
          componentMap[componentType] = component.long_name;
        }
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: Number(componentMap.postal_code) || 0,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      placeId: data.place_id ?? "", // not gaurenteed to get a place id
      phoneNum: data.formatted_phone_number ?? "",
    }));

  };

  // using this useEffect to append the autocomplete things to the input field
  useEffect(() => {
    if (!isLoaded || loadError || !inputRef.current) return;

    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "place_id", "formatted_phone_number"], // probably need to change this to give us the place isLoaded, we can also leave this blank to give us everything which we might have to do the first time
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
    autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

    // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
  }, [isLoaded, loadError, confirmed, handlePlaceChanged]);

  // this is just the onChange handler for the inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((values) => {
      if (name === "zipCode") {
        return { ...values, [name]: Number(value) };
      }
      return { ...values, [name]: value };
    });
  };


  return (
    isLoaded && (
      (!input.placeId || !confirmed) ? (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Choose Location</CardTitle>
                  <CardDescription>
                    Enter your hospice&apos;s main office address so we know who you are.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-6" onSubmit={e => {
                    e.preventDefault();
                    // Only allow confirmation if placeId is set
                    if (input.placeId) {
                      setConfirmed(true);
                    }
                  }}>
                    <div className="grid gap-2">
                      <Label htmlFor="streetAddress">Address</Label>
                      <Input
                        id="streetAddress"
                        type="text"
                        name="streetAddress"
                        ref={inputRef}
                        value={input.streetAddress}
                        onChange={handleChange}
                        placeholder="Enter hospice name from Google Maps"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        name="city"
                        value={input.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        type="text"
                        name="state"
                        value={input.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        name="country"
                        value={input.country}
                        onChange={handleChange}
                        placeholder="Country"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        type="text"
                        name="zipCode"
                        value={input.zipCode === 0 ? "" : input.zipCode.toString()}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phoneNum">Phone Number</Label>
                      <Input
                        id="phoneNum"
                        type="text"
                        name="phoneNum"
                        value={input.phoneNum}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded mt-2 disabled:opacity-50"
                      disabled={!input.placeId}
                    >
                      Next
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <SetPasswordHospice placeId={input.placeId} phoneNum={input.phoneNum} onBack={() => {
          setConfirmed(false);

        }} />
      )
    )
  );
}
