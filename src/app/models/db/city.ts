export declare interface ICity {
  /*id: number;
  name: string;
  nameSimple?: string;
  nameFull?: string;
  latitude: number;
  longitude: number;
  type?: string;
  subType?: string;
  countryCode?: string;
  country?: string;
  codeUnkn1?: number;
  siruta?: number;
  numberUnkn1?: number;
  population?: number;
  codeUnkn2?: number;
  continentCapital?: string;
  dateUnkn1?: string;
  capital?: boolean;
  distance?: number;
  score?: number;*/


  id: number;
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
  iso3: string;
  admin_name: string;
  capital: string;
  population: number;
  distance?: number;
  score?: number;
}
