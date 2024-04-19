import React from "react";
import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

function Albumes() {
  const respuestaserver = useLoaderData();
  console.log("albumes: ", respuestaserver);
  const albumes = respuestaserver.datosalbumes;
  return (
    <div>
      <h1>Albumes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albumes.map((album) => (
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{album.nombre}</p>
              <small className="text-default-500">
                {album.numCanciones} Temas
              </small>
              <h4 className="font-bold text-large">{album.artista}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={album.imagenPortada}
                width={270}
              />
            </CardBody>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="primary"
                radius="lg"
                size="sm"
              >
                Notify me
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Albumes;
