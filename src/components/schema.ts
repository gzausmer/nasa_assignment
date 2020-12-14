export interface Header {
  text: string;
}

interface AboutPage {
  header: Header;
  getMainImage: () => ImageCard;
  getDescription: () => string;
  navigate: (dest: "datePage" | "weatherPage") => void;
  getCarouselImages: () => ImageCard[];
  carousel: Carousel;
}

export interface ImageCard {
  camera: { id: number; name: string; rover_id: number; full_name: string };
  earth_date: string;
  id: number;
  img_src: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
  sol: number;
}

interface Carousel {
  images: ImageCard[];
}

interface DatePage {
  header: Header;
  getImages: () => ImageCard[];
}

interface WeatherPage {
  header: Header;
  sort: (type: SortType) => void;
  getWeather: () => WeatherCard[];
}

export interface WeatherObject {
  sol_keys: string[];
  First_UTC: "2019-08-19T08:03:59Z";
  Last_UTC: "2019-08-20T08:43:34Z";
  Season: "winter" | "spring" | "summer" | "fall";
  [sol: number]: PerSol;
}

export interface PerSol {
  AT: PerSolData;
  HWS: PerSolData;
  PRE: PerSolData;
  First_UTC: string;
  Last_UTC: string;
  WD: Record<
    number,
    {
      compass_degrees: number;
      compass_point: string;
      compass_right: number;
      compass_up: number;
      ct: number;
    }
  > & {
    most_common: {
      compass_degrees: number;
      compass_point: string;
      compass_right: number;
      compass_up: number;
      ct: number;
    };
  };
}

interface PerSolData {
  av: number;
  ct: number;
  mn: number;
  mx: number;
}

export interface WeatherCard {
  dataPoint: number;
  temperature: number;
  wind: number;
  pressure: number;
  firstUTC: string;
  lastUTC: string;
  currentPage: number;
  nextPage: boolean;
}

type SortType = "temperature" | "date";
export type Page = "about" | "date" | "weather";
