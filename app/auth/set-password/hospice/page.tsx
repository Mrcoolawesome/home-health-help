"use client"

import React, { useEffect, useState, useRef } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

type InputData = {
  streetAddress: string,
  country: string,
  zipCode: number,
  city: string,
  state: string,
  latitude: number,
  longitude: number
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


export default function ChooseLocation() {
  const [input, setInput] = useState<InputData | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
    libraries,
  });  // need to load the maps api

  // using this useEffect to append the autocomplete things to the input field
  useEffect(() => {
    if (!isLoaded || loadError || !inputRef.current) return;

    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry"], // probably need to change this to give us the place isLoaded, we can also leave this blank to give us everything which we might have to do the first time
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
    autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

    // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
  }, [isLoaded, loadError]);

  // this is just the onChange handler for the inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((values) => {
      if (!values) return undefined;

      // convert the value to a number for the types that need that
      if (name === "zipCode" || name === "latitude" || name === "longitude") {
        return { ...values, [name]: Number(value) };
      }
      return { ...values, [name]: value };
    });
  };

  // This is just the handler for when the user selects a prediction.
  // It both ensures the prediction is valid, and then passes the data to another function that does the 
  // form filling stuff.
  const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
    if (!isLoaded) return;
    const place = address.getPlace();

    if (!place || !place.geometry) {
      setInput(undefined);
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
    const latitude = data?.geometry?.location?.lat();
    const longitude = data?.geometry?.location?.lng();

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: Number(componentMap.postal_code) || 0,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude: typeof latitude === "number" ? latitude : 0,
      longitude: typeof longitude === "number" ? longitude : 0,
    }));
  };

  return (
    isLoaded && (
      <div className="p-4 grid grid-cols-2 gap-5">
        <div className="flex flex-col w-full">
          <label className="text-md">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            ref={inputRef}
            value={input?.streetAddress || ""}
            onChange={handleChange}
            placeholder="Enter Street Address"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-md">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={input?.city || ""}
            placeholder="City"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-md">State</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            value={input?.city || ""}
            placeholder="State"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-md">Country</label>
          <input
            type="text"
            name="Country"
            onChange={handleChange}
            value={input?.city || ""}
            placeholder="Country"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-md">Zip Code</label>
          <input
            type="text"
            name="zip"
            onChange={handleChange}
            value={input?.city || ""}
            placeholder="Zip Code"
            required
          />
        </div>
      </div>
    )
  );
}
