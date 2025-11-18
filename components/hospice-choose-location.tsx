"use client"


import React, { useEffect, useState, useRef } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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


export function ChooseLocation() {
  // Initalize the input with defaults so we don't have to use the '?' becuase we know for sure the input variables aren't undefined
  const [input, setInput] = useState<InputData>({
    streetAddress: "",
    country: "",
    zipCode: 0,
    city: "",
    state: "",
    latitude: 0,
    longitude: 0,
  });
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
      // set everything to the default values again
      setInput({
        streetAddress: "",
        country: "",
        zipCode: 0,
        city: "",
        state: "",
        latitude: 0,
        longitude: 0
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
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Choose Location</CardTitle>
              <CardDescription>
                Enter your address details to find hospice providers near you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    type="text"
                    name="streetAddress"
                    ref={inputRef}
                    value={input.streetAddress}
                    onChange={handleChange}
                    placeholder="Enter Street Address"
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
              </form>
            </CardContent>
          </Card>
        </div>
      )
    );
}
