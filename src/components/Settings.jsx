import Setting from "./Setting";
import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

const Settings = () => {
  const { categories } = useContext(SettingsContext);
  return (
    <div className="content container">
      <Setting
        property="number"
        text="Number of questions"
        first="6"
        second="12"
        options={["4", "6", "8", "10", "12"]}
      />
      {/* TODO #9
      /// Afegeix un nou element que permeti a l'usuari triar la categoria de les preguntes a mostrar. */}
      <Setting
        property="category"
        text="Category"
        first="Sports"
        second="Geography"
        options={Object.keys(categories)}
      />
      <Setting
        property="difficulty"
        text="Difficulty"
        first="Easy"
        second="Hard"
        options={["Easy", "Medium", "Hard"]}
      />
    </div>
  );
};

export default Settings;
