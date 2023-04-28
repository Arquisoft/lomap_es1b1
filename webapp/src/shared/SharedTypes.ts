export type Review = {
  date: Date,
  score: number,
  author: string,
  comment: string,
  pictureURL: string
}

export interface IPMarker {
  id: string,
  date: Date,
  lat: number,
  lng: number,
  name: string,
  webId: string,
  address: string,
  category: string,
  isPublic: boolean,
  reviews: Review[],
  description: string,
  canFriendsSee: boolean
}