import React, { useState } from "react";

const Checkout = () => {
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const totalAmount = 45.0; // Assuming the amount is in dollars
  const shippingCost = 5.0;
  const vat = 9.0;
  const grandTotal = (totalAmount + shippingCost + vat).toFixed(2);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to a server
    alert("Checkout Successful!");
  };

  return (
    <div className="flex flex-col md:flex-row  justify-between max-w-5xl mx-auto p-8 bg-white h-auto">
      <div className="flex-1 mb-8 md:mb-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Billing Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block" htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleBillingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
            <label className="block" htmlFor="email">
              Email Address:
              <input
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleBillingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
            <label className="block" htmlFor="phone">
              Phone Number:
              <input
                type="tel"
                id="phone"
                name="phone"
                value={billingDetails.phone}
                onChange={handleBillingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Shipping Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block" htmlFor="address">
              Your Address:
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
            <label className="block" htmlFor="zipCode">
              ZIP Code:
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
            <label className="block" htmlFor="city">
              City:
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
            <label className="block" htmlFor="country">
              Country:
              <input
                type="text"
                id="country"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
          </div>

          {/* Moved the submit button inside the form */}
          <button
            type="submit"
            className="mt-6 w-full p-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200 ease-in-out"
          >
            Continue & Pay
          </button>
        </form>
      </div>

      <div className="flex-1 pl-0 md:pl-8">
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Summary</h2>
        <div className="mt-4 bg-white border border-gray-300 rounded-md shadow-md p-4">
          {/* Updated image src and alt to match the product */}
          <img
            src="https://cdn.shopify.com/s/files/1/1368/3463/files/hp-mens-tops-4-tile_450x_crop_center@2x.progressive.jpg?v=1717692158" // Replace with actual image source
            alt="YX1 Earphones"
            className="w-24 h-24 mx-auto"
          />
          <div className="flex justify-between mb-2">
            <div>Product:</div>
            <div>YX1 Earphones</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Price:</div>
            <div>${totalAmount.toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Shipping:</div>
            <div>${shippingCost.toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>VAT (included):</div>
            <div>${vat.toFixed(2)}</div>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <div>Grand Total:</div>
            <div>${grandTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
