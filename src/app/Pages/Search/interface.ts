export interface Fare {
  price: number;
  description: string;
  route: string;
  seats_left: string;
}

export interface Flight {
  flight_id: string;
  departure_code: string;
  arrival_code: string;
  departure_time: string;
  arrival_time: string;
  designator_code: string;
  airline_code: string;
  airline_logo: string;
  departure_name: string;
  arrival_name: string;
  airline_name: string;
  stops: string;
  fares: Fare[];
  best_fare: Fare;
}

export interface SortFilter {
  sort: string;
  filter: string[];
}
