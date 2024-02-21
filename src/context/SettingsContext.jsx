import { createContext, useState } from "react";

// TODO #10
// Fes que aquest context reculli també la dificultat de les preguntes a mostrar.
// En altres arxius trobaràs quin nom **exacte** ha de tenir la propietat.

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const categories = {
    Mythology: 20,
    Sports: 21,
    Geography: 22,
    History: 23,
    Cinema: 11,
  };
  const [settings, setSettings] = useState({
    number: "6",
    category: "Sports",
    difficulty: "Easy",
  });

  const updateSetting = (property, value) => {
    setSettings({ ...settings, [property]: value });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, categories }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
