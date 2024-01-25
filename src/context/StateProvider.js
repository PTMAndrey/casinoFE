import { createContext, useEffect, useState } from "react";
import { getAllJocuri } from "../api/API";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {

  const [jocuri, setJocuri] = useState([]);

  const fetchJocuri = async () => {
    try {
      const response = await getAllJocuri();
      if (response?.status === 200)
        setJocuri(response.data);
      else
        setJocuri(null);

    } catch (error) { }
  }

  useEffect(() => {
    fetchJocuri();
  }, [])


  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  return <StateContext.Provider
    value={{
      jocuri,
      setJocuri,
      fetchJocuri,
      alert,
      setAlert,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;
