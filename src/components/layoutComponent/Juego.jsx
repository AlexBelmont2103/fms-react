import { useState, useEffect, useRef } from "react";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import juegoRESTService from "../../servicios/restJuego";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function Juego() {
  //#region variables de estado
  const [tracks, setTracks] = useState([]);
  const [correcto, setCorrecto] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [descubrir, setDescubrir] = useState(false);
  const [acertadas, setAcertadas] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const { darkMode } = useDarkMode();
  //#endregion
  //#region funciones
  function togglePlay() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
  //#endregion
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  function comprobarRespuesta(ev) {
    console.log("Comprobando respuesta...", ev.target.id);
    if (ev.target.id === correcto) {
      console.log("Respuesta correcta");
      setRespuestaCorrecta(true);
    } else {
      console.log("Respuesta incorrecta");
      setRespuestaCorrecta(false);
    }
    setDescubrir(true);
  }
  //#region efectos
  useEffect(() => {
    async function empezarJuego() {
      let _resp = await juegoRESTService.empezarJuego();
      if (_resp.codigo === 0) {
        //Cogemos los tracks
        setTracks(_resp.otrosdatos.tracks);
        //Cogemos el track con el id de correcto
        setCorrecto(_resp.otrosdatos.correcto);
      }
    }
    empezarJuego();
  }, [acertadas]);

  useEffect(() => {
    if (tracks) {
      const track = tracks.find((track) => track.id === correcto);
      if (track) {
        setPreviewUrl(track.preview_url);
      }
    }
  }, [tracks, correcto]);
  useEffect(() => {
    let timeoutId;
    if (descubrir) {
      timeoutId = setTimeout(() => {
        setDescubrir(false);
        if (respuestaCorrecta) {
          setAcertadas(acertadas + 1);
        } else {
          setAcertadas(0);
        }
      }, 3000);
    }
    // Limpiar el temporizador cuando ya no sea necesario
    return () => clearTimeout(timeoutId);
  }, [descubrir, respuestaCorrecta, acertadas]);
  //#endregion
  return (
    <div className={darkMode ? "purple-light" : "purple-dark"}>
      {previewUrl && <audio src={previewUrl} ref={audioRef} autoPlay />}
      <Dropdown
        closeOnSelect={false}
        className={darkMode ? "purple-light" : "purple-dark"}
        isOpen={isOpen}
      >
        <DropdownTrigger>
          <Button color="warning" onClick={toggleDropdown}>
            ¿Adivinas el temazo?
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection></DropdownSection>
          <DropdownItem className={darkMode ? "text-black" : "text-white"}>
            Aciertos: {acertadas}
          </DropdownItem>
          <DropdownItem className="container flex justify-between">
            <Button
              color="warning"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? "Pausar" : "Reproducir"}
            </Button>
          </DropdownItem>
          <DropdownSection className="">
            {tracks.map((track) => (
              <DropdownItem key={track.id} className="container flex">
                <Button
                  id={track.id}
                  className="w-full"
                  color={
                    descubrir
                      ? track.id === correcto
                        ? "success"
                        : "danger"
                      : "primary"
                  }
                  onClick={comprobarRespuesta}
                >
                  {track.artist} - {track.name}
                </Button>
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem className="container flex justify-end items-end">
              <Button color="danger" onClick={() => setIsOpen(false)}>
                Cerrar
              </Button>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
export default Juego;
