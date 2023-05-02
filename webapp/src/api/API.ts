import { IPMarker } from '../shared/SharedTypes';

export async function getPublicLocations(): Promise<any[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint + '/locations/list');
  return response.json();
}

export async function addPublicLocation(location: IPMarker): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint + '/locations/add', {
    method: 'POST',
    body: JSON.stringify(location),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function updatePublicLocation(location: IPMarker): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/locations/update', {
    method: 'POST',
    body: JSON.stringify({
      'id': location.id,
      'reviews': location.reviews
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function deletePublicLocation(location: IPMarker): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint + '/locations/delete', {
    method: 'POST',
    body: JSON.stringify({
      'id': location.id,
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.status === 200)
    return true;
  else
    return false;
}