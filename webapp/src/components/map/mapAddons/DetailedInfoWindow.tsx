import { Close } from '@mui/icons-material';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../../shared/SharedTypes";
import React, { useContext, useEffect, useState } from 'react';
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';
import { deletePublicMarker, savePublicMarker } from '../../../helpers/SolidHelper';
import { Slide, Stack, TextField, Dialog, Rating, Button, IconButton, FormGroup, Switch, FormControlLabel } from '@mui/material';

const DetailedUbicationView: React.FC<{
  markerShown: IPMarker;
  isDetailedIWOpen: boolean;
  setDetailedIWOpen: (detailedMarkerOpened: boolean) => void;
}> = ({ markerShown, isDetailedIWOpen, setDetailedIWOpen }) => {
  const { session } = useSession();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isPublic, setPublic] = useState<boolean>(false);
  const { state: markers, dispatch } = useContext(MarkerContext);
  const [isRatingOpen, setRatingOpen] = useState<boolean>(false);

  const handlePublicChange = async (isPublic: boolean) => {
    let marker = markers.find(marker => marker.id === markerShown?.id);
    if (marker) {
      marker.isPublic = isPublic;

      if (isPublic) {
        await savePublicMarker(marker, session.info.webId!);
      } else {
        await deletePublicMarker(marker, session.info.webId!);
      }

      dispatch({ type: Types.UPDATE_MARKER, payload: { id: marker.id, marker: marker } });
      setPublic(isPublic);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let marker = markers.find(marker => marker.id === markerShown.id);

    if (marker) {
      marker.ratings.push(rating);
      marker.comments.push(comment);

      dispatch({ type: Types.UPDATE_MARKER, payload: { id: marker.id, marker: marker } });
      if (!marker.id.includes('-')) {
        //actualizar db
      } else if (marker.webId !== session.info.webId!) {
        await savePublicMarker(marker, marker.webId);
      }
    }
  }

  const getRatingMean = () => {
    let total = markerShown.ratings.length;
    if (total === 0) {
      return 0;
    }

    let sum = markerShown.ratings.map(n => parseInt(n.toString()))
      .reduce((previous, current) => current += previous, 0);
    let result = sum / total;

    return result;
  }

  useEffect(() => {
    setPublic(markerShown.isPublic);
  }, [markerShown]);

  return (
    <>
      <Slide style={{ color: 'white' }} direction="right" in={isDetailedIWOpen} mountOnEnter unmountOnExit>
        <Stack alignItems="right" sx={{ margin: 2, display: isDetailedIWOpen ? '' : 'none' }}>
          <Stack direction='row'>
            <h1 style={{ marginTop: '0em' }}>{markerShown.name}</h1>
            <IconButton sx={{ marginLeft: 'auto', marginRight: '0em' }} onClick={async () => setDetailedIWOpen(false)}><Close /></IconButton>
          </Stack>
          <p style={{ marginTop: '0em' }}>Dirección: {markerShown.address}</p>
          <p>Categoría: {markerShown.category}</p>
          <p>Descripción: {markerShown.description}</p>
          {markerShown.webId === session.info.webId && markerShown.id.includes('-')
            &&
            <FormGroup>
              <FormControlLabel control={
                <Switch
                  checked={isPublic}
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={e => handlePublicChange(e.target.checked)}
                />
              }
                sx={{ color: 'white', my: 2 }} label="Compartir ubicación" />
            </FormGroup>
          }
          <h2>Resumen de reseñas</h2>
          <Rating value={getRatingMean()} readOnly />
          <ul>
            {markerShown.comments.map(comment =>
              <li key={comment}>{comment}</li>
            )}
          </ul>
          <Button variant="contained" sx={{ my: 2 }} onClick={() => setRatingOpen(true)}>Escribir una reseña</Button>
          <Dialog onClose={() => setRatingOpen(false)} open={isRatingOpen}>
            <form name="newRating" onSubmit={handleSubmit}>
              <Stack direction='column' sx={{ width: '30em', padding: '1em' }}>
                <Stack direction='row'>
                  <h1 style={{ margin: '0' }}>Valora esta ubicación</h1>
                  <IconButton sx={{ marginLeft: 'auto', marginRight: '0em' }} onClick={async () => setRatingOpen(false)}><Close /></IconButton>
                </Stack>
                <Rating
                  value={rating}
                  name="rating"
                  sx={{ margin: '0.5em 0em 0.5em' }}
                  onChange={(_, value) => setRating(value as unknown as number)}
                />
                <TextField
                  rows={4}
                  required
                  multiline
                  value={comment}
                  name="comment"
                  label="Comentario"
                  onChange={(e) => setComment(e.target.value as string)}
                  sx={{ margin: '0.5em 0em 0.5em' }}
                />
                <Button variant="contained" type="submit" sx={{ marginTop: '0.5em' }}>Enviar</Button>
              </Stack>
            </form>
          </Dialog>
        </Stack>
      </Slide>
    </>
  );
}

export default DetailedUbicationView;
