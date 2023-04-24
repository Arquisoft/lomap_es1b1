import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { Slide, Stack, TextField, Select, MenuItem, FormGroup, FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next';

interface INewLocationFormProps {
  globalLat: number;
  globalLng: number;
  globalName: string;
  formOpened: boolean;
  globalAddress: string;
  addMarker: (isVeryPublic: boolean) => void;
  globalCategory: string;
  globalDescription: string;
  setGlobalLat: (globalLat: number) => void;
  setGlobalLng: (globalLng: number) => void;
  setGlobalName: (globalName: string) => void;
  setFormOpened: (formOpened: boolean) => void;
  setGlobalCategory: (globalCategory: string) => void;
  setAcceptedMarker: (acceptedMarker: boolean) => void;
  setGlobalDescription: (globalDescription: string) => void;
}

const NewUbicationForm: React.FC<INewLocationFormProps> = (props) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.addMarker(isSwitchChecked);

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
              <MenuItem value={'P'}>{t("NewLocationForm.parks")}</MenuItem>
              <MenuItem value={'Ti'}>{t("NewLocationForm.shops")}</MenuItem>
              <MenuItem value={'M'}>{t("NewLocationForm.museums")}</MenuItem>
              <MenuItem value={'Ed'}>{t("NewLocationForm.buildings")}</MenuItem>
              <MenuItem value={'F'}>{t("NewLocationForm.pharmacies")}</MenuItem>
              <MenuItem value={'R'}>{t("NewLocationForm.restaurants")}</MenuItem>
              <MenuItem value={'Tr'}>{t("NewLocationForm.transportation")}</MenuItem>
              <MenuItem value={'En'}>{t("NewLocationForm.entertainment")}</MenuItem>
            </Select>
            <FormGroup>
              <FormControlLabel control={<Switch
                checked={isSwitchChecked}
                onChange={e => setIsSwitchChecked(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />} sx={{ color: 'white' }} label={t("NewLocationForm.isPublic")} /> {/*i18n!!*/}
            </FormGroup>
            <Button variant="contained" type="submit" sx={{ my: 2 }}>{t("NewLocationForm.accept")}</Button>
            <Button variant="contained" onClick={() => props.setFormOpened(false)} sx={{ my: 2 }}>{t("NewLocationForm.cancel")}</Button>
          </Stack>
        </form>
      </Slide>
    </>
  );
}

export default NewUbicationForm;
