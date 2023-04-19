import { Close } from '@mui/icons-material';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { IPMarker } from "../../../shared/SharedTypes";
import React, { useContext, useEffect, useState } from 'react';
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';
import { deletePublicMarker, savePublicMarker } from '../../../helpers/SolidHelper';
import { CombinedDataProvider, useSession, Image, Text } from '@inrupt/solid-ui-react';
import { Slide, Stack, TextField, Dialog, Rating, Button, IconButton, FormGroup, Switch, FormControlLabel, Grid, Avatar, Paper, Divider } from '@mui/material';

const DetailedUbicationView: React.FC<{
  markerShown: IPMarker;
  isDetailedIWOpen: boolean;
  setDetailedIWOpen: (detailedMarkerOpened: boolean) => void;
}> = ({ markerShown, isDetailedIWOpen, setDetailedIWOpen }) => {
  const { session } = useSession();
  const [comment, setComment] = useState<string>("");
  const [isPublic, setPublic] = useState<boolean>(false);
  const [pictureURL, setPictureURL] = useState<string>("");
  const [reviewScore, setReviewScore] = useState<number>(0);
  const { state: markers, dispatch } = useContext(MarkerContext);
  const [isRatingOpen, setRatingOpen] = useState<boolean>(false);
  const [isCommentsOpen, setCommentsOpen] = useState<boolean>(false);

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
      marker.reviews.push({ author: session.info.webId!, date: new Date(), score: reviewScore, comment: comment, pictureURL: pictureURL });

      dispatch({ type: Types.UPDATE_MARKER, payload: { id: marker.id, marker: marker } });
      if (marker.webId !== session.info.webId!) {
        await savePublicMarker(marker, marker.webId);
      }
    }
  }

  const getRatingMean = () => {
    let total = markerShown.reviews.length;
    if (total === 0) {
      return 0;
    }

    let sum = markerShown.reviews
      .map(r => r.score)
      .reduce((previous, current) => current += previous, 0);
    let result = sum / total;

    return result;
  }

  function timeSince(date: Date) {

    var seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
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
          {markerShown.webId === session.info.webId
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
          <ul style={{ overflow: "auto" }}>
            {markerShown.reviews.sort(() => 0.5 - Math.random()).slice(0, 3).map((review =>
              <>
                <CombinedDataProvider datasetUrl={review.author} thingUrl={review.author}>
                  <li key={review.comment} style={{ wordBreak: "break-all" }}><Text property={FOAF.name} errorComponent={() =>
                    <>{review.author.substring(8).split('.')[0]}</>
                  } />: {review.comment}</li>
                </CombinedDataProvider>
              </>
            ))}
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
                  value={reviewScore}
                  name="rating"
                  sx={{ margin: '0.5em 0em 0.5em' }}
                  onChange={(_, value) => setReviewScore(value as unknown as number)}
                />
                <TextField
                  type='url'
                  value={pictureURL}
                  name="imageURL"
                  label="URL de imagen"
                  onChange={(e) => setPictureURL(e.target.value as string)}
                  sx={{ margin: '0.5em 0em 0.5em' }}
                />
                <TextField
                  rows={4}
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
          <Button variant="contained" sx={{ my: 2 }} onClick={() => setCommentsOpen(true)}>Ver reseñas</Button>
          <Dialog onClose={() => setCommentsOpen(false)} open={isCommentsOpen}>
            <Paper style={{ padding: "40px 20px", maxHeight: 700, overflow: 'auto' }}>
              {markerShown.reviews.map((review, index) =>
                <>
                  <CombinedDataProvider datasetUrl={review.author} thingUrl={review.author}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Image property={VCARD.hasPhoto} style={{ width: 100, height: 100, borderRadius: "50%" }} errorComponent={() =>
                          <Avatar sx={{ width: 100, height: 100 }} />
                        } />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}><Text property={FOAF.name} errorComponent={() =>
                          <>{review.author.substring(8).split('.')[0]}</>
                        } /></h4>
                        <Rating sx={{ marginTop: "0.30em", marginLeft: "-0.15em" }} value={review.score} readOnly />
                        {review.comment && <p style={{ textAlign: "left", wordBreak: "break-all", marginTop: "0em" }}>
                          {review.comment}
                        </p>}
                        <p style={{ textAlign: "left", color: "gray" }}>
                          posted {timeSince(review.date)} ago
                        </p>
                      </Grid>
                    </Grid>
                    {review.pictureURL && <img src={review.pictureURL} alt={`Imagen de ${review.author}`} style={{ width: 550 }} />}
                  </CombinedDataProvider>
                  {index !== markerShown.reviews.length - 1 && <Divider variant="fullWidth" style={{ margin: "30px 0" }} />}
                </>)}
            </Paper>
          </Dialog>
        </Stack>
      </Slide>
    </>
  );
}

export default DetailedUbicationView;
