import { Switch } from "@nextui-org/react";
import MoonIcon from "../../uiComponents/MoonIcon";
import SunIcon from "../../uiComponents/SunIcon";

import { useDarkMode } from "../../contextProviders/darkModeContext";

function BotonDarkMode() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={darkMode ? "purple-light":"purple-dark"}>
      <Switch
        defaultSelected
        size="lg"
        color="primary"
        onChange={toggleDarkMode}
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      >
      </Switch>
    </div>
  );
}

export default BotonDarkMode;
