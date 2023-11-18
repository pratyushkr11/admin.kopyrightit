import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);
let g;
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getforms')
      .then((response) => setFormData(response.data))
      .catch((error) => console.error('Error fetching form data:', error));
  }, []);

  return (
    <FormContext.Provider value={formData}>
      {children}
    </FormContext.Provider>
  );
};
