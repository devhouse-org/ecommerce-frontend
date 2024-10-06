import React, { useState } from 'react';

const Checkout = () => {
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    zipCode: '',
    city: '',
    country: '',
  });

  const totalAmount = 4500;
  const shippingCost = 50;
  const vat = 900;
  const grandTotal = totalAmount + shippingCost + vat;

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
    // Handle the form submission logic here
    alert('Checkout Successful!');
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">CHECKOUT</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mt-4">BILLING DETAILS</h2>
        <label className="block mt-2">
          Name:
          <input
            type="text"
            name="name"
            value={billingDetails.name}
            onChange={handleBillingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-2">
          Email Address:
          <input
            type="email"
            name="email"
            value={billingDetails.email}
            onChange={handleBillingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-2">
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={billingDetails.phone}
            onChange={handleBillingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <h2 className="text-lg font-semibold mt-4">SHIPPING INFO</h2>
        <label className="block mt-2">
          Your Address:
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-2">
          ZIP Code:
          <input
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-2">
          City:
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-2">
          Country:
          <input
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <h2 className="text-lg font-semibold mt-4">SUMMARY</h2>
        <div className="mt-2">
          <div className="flex justify-between">
            <div>Product:</div>
            <div>ZX9</div>
          </div>
          <div className="flex justify-between">
            <div>Price:</div>
            <div>${totalAmount}</div>
          </div>
          <div className="flex justify-between">
            <div>Shipping:</div>
            <div>${shippingCost}</div>
          </div>
          <div className="flex justify-between">
            <div>VAT (included):</div>
            <div>${vat}</div>
          </div>
          <div className="flex justify-between font-bold">
            <div>Grand Total:</div>
            <div>${grandTotal}</div>
          </div>
        </div>

        <button type="submit" className="mt-4 w-full p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
          CONTINUE & PAY
        </button>
      </form>
    </div>
  );
};

export default Checkout;
