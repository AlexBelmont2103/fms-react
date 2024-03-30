import { Switch } from "@nextui-org/react";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";


function BotonDarkMode() {
  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) => {
        cambiarTema(isSelected);
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        );
      }}
    >
      Dark mode
    </Switch>
  );
}

export default BotonDarkMode;
