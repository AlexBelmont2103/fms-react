import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { PreviousIcon } from "../../uiComponents/PreviousIcon";
import { NextIcon } from "../../uiComponents/NextIcon";
import { PauseCircleIcon } from "../../uiComponents/PauseCircleIcon";
import { PlayCircleIcon } from "../../uiComponents/PlayCircleIcon";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";

function Reproductor({ album, datosSpotify, tokenSpotify, pistasSpotify }) {
  //#region variables de estado
  const [pistaActual, setPistaActual] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { itemsCarro, dispatch } = useItemsCarroContext();
  //#endregion

  //#region funciones
  function añadirAlbumCarro(album) {
    // Buscar el álbum en el carrito
    const itemCarro = itemsCarro.find((item) => item.album.id === album.id);
    const cantidadEnCarro = itemCarro ? itemCarro.cantidad : 0;

    if (album.stock > cantidadEnCarro) {
      // Si hay stock disponible, añadir el álbum al carrito
      dispatch({
        type: "ADD_NUEVO_ALBUM",
        payload: { album },
      });
    } else {
      // Si no hay stock disponible, mostrar una alerta
      alert("No puedes añadir este álbum al carrito. No hay stock disponible.");
    }
  }
  function togglePlay() {
    const currentIndex = pistasSpotify.findIndex(
      (track) => track.id === pistaActual.id
    );
    setPistaActual(pistasSpotify[currentIndex]);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = pistaActual.preview_url; // Asegúrate de que 'preview_url' es la propiedad correcta para la URL de la pista
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }
  function nextTrack() {
    const currentIndex = pistasSpotify.findIndex(
      (track) => track.id === pistaActual.id
    );
    const nextIndex = (currentIndex + 1) % pistasSpotify.length;
    setPistaActual(pistasSpotify[nextIndex]);
    audioRef.current.src = pistaActual.preview_url;
    audioRef.current.pause();
    setIsPlaying(false);
  }

  function previousTrack() {
    const currentIndex = pistasSpotify.findIndex(
      (track) => track.id === pistaActual.id
    );
    const previousIndex =
      (currentIndex - 1 + pistasSpotify.length) % pistasSpotify.length;
    setPistaActual(pistasSpotify[previousIndex]);
    audioRef.current.src = pistaActual.preview_url;
    audioRef.current.pause();
    setIsPlaying(false);
  }

  //#endregion

  //#region efectos
  //Poner la primera pista del album en el reproductor al iniciar
  useEffect(() => {
    if (pistasSpotify.length > 0) {
      setPistaActual(pistasSpotify[0]);
    }
  }, [pistasSpotify]);
  //#endregion
  return (
    <>
      {datosSpotify && tokenSpotify && (
        <Card
          className="border-none bg-background/60 dark:bg-default-100/50 flex flex-col h-full"
          shadow="sm"
        >
          <CardHeader className="flex flex-col">
            <h3 className="text-2xl font-semibold">Escúchalo antes de comprar!</h3>
            <p className="text-sm text-foreground/80">
              Tenemos muestras de los temazos
            </p>
          </CardHeader>
          <CardBody>
            <Image src={datosSpotify.images[0].url} alt="Album cover" />
            <audio
              ref={audioRef}
              onTimeUpdate={(e) => setTrackProgress(e.target.currentTime)}
              onLoadedMetadata={(e) => setTrackDuration(e.target.duration)}
              src={pistaActual.preview_url}
            ></audio>
            <div className="flex items-center justify-center">
              <p>{pistaActual.name}</p>
            </div>
            <div className="flex items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={previousTrack}
              >
                <PreviousIcon />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={togglePlay}
              >
                {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={nextTrack}
              >
                <NextIcon />
              </Button>
            </div>
            {album.stock > 0 ? (
              <Button
                onClick={() => añadirAlbumCarro(album)}
                className="w-full mt-4"
                color="primary"
              >
                Añadir al carrito
              </Button>
            ) : (
              <Button disabled color="danger" className="w-full mt-4">
                Sin stock
              </Button>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default Reproductor;
