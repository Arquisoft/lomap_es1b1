import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Slide, Stack, TextField, Select, MenuItem, FormGroup, FormControlLabel, Switch } from '@mui/material'

interface INewLocationFormProps {
  globalLat: number;
  globalLng: number;
  globalName: string;
  formOpened: boolean;
  globalAddress: string;
  globalCategory: string;
  globalDescription: string;
  setGlobalName: (name: string) => void;
  addMarker: (isPublic: boolean) => void;
  setGlobalLat: (latitude: number) => void;
  setGlobalLng: (longitude: number) => void;
  setFormOpened: (formOpened: boolean) => void;
  setGlobalCategory: (category: string) => void;
  setGlobalDescription: (description: string) => void;
  setAcceptedMarker: (acceptedMarker: boolean) => void;
}

const NewUbicationForm: React.FC<INewLocationFormProps> = ({
  globalLat,
  globalLng,
  addMarker,
  globalName,
  formOpened,
  setGlobalLat,
  setGlobalLng,
  setGlobalName,
  setFormOpened,
  globalCategory,
  globalDescription,
  setGlobalCategory,
  setGlobalDescription
}) => {
  const { t } = useTranslation();
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMarker(isPublic);
  }

  return (
    <>
      <Slide direction="left" in={formOpened} mountOnEnter unmountOnExit >
        <form name="newUbication" onSubmit={handleSubmit}>
          <Stack alignItems="right" sx={{ margin: 2 }}>
            <TextField
              required
              type='number'
              name="latitude"
              variant="filled"
              label={t("NewLocationForm.latitude")}
              value={globalLat}
              onChange={e => setGlobalLat(e.target.value as unknown as number)}
              sx={{ marginBottom: '1em', backgroundColor: "white", borderRadius: "4px" }}
            />
            <TextField
              required
              type='number'
              name="longitude"
              variant="filled"
              label={t("NewLocationForm.longitude")}
              value={globalLng}
              onChange={e => setGlobalLng(e.target.value as unknown as number)}
              sx={{ my: 2, backgroundColor: "white", borderRadius: "4px" }}
            />
            <TextField
              required
              name="name"
              variant="filled"
              label={t("NewLocationForm.name")}
              value={globalName}
              onChange={e => setGlobalName(e.target.value)}
              sx={{ my: 2, backgroundColor: "white", borderRadius: "4px" }}
            />
            <TextField
              required
              name="description"
              variant="filled"
              label={t("NewLocationForm.description")}
              value={globalDescription}
              onChange={e => setGlobalDescription(e.target.value)}
              sx={{ my: 2, backgroundColor: "white", borderRadius: "4px" }}
            />
            <Select
              value={globalCategory}
              onChange={(e) => setGlobalCategory(e.target.value)}
              sx={{ my: 2, backgroundColor: "white", borderRadius: "4px" }}
            >
              <MenuItem value={'P'}>{t("NewLocationForm.parks")}</MenuItem>
              <MenuItem value={'Ti'}>{t("NewLocationForm.shops")}</MenuItem>
              <MenuItem value={'M'}>{t("NewLocationForm.museums")}</MenuItem>
              <MenuItem value={'Ed'}>{t("NewLocationForm.buildings")}</MenuItem>
              <MenuItem value={'F'}>{t("NewLocationForm.pharmacies")}</MenuItem>
              <MenuItem value={'R'}>{t("NewLocationForm.restaurants")}</MenuItem>
              <MenuItem value={'En'}>{t("NewLocationForm.entertainment")}</MenuItem>
              <MenuItem value={'Tr'}>{t("NewLocationForm.transportation")}</MenuItem>
            </Select>
            <FormGroup>
              <FormControlLabel control={<Switch
                checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />} sx={{ color: 'white' }} label={t("NewLocationForm.isPublic")} />
            </FormGroup>
            <Button className='greenButton' variant="contained" type="submit" sx={{ my: 2 }}>{t("NewLocationForm.accept")}</Button>
            <Button className='redButton' variant="contained" onClick={() => setFormOpened(false)} sx={{ my: 2 }}>{t("NewLocationForm.cancel")}</Button>
          </Stack>
        </form>
      </Slide>
    </>
  );
}

export default NewUbicationForm;
