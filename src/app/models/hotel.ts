export interface Hotel {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    state: string | null;
    region: string | null;
    latitude: number;
    longitude: number;
    description: string;
  };
  chain: string;
  checkin: string;
  checkout: string;
  feature: {
    viewing_count: number;
    latest_viewing_date: string;
    geography_score: number;
    [key: string]: any; // for other potential properties
  };
  nights: number;
  position: number;
  id90: string;
  displayable_id: string;
  ratings: {
    property: any; // You might want to define a more specific structure here
    guest: any; // You might want to define a more specific structure here
  };
  star_rating: number;
  review_rating: number;
  display_rate: number;
  total: number;
  total_cost: number;
  image: string;
  images: string[];
  location_description: string;
  accommodation_type: {
    id: number;
    type: string;
  };
  neighborhood_ids: number[];
  retail_rate: number;
  savings_amount: number;
  savings_percent: number;
  other_sites_prices: {
    EPS: number;
    BKG: number;
  };
  comparison_prices: any[]; // You might want to define a more specific structure here
  distance: number;
  distance_to_airports: {
    [airportCode: string]: number;
  };
  number_of_rooms: number;
  payment_date: string;
  payment_option: string;
}
