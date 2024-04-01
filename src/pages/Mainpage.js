import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Mainpage() {
  // State variables
  const [formData, setFormData] = useState({
    date: "",
    sourceCurrency: "",
    targetCurrency: "",
    amount: "",
  });

  const [currencyNames, setCurrencyNames] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllCurrencies");
        setCurrencyNames(Object.keys(response.data));
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { date, sourceCurrency, targetCurrency, amount } = formData;
      console.log("Form Data:", formData); // Debug: Log form data
      const response = await axios.get(
        `http://localhost:5000/convertCurrency?date=${date}&sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&amountInSourceCurrency=${amount}`
      );
      console.log("API Response:", response.data); // Debug: Log API response
      // Handle the response data as needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>
        Convert Your Currencies Today
      </h1>
      <p className='lg:mx-32 opacity-40 py-6'>
        Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates.
        Whether you're planning a trip, managing your finances, or simply
        curious about the value of your money in different currencies, this
        tool is here to help.
      </p>
      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-4'>
              <label htmlFor="date" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Date
              </label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
                placeholder='Select Date'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="sourceCurrency" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Select Source Currency
              </label>
              <select
                id='sourceCurrency'
                name='sourceCurrency'
                value={formData.sourceCurrency}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
                required
              >
                <option value="">Select Source Currency</option>
                {currencyNames.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor="targetCurrency" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Select Target Currency
              </label>
              <select
                id='targetCurrency'
                name='targetCurrency'
                value={formData.targetCurrency}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
                required
              >
                <option value="">Select Target Currency</option>
                {currencyNames.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor="amount" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Amount In Source Currency
              </label>
              <input
                type='text'
                id='amount'
                name='amount'
                value={formData.amount}
                onChange={handleInputChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
                placeholder='Amount In Source Currency'
                required
              />
            </div>
            <button type="submit" className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'>
              Get The Target Currency
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
