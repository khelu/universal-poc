import * as CITIES from './cities.json';
import {ICity} from '../app/models/db/city';
import {CLIENT_POSITION} from './geolocation.server';

export let MAPPED_CITIES: ICity[] = [];
export const FARTHEST_DISTANCE_GRADES = 180;
export const BIGGEST_CITY_POPULATION = 38000000; // Tokyo

export function mapCities() {
  MAPPED_CITIES = [];
  const cities = CITIES;
  MAPPED_CITIES = cities;
}

export function findCities(value: string): ICity[] {
  // filter by name inclusion
  const filteredCities = MAPPED_CITIES.filter((mc: ICity) => mc.city.toLowerCase().includes(value));

  // set distance
  if (CLIENT_POSITION) {
    filteredCities.forEach(fc => fc.distance = calculateDistance(fc.lat, fc.lng));
  }

  console.log('cities with distance:', filteredCities);

  // set score
  filteredCities.forEach(fc => fc.score = calculateScore(fc.distance, fc.population, fc.capital));

  // return final city list, sorted by score and sliced to only 20
  return filteredCities
    .sort((fc1, fc2) => fc1.score <= fc2.score ? 1 : -1)
    .slice(0, 20);
}

export function calculateDistance(cityLatitude: number, cityLongitude: number): number {
  let deltaLat: number;
  let deltaLong: number;
  let totalDistance: number;
  deltaLat = CLIENT_POSITION.latitude > cityLatitude ?  CLIENT_POSITION.latitude - cityLatitude :
    cityLatitude - CLIENT_POSITION.latitude;
  deltaLong = CLIENT_POSITION.latitude > cityLongitude ?  CLIENT_POSITION.longitude - cityLongitude :
    cityLongitude - CLIENT_POSITION.longitude;
  // just Pitagora for now, no radius
  totalDistance = Math.sqrt(Math.pow(deltaLat, 2) + Math.pow(deltaLong, 2));
  return totalDistance;
}

export function calculateScore(distance: number, population: number, capital: string): number {
  let totalScore: number;
  let scoreDistance: number;
  let scorePopulation: number;
  let scoreCapital: number;
  // distance counts 50%, population counts 30%, being capital counts 20%
  scoreDistance = 0.5 * ((FARTHEST_DISTANCE_GRADES - distance) / FARTHEST_DISTANCE_GRADES);
  scorePopulation = 0.3 * (population / (BIGGEST_CITY_POPULATION - population));
  capital.includes('primary') ? scoreCapital = 0.2 : scoreCapital = 0;
  totalScore = scoreDistance + scorePopulation + scoreCapital;
  return totalScore;
}
