import { Switch } from "@nextui-org/react";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import { useDarkMode } from "../../contextProviders/darkModeContext";



function BotonDarkMode() {
  
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      onChange={toggleDarkMode}
      thumbIcon={({ isSelected, className }) => {
        darkMode ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        );
      }}
    >
      {darkMode ? "Modo Claro" : "Modo Oscuro"}
    </Switch>
  );
}

export default BotonDarkMode;
