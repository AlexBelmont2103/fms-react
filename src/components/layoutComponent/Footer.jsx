import { useDarkMode } from "../../contextProviders/darkModeContext";


function Footer() {
  const { darkMode } = useDarkMode();
  return (
    <footer id="pieFicha">
      <div className="container mx-auto px-2 bg-gray">
        <div className={darkMode ? "text-black":"text-white"}>
          <p>
            Este es un trabajo de Alejandro Muñoz García para el segundo curso
            de DAW 2023-2024 en I.E.S Alonso de Avellaneda
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
