import { useEffect, useState } from "react";
import { WeatherObject } from "./schema";

const baseURL = "https://mars-photos.herokuapp.com/api/v1/";
const latest = `${baseURL}rovers/curiosity/latest_photos?`;
const imagesURL = `${baseURL}rovers/curiosity/photos?earth_date=`;
const API_KEY = "DEMO_KEY";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manifest = `${baseURL}manifests/curiosity`;

export class ApiClient {
  public getImages = async (date: string) => {
    const response = await fetch([imagesURL, date].join(""));
    return await response.json();
  };
  public getLatestImages = async () => {
    const response = await fetch(latest);
    return await response.json();
  };
  public getWeather = async () => {
    // ***** API returns empty sol array - returning mock instead..
    // const response = await fetch(API_URL);
    // return await response.json();

    // @ts-ignore
    return mock as WeatherObject;
  };
}

export const useGetRequests = <T, K = undefined>(
  apiClientFn: (args: K) => Promise<T>,
  args: K
) => {
  const [images, setImages] = useState<FetchState<T>>({
    state: "pending",
  });

  useEffect(() => {
    apiClientFn(args)
      .then((value) => setImages({ state: "resolved", value }))
      .catch((error) => setImages({ state: "rejected", error }));
  }, [apiClientFn, args]);

  return images;
};

export type FetchState<T> =
  | { state: "pending" }
  | { state: "resolved"; value: T }
  | { state: "rejected"; error: Error };

export const mock = {
  sol_keys: ["259", "260", "261", "262", "263", "264", "265"],
  "259": {
    AT: {
      av: -71.233,
      ct: 326642,
      mn: -101.024,
      mx: -27.149,
    },
    HWS: {
      av: 4.35,
      ct: 154146,
      mn: 0.156,
      mx: 17.617,
    },
    PRE: {
      av: 761.006,
      ct: 163012,
      mn: 742.1498,
      mx: 780.3891,
    },
    WD: {
      most_common: {
        compass_degrees: 202.5,
        compass_point: "SSW",
        compass_right: -0.382683432365,
        compass_up: -0.923879532511,
        ct: 28551,
      },
      "8": {
        compass_degrees: 180.0,
        compass_point: "S",
        compass_right: 0.0,
        compass_up: -1.0,
        ct: 17699,
      },
      "9": {
        compass_degrees: 202.5,
        compass_point: "SSW",
        compass_right: -0.382683432365,
        compass_up: -0.923879532511,
        ct: 28551,
      },
      "10": {
        compass_degrees: 225.0,
        compass_point: "SW",
        compass_right: -0.707106781187,
        compass_up: -0.707106781187,
        ct: 27124,
      },
    },
    First_UTC: "2019-08-19T08:03:59Z",
    Last_UTC: "2019-08-20T08:43:34Z",
    Season: "winter",
  },
  "260": {
    AT: {
      av: -75.95,
      ct: 300789,
      mn: -101.715,
      mx: -28.634,
    },
    PRE: {
      av: 762.462,
      ct: 149206,
      mn: 741.1254,
      mx: 777.796,
    },
    WD: {
      most_common: null,
    },
    First_UTC: "2019-08-20T08:43:34Z",
    Last_UTC: "2019-08-21T09:23:09Z",
    Season: "winter",
  },
  "261": {
    AT: {
      av: -75.95,
      ct: 300789,
      mn: -101.715,
      mx: -28.634,
    },
    PRE: {
      av: 762.462,
      ct: 149206,
      mn: 741.1254,
      mx: 777.796,
    },
    WD: {
      most_common: null,
    },
    First_UTC: "2019-08-20T08:43:34Z",
    Last_UTC: "2019-08-21T09:23:09Z",
    Season: "winter",
  },
  "262": {
    AT: {
      av: -75.95,
      ct: 300789,
      mn: -101.715,
      mx: -28.634,
    },
    PRE: {
      av: 762.462,
      ct: 149206,
      mn: 741.1254,
      mx: 777.796,
    },
    WD: {
      most_common: null,
    },
    First_UTC: "2019-08-20T08:43:34Z",
    Last_UTC: "2019-08-21T09:23:09Z",
    Season: "winter",
  },
  "263": {
    AT: {
      av: -75.95,
      ct: 300789,
      mn: -101.715,
      mx: -28.634,
    },
    PRE: {
      av: 762.462,
      ct: 149206,
      mn: 741.1254,
      mx: 777.796,
    },
    WD: {
      most_common: null,
    },
    First_UTC: "2019-08-20T08:43:34Z",
    Last_UTC: "2019-08-21T09:23:09Z",
    Season: "winter",
  },
  "264": {
    AT: {
      av: -75.95,
      ct: 300789,
      mn: -101.715,
      mx: -28.634,
    },
    PRE: {
      av: 762.462,
      ct: 149206,
      mn: 741.1254,
      mx: 777.796,
    },
    WD: {
      most_common: null,
    },
    First_UTC: "2019-08-20T08:43:34Z",
    Last_UTC: "2019-08-21T09:23:09Z",
    Season: "winter",
  },
  "265": {
    AT: {
      av: -75.95,
      ct: 300789,
      mn: -101.715,
      mx: -28.634,
    },
    PRE: {
      av: 762.462,
      ct: 149206,
      mn: 741.1254,
      mx: 777.796,
    },
    WD: {
      most_common: null,
    },
    First_UTC: "2019-08-20T08:43:34Z",
    Last_UTC: "2019-08-21T09:23:09Z",
    Season: "winter",
  },
};
