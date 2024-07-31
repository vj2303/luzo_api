"use client"

import React, { useState } from 'react'
import Checkbox from '@/components/Checkbox'
import Radio from '@/components/Radio'
import axios from 'axios'

const Form = () => {

  const [formData, setFormData] = useState({
    salon_name: '',
    no_of_outlets: '',
    map_link: '',
    contacted_city: '',
    contact_name: '',
    contact_number: '',
    partner_type: [],
    gst_registered: '',
    gst_percentage: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        partner_type: checked
          ? [...prev.partner_type, value]
          : prev.partner_type.filter((service) => service !== value)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.contact_name) newErrors.contact_name = "Enter your name";
    if (!formData.contact_number) newErrors.contact_number = "Enter your contact";
    if (formData.contact_number && !/^\d{10}$/.test(formData.contact_number)) newErrors.contact_number = "Contact must be a 10-digit number";
    if (!formData.contacted_city) newErrors.contacted_city = "Enter your city";
    if (!formData.salon_name) newErrors.salon_name = "Enter your brand/business";
    if (!formData.no_of_outlets) newErrors.no_of_outlets = "Enter number of branches";
    if (!formData.map_link) newErrors.map_link = "Enter Google Maps link/Google Profile";
    if (!formData.gst_registered) newErrors.gst_registered = "Select if you are GST registered";
    if (!formData.partner_type.length) newErrors.partner_type = "Select at least one service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      try {
        const res = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_HOST}/api/v1/lead/create`,
          data: { ...formData, created_by: "web", type_of_entity: "test", other_notes: "be polite", salon_contacts: { contact_name: formData.contact_name, contact_number: formData.contact_number } },
          // headers: {
          //   'Authorization': `Bearer 280|H45wsnVZn7bTyTcM6EU0VR7WQ2LwjeF79K1qUDNA3e115625`
          // }
        })
        console.log(res);
      } catch (error) {
        console.log(error);
        alert("Could add lead")
      }
    }
  };

  const formFields = [
    { name: 'contact_name', label: 'Your Name*', type: 'text' },
    { name: 'contact_number', label: 'Your Contact*', type: 'text' },
    { name: 'contacted_city', label: 'City*', type: 'text' },
    { name: 'salon_name', label: 'Brand/Business*', type: 'text' },
    { name: 'no_of_outlets', label: 'No. of Branches*', type: 'text' },
    { name: 'map_link', label: 'Google Maps Link/Google Profile*', type: 'text' },
   
    {
      name: 'gst_registered',
      label: 'Are you GST registered?',
      type: 'radio',
      options: ['Yes', 'No']
    },
    {
      name: 'partner_type',
      label: 'Services you provide',
      type: 'checkbox',
      options: ['Salons', 'Spas', 'Nails', 'Cosmetology', 'Dermatology', 'Lashes & Brows', 'IV Therapy', 'Laser Hair Removal', 'Tattoo & Piercing', 'Hair Transplant']
    },
    {
      name: 'howHeared',
      label: 'How did you hear about us ? (Optional)',
      type: 'radio',
      options: ['Google', 'Facebook/Instagram', 'Your Customer', 'Industry Friends']
    },
  ];

  return (
    <div className='mb-[100px] mt-6'>
      <h2 className='font-medium text-[20px] text-center'>Want to partner with us ?</h2>
      <p className='mb-2 text-[#707070] text-center'>(All fields are mandatory)</p>

      <form onSubmit={handleSubmit} className='mx-[22px] flex flex-col gap-[14px]'>
        {formFields.map((field, index) => (
          <div key={index}>
            {field.type === 'text' && field.name !== 'contact' && (
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
            {field.type === 'text' && field.name === 'contact' && (
              <div className="relative w-full">
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  placeholder=""
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
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
            {field.type === 'checkbox' &&
              <label className='flex flex-col gap-[12px]'>
                {field.label}
                {field.options.map((option, i) => (
                  <div key={i}>
                    <Checkbox
                      isChecked={formData[field.name].includes(option)}
                      label={option}
                      name={field.name}
                      value={option}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
              </label>
            }
            {field.type === 'radio' && field.name === 'gst_registered' && (
              <div className='flex flex-col gap-[12px]'>
                {field.label}
                {field.options.map((option, i) => (
                  <div key={i}>
                    <Radio
                      isChecked={formData[field.name] === option}
                      label={option}
                      name={field.name}
                      value={option}
                      onChange={handleChange}
                    />
                    {option === 'Yes' && formData[field.name] === 'Yes' && (
                      <div className='mt-2 ml-8'>
                        <label className='flex flex-col gap-[12px]'>
                          Select Percentage:
                          <div>
                            <Radio
                              isChecked={formData.gstRate === '6%'}
                              label="6%"
                              name="gst_percentage"
                              value="6%"
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Radio
                              isChecked={formData.gstRate === '18%'}
                              label="18%"
                              name="gst_percentage"
                              value="18%"
                              onChange={handleChange}
                            />
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
              </div>
            )}
            {field.type === 'radio' && field.name !== 'gstRegistered' && (
              <label className='flex flex-col gap-[12px]'>
                {field.label}
                {field.options.map((option, i) => (
                  <div key={i}>
                    <Radio
                      isChecked={formData[field.name] === option}
                      label={option}
                      name={field.name}
                      value={option}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </label>
            )}
          </div>
        ))}
        <button type="submit" className='bg-[#72B5EC] text-white font-semibold text-[16px] px-[50px] py-[15px] rounded-lg'>Submit</button>
      </form>
    </div>
  )
}

export default Form;
