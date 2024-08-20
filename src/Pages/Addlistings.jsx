import React, { useState } from 'react';
import venueProviderImage from '../02.jpg'; // Importing the image for Venue Provider card
import vendorImage from '../vendor-image.jpg'; // Importing the image for Vendor card

const VenueProviderForm = () => {
  const [typeOfProperty, setTypeOfProperty] = useState('');
  const [otherPropertyType, setOtherPropertyType] = useState('');
  const [nameOfPlace, setNameOfPlace] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [pinLocation, setPinLocation] = useState('');
  const [additionalServices, setAdditionalServices] = useState([]);
  const [pricing, setPricing] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [placeDescription, setPlaceDescription] = useState('');
  const [coverPicture, setCoverPicture] = useState(null);
  const [venuePictures, setVenuePictures] = useState([]);

  const handleAdditionalServicesChange = (service) => {
    setAdditionalServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  };

  const handleAmenitiesChange = (amenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((a) => a !== amenity)
        : [...prevAmenities, amenity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for Venue Provider
    console.log({
      typeOfProperty,
      otherPropertyType,
      nameOfPlace,
      city,
      address,
      state,
      postalCode,
      pinLocation,
      additionalServices,
      pricing,
      amenities,
      placeDescription,
      coverPicture,
      venuePictures,
    });
  };

  return (
    <form className="bg-zinc-200 shadow-lg p-6 rounded-md max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Venue Provider Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="typeOfProperty">
            Type of Property
          </label>
          <select
            id="typeOfProperty"
            value={typeOfProperty}
            onChange={(e) => setTypeOfProperty(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select property type</option>
            <option value="Banquet Halls">Banquet Halls</option>
            <option value="Wedding Lawns">Wedding Lawns</option>
            <option value="Villa/Farmhouse">Villa/Farmhouse</option>
            <option value="Guest houses">Guest houses</option>
            <option value="Wedding Hotels">Wedding Hotels</option>
            <option value="Other">Other</option>
          </select>
          {typeOfProperty === 'Other' && (
            <input
              type="text"
              placeholder="Please specify"
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={otherPropertyType}
              onChange={(e) => setOtherPropertyType(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameOfPlace">
            Name of Place
          </label>
          <input
            type="text"
            id="nameOfPlace"
            value={nameOfPlace}
            onChange={(e) => setNameOfPlace(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            
            <option value="">Select city</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Other">Other</option>
            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select state</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Balochistan">Balochistan</option>
            <option value="KPK">KPK</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            maxLength="5"
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pinLocation">
            Pin Location (Google Maps)
          </label>
          <input
            type="text"
            id="pinLocation"
            value={pinLocation}
            onChange={(e) => setPinLocation(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Additional Services</label>
          <div className="flex flex-wrap">
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                onChange={() => handleAdditionalServicesChange('Parking')}
              />
              <span className="ml-2">Parking</span>
            </label>
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                onChange={() => handleAdditionalServicesChange('Catering')}
              />
              <span className="ml-2">Catering</span>
            </label>
            {/* Add more checkboxes as needed */}
          </div>
        </div>

        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricing">
            Pricing
          </label>
          <input
            type="text"
            id="pricing"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Amenities</label>
          <div className="flex flex-wrap">
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                onChange={() => handleAmenitiesChange('WiFi')}
              />
              <span className="ml-2">WiFi</span>
            </label>
            <label className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                onChange={() => handleAmenitiesChange('AC/Heating')}
              />
              <span className="ml-2">AC/Heating</span>
            </label>
            {/* Add more checkboxes as needed */}
          </div>
        </div>

        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placeDescription">
            Place Description
          </label>
          <textarea
            id="placeDescription"
            value={placeDescription}
            onChange={(e) => setPlaceDescription(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Add Pictures</label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Cover Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverPicture(e.target.files[0])}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Pictures of Venue</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setVenuePictures([...venuePictures, e.target.files[0]])}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Submit
      </button>
    </form>
  );
};


//Vendor form
const VendorForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [doorToDoorService, setDoorToDoorService] = useState(false);
  const [description, setDescription] = useState('');
  const [coverPicture, setCoverPicture] = useState(null);
  const [venuePictures, setVenuePictures] = useState([]);
  const [errors, setErrors] = useState({});

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSubcategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    if (!selectedCategory) newErrors.selectedCategory = 'Category is required';
    if (!subcategory) newErrors.subcategory = 'Subcategory is required';
    if (!name) newErrors.name = 'Name is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!zipCode) newErrors.zipCode = 'Zip Code is required';
    if (!address) newErrors.address = 'Address is required';
    if (!description) newErrors.description = 'Description is required';
    if (!coverPicture) newErrors.coverPicture = 'Cover Picture is required';
    if (venuePictures.length === 0) newErrors.venuePictures = 'At least one Venue Picture is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission for Vendor
    console.log({
      selectedCategory,
      subcategory,
      name,
      city,
      state,
      zipCode,
      address,
      doorToDoorService,
      description,
      coverPicture,
      venuePictures,
    });
  };

  return (
    <form className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Vendor Form</h2>
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div
            onClick={() => handleCategorySelection('Makeups')}
            className="cursor-pointer p-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold">Makeups</h3>
          </div>
          <div
            onClick={() => handleCategorySelection('Organizer')}
            className="cursor-pointer p-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold">Organizer</h3>
          </div>
          <div
            onClick={() => handleCategorySelection('Food')}
            className="cursor-pointer p-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold">Food</h3>
          </div>
          <div
            onClick={() => handleCategorySelection('Entertainment')}
            className="cursor-pointer p-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold">Entertainment</h3>
          </div>
        </div>
      )}

      {selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Selected Category: {selectedCategory}</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a subcategory</option>
              {selectedCategory === 'Organizer' && (
                <>
                  <option value="Wedding Planners">Wedding Planners</option>
                  <option value="Decorators">Decorators</option>
                  <option value="Tent-services provider">Tent-services provider</option>
                  <option value="Audio/video">Audio/video</option>
                  <option value="Photographers">Photographers</option>
                  <option value="Other">Other</option>
                </>
              )}
              {selectedCategory === 'Food' && (
                <>
                  <option value="Catering service">Catering service</option>
                  <option value="Stalls">Stalls</option>
                  <option value="Other">Other</option>
                </>
              )}
              {selectedCategory === 'Entertainment' && (
                <>
                  <option value="DJs">DJs</option>
                  <option value="Dance">Dance</option>
                  <option value="Musicians">Musicians</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
            {errors.subcategory && <p className="text-red-500 text-xs italic">{errors.subcategory}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select city</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
              <option value="Other">Other</option>
            </select>
            {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select state</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Balochistan">Balochistan</option>
              <option value="KPK">KPK</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>
            {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength="5"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.zipCode && <p className="text-red-500 text-xs italic">{errors.zipCode}</p>}
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Door to Door Service provider?
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="doorToDoorService"
                checked={doorToDoorService}
                onChange={(e) => setDoorToDoorService(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-400 focus:outline-none"
              />
              <span className="ml-2">Yes, provide door to door service</span>
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>

          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Cover Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverPicture(e.target.files[0])}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.coverPicture && <p className="text-red-500 text-xs italic">{errors.coverPicture}</p>}
          </div>
          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pictures of Venue</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setVenuePictures([...venuePictures, ...Array.from(e.target.files)])}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.venuePictures && <p className="text-red-500 text-xs italic">{errors.venuePictures}</p>}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};




const MainApp = () => {
  const [selectedCard, setSelectedCard] = useState('');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-gray-700 font-bold text-center text-3xl font-serif mb-8">Who are you ?</h1><br></br>
      {!selectedCard && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setSelectedCard('VenueProvider')}
            className="cursor-pointer bg-gray-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 "
            style={{ height: '350px', width: '400px' , backgroundImage: `url(${venueProviderImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="p-2 bg-gray-800 bg-opacity-100 backdrop-filter backdrop-blur-lg">
              <h3 className="text-lg text-white  font-semibold">Venue Provider</h3>
            </div>
          </div>
          <div
            onClick={() => setSelectedCard('Vendor')}
            className="cursor-pointer bg-gray-200 rounded-md shadow-lg hover:shadow-lg transition-shadow duration-200"
            style={{ height: '350px',width: '400px', backgroundImage: `url(${vendorImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="p-2 bg-gray-800 bg-opacity-100 backdrop-filter backdrop-blur-lg">
              <h3 className="text-lg text-white font-semibold">Vendor</h3>
            </div>
          </div>
        </div>
      )}

      {selectedCard === 'VenueProvider' && <VenueProviderForm />}
      {selectedCard === 'Vendor' && <VendorForm />}
    </div>
  );
};

export default MainApp;