import { useEffect, useState } from 'react';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Box, Grid, Button, TextField, Avatar } from '@mui/material';
import { CombinedDataProvider, useSession, Image, Text } from '@inrupt/solid-ui-react';
import { addFriendByWebId, deleteFriendByWebId, getFriendList } from '../../helpers/SolidHelper';

export const FriendsView = () => {
  const { session } = useSession();
  const [friendList, setFriendList] = useState<string[]>([]);
  const [newFriendWebID, setNewFriendWebID] = useState<string>("");

  useEffect(() => {
    loadFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newFriendWebID.endsWith("/")) {
      await addFriend(newFriendWebID);
    }
    setNewFriendWebID("");
  }

  const loadFriends = async () => {
    if (session.info.isLoggedIn) {
      setFriendList(await getFriendList(session.info.webId!));
    }
  }

  const addFriend = async (webID: string) => {
    await addFriendByWebId(session.info.webId!, webID);
    setFriendList(prevFriendList => [...prevFriendList, webID]);
  }

  const deleteFriend = async (webID: string) => {
    await deleteFriendByWebId(session.info.webId!, webID);
    setFriendList(friendList.filter(friend => friend !== webID));
  }

  return (
    <>
      <form name="addFriend" onSubmit={handleSubmit}>
        <Grid container sx={{ margin: '2em' }}>
          <Grid item>
            <TextField
              required
              type="url"
              label="WebID"
              variant="filled"
              value={newFriendWebID}
              onChange={e => setNewFriendWebID(e.target.value)}
              sx={{ bgcolor: 'white', width: "20em", marginRight: "1.5em", borderRadius: "4px" }}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button variant="contained" type="submit" sx={{
              bgcolor: 'green',
              ":hover": {
                bgcolor: "green"
              }
            }}>Añadir amigo</Button>
          </Grid>
        </Grid>
      </form>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '0em 2em 0em' }}>
        {friendList.map((friendWebId) =>
          <Grid item key={friendWebId}>
            <Box sx={{ padding: '2em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
              <CombinedDataProvider datasetUrl={`${friendWebId}profile/card#me`} thingUrl={`${friendWebId}profile/card#me`}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <Image property={VCARD.hasPhoto} style={{ width: 100, height: 100, borderRadius: "50%" }} errorComponent={() =>
                      <Avatar sx={{ width: 100, height: 100 }} />
                    } />
                  </Grid>
                  <Grid item>
                    <h1 style={{ marginLeft: "1em" }}><Text property={FOAF.name} errorComponent={() =>
                      <>{friendWebId.substring(8).split('.')[0]}</>
                    } /></h1>
                  </Grid>
                </Grid>
              </CombinedDataProvider>
              <Box
                display="flex"
                marginTop="2em"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Button variant="contained" sx={{
                  bgcolor: 'red',
                  ":hover": {
                    bgcolor: "red"
                  }
                }} onClick={() => deleteFriend(friendWebId)}>Eliminar</Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  )
}