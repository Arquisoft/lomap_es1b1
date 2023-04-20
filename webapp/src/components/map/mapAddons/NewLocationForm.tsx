import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import React, { MutableRefObject } from 'react';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../../shared/SharedTypes";
import { Slide, Stack, TextField, Select, MenuItem } from '@mui/material'

interface INewLocationFormProps {
  globalLat: number;
  globalLng: number;
  globalName: string;
  formOpened: boolean;
  globalAddress: string;
  globalCategory: string;
  globalDescription: string;
  nextID: MutableRefObject<string>;
  addMarker: (marker: IPMarker) => void;
  setGlobalLat: (globalLat: number) => void;
  setGlobalLng: (globalLng: number) => void;
  setGlobalName: (globalName: string) => void;
  setFormOpened: (formOpened: boolean) => void;
  setGlobalCategory: (globalCategory: string) => void;
  setAcceptedMarker: (acceptedMarker: boolean) => void;
  setGlobalDescription: (globalDescription: string) => void;
}

const NewUbicationForm: React.FC<INewLocationFormProps> = (props) => {
  const { t } = useTranslation();
  const { session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.addMarker({
      id: props.nextID.current, date: new Date(), name: props.globalName, description: props.globalDescription,
      lat: props.globalLat, lng: props.globalLng, category: props.globalCategory, isPublic: false,
      address: props.globalAddress, reviews: [], webId: session.info.webId!
    });
  }

  return (
    <>
      <Slide direction="left" in={props.formOpened} mountOnEnter unmountOnExit >
        <form name="newUbication" onSubmit={handleSubmit}>
          <Stack alignItems="right" sx={{ margin: 2 }}>
            <TextField
              required
              type='number'
              name="latitude"
              label={t("NewLocationForm.latitude")}
              variant='filled'
              value={props.globalLat}
              onChange={e => props.setGlobalLat(e.target.value as unknown as number)}
              sx={{ marginBottom: '1em', bgcolor: 'white' }}
            />
            <TextField
              required
              type='number'
              name="longitude"
              label={t("NewLocationForm.longitude")}
              variant='filled'
              value={props.globalLng}
              onChange={e => props.setGlobalLng(e.target.value as unknown as number)}
              sx={{ my: 2, bgcolor: 'white' }}
            />
            <TextField
              required
              name="name"
              label={t("NewLocationForm.name")}
              variant='filled'
              value={props.globalName}
              onChange={e => props.setGlobalName(e.target.value)}
              sx={{ my: 2, bgcolor: 'white' }}
            />
            <TextField
              required
              name="description"
              label={t("NewLocationForm.description")}
              variant='filled'
              value={props.globalDescription}
              onChange={e => props.setGlobalDescription(e.target.value)}
              sx={{ my: 2, bgcolor: 'white' }}
            />
            <Select
              value={props.globalCategory}
              onChange={(e) => props.setGlobalCategory(e.target.value as string)}
              sx={{ my: 2, bgcolor: 'white' }}
            >
              <MenuItem value={'Parques'}>{t("NewLocationForm.parks")}</MenuItem>
              <MenuItem value={'Tiendas'}>{t("NewLocationForm.shops")}</MenuItem>
              <MenuItem value={'Museos'}>{t("NewLocationForm.museums")}</MenuItem>
              <MenuItem value={'Edificios'}>{t("NewLocationForm.buildings")}</MenuItem>
              <MenuItem value={'Farmacias'}>{t("NewLocationForm.pharmacies")}</MenuItem>
              <MenuItem value={'Restaurantes'}>{t("NewLocationForm.restaurants")}</MenuItem>
              <MenuItem value={'Transporte'}>{t("NewLocationForm.transportation")}</MenuItem>
              <MenuItem value={'Entretenimiento'}>{t("NewLocationForm.entertainment")}</MenuItem>
            </Select>
            <Button variant="contained" type="submit" sx={{ my: 2 }}>{t("NewLocationForm.accept")}</Button>
            <Button variant="contained" onClick={() => props.setFormOpened(false)} sx={{ my: 2 }}>{t("NewLocationForm.cancel")}</Button>
          </Stack>
        </form>
      </Slide>
    </>
  );
}

export default NewUbicationForm;
