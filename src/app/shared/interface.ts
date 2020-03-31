export interface Coordinates {
  lon: number;
  lat: number;
}

export interface NameTranslations {
  en: string;
}

export interface Airport {
  time_zone: string;
  name: string;
  flightable: boolean;
  coordinates: Coordinates;
  code: string;
  name_translations: NameTranslations;
  country_code: string;
  city_code: string;
}

export interface City {
  time_zone: string;
  name?: string;
  coordinates: Coordinates;
  code: string;
  name_translations: NameTranslations;
  country_code: string;
}

export interface Country {
  name?: any;
  currency: string;
  code: string;
  name_translations: NameTranslations;
}

export interface HomePageData {
  time_zone: string;
  name: string;
  flightable: boolean;
  coordinates: Coordinates;
  code: string;
  name_translations: NameTranslations;
  country_code: string;
  city_code: string;
  city: string;
  country: string;
}
