import { Switch } from "@nextui-org/react";
import MoonIcon from "../../uiComponents/MoonIcon";
import SunIcon from "../../uiComponents/SunIcon";

import { useDarkMode } from "../../contextProviders/darkModeContext";

function BotonDarkMode() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
      <Switch
        defaultSelected
        size="lg"
        color="primary"
        onChange={toggleDarkMode}
        startContent={<MoonIcon />}
        endContent={<SunIcon />}
      >
      </Switch>
  );
}

export default BotonDarkMode;
