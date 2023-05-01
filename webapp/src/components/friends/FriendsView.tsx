import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Box, Grid, Button, TextField, Avatar, CircularProgress, Container } from '@mui/material';
import { CombinedDataProvider, useSession, Image, Text } from '@inrupt/solid-ui-react';
import { addFriendByWebId, deleteFriendByWebId, getFriendList } from '../../helpers/SolidHelper';

interface IFriendsViewProps {
  loadMarkers: () => void;
}

export const FriendsView: React.FC<IFriendsViewProps> = (props) => {
  const { t } = useTranslation()
  const { session } = useSession();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<string[]>([]);
  const [newFriendWebID, setNewFriendWebID] = useState<string>("");

  useEffect(() => {
    loadFriends();
    return () => {
      setFriendList([]);
    };
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
      setLoading(true);
      setFriendList(await getFriendList(session.info.webId!));
      setLoading(false);
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

  session.onLogin(loadFriends);
  session.onSessionRestore(loadFriends);
  session.onLogout(() => setFriendList([]));

  return (
    <Box sx={{ margin: "2em" }}>
      <form name="addFriend" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item>
            <TextField
              required
              type="url"
              label="WebID"
              variant="filled"
              value={newFriendWebID}
              onChange={e => setNewFriendWebID(e.target.value)}
              sx={{ bgcolor: 'white', width: "20em", marginRight: "1em", borderRadius: "4px" }}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button className='greenButton' variant="contained" type="submit">{t("FriendsView.addFriend")}</Button>
          </Grid>
        </Grid>
      </form>
      {isLoading ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          {friendList.length > 0 ? (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: "2em 0em 2em" }}>
              {friendList.map((friendWebId) =>
                <Grid item key={friendWebId}>
                  <Box className='friendCard'>
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
                      <Button className='redButton' variant="contained" onClick={() => deleteFriend(friendWebId)}>{t("FriendsView.delete")}</Button>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          ) : (
            <h1 style={{ color: 'white', textAlign: 'center' }}>{t("FriendsView.noFriends")}</h1>
          )}
        </>
      )}
    </Box>
  )
}