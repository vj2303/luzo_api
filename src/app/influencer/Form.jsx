"use client"

import React, { useState } from 'react'
import FileInput from '@/components/FileInput'

const Form = () => {

  const [formData, setFormData] = useState({
    handle: "",
    contact: "",
    handle2: "",
    handle3: "",
    followers: "",
    menWomenRatio: "",
    cities: "",
    ageRange: ""
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (name === 'followers' || name === 'contact') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue
      }));

      if (name === 'followers' && numericValue && parseInt(numericValue) < 10000) {
        setErrorMessage('Not eligible: Followers must be greater than 10,000');
      } else {
        setErrorMessage('');
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.handle) newErrors.handle = 'Name is required';
    if (!formData.contact) newErrors.contact = 'Contact is required';
    if (formData.contact && !/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Contact must be a 10-digit number';
    if (!formData.handle2) newErrors.handle2 = 'Where are you based? is required';
    if (!formData.handle3) newErrors.handle3 = 'Instagram / Youtube handle is required';
    if (!formData.followers) newErrors.followers = 'Approx followers / subscribers is required';
    if (formData.followers && parseInt(formData.followers) < 10000) newErrors.followers = 'Followers must be greater than 10,000';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
    } else {
      setErrorMessage('Please correct the errors in the form');
    }
  };

  const formFields = [
    { name: 'handle', label: 'Name*', type: 'text' },
    { name: 'contact', label: 'Contact* ', type: 'text' },
    { name: 'handle2', label: 'Where are you based?* Area, city', type: 'text' },
    { name: 'handle3', label: 'Your Instagram / Youtube handle*', type: 'text' },
    { name: 'followers', label: 'Approx followers / subscribers* ', type: 'text' },
    {
      name: 'menWomenRatio',
      label: 'Attach screenshot of Men Women followers ratio (Optional)',
      type: 'file'
    },
    {
      name: 'cities',
      label: 'Attach screenshot of Top cities (Optional)',
      type: 'file'
    },
    {
      name: 'ageRange',
      label: 'Attach screenshot of Age range (Optional)',
      type: 'file'
    },
    { name: 'audience', label: 'Tell us about you and your audience (optional)', type: 'text' },
  ];

  return (
    <div className='my-8'>
      <h2 className='font-medium text-[20px] text-center'>Join our community </h2>
      <p className='mb-[30px] text-[10px] text-[#707070] text-center'>(All fields are mandatory)</p>

      <form onSubmit={handleSubmit} className='mx-[22px] text-[13px] flex flex-col gap-[14px]'>
        {formFields.map((field, index) => (
          <div key={index}>
            {field.type === 'text' && (
              <div className="relative w-full">
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  placeholder=""
                  onChange={handleChange}
                  className={`block p-[15px] w-full text-base text-gray-900 bg-white border ${errors[field.name] ? 'border-red-500' : 'border-[#B9B9B9]'} rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 peer`}
                />
                <label
                  htmlFor={field.name}
                  className='absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3'
                >
                  {field.label}
                </label>
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
              </div>
            )}
            {field.type === 'file' &&
              <FileInput
                label={field.label}
                onChange={handleChange}
                name={field.name}
                exampleImage='/1.png'
              />
            }
          </div>
        ))}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button type="submit" className='bg-[#72B5EC] text-white font-semibold text-[16px] px-[50px] py-[15px] rounded-lg'>Submit</button>
      </form>
    </div>
  )
}

export default Form;
