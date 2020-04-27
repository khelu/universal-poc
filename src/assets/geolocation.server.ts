import {IPosition} from '../app/models/db/position';

export let CLIENT_POSITION: IPosition;

export function setClientGeolocation(position: IPosition) {
  CLIENT_POSITION = position;
}
