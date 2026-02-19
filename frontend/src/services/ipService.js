import axios from "axios";

const IPINFO_TOKEN = process.env.REACT_APP_IPINFO_TOKEN || "";

export const ipService = {
  getMyGeoInfo: async () => {
    const url = IPINFO_TOKEN
      ? `https://ipinfo.io/geo?token=${IPINFO_TOKEN}`
      : "https://ipinfo.io/geo";
    const response = await axios.get(url);
    return response.data;
  },
  getGeoInfo: async (ip) => {
    const url = IPINFO_TOKEN
      ? `https://ipinfo.io/${ip}/geo?token=${IPINFO_TOKEN}`
      : `https://ipinfo.io/${ip}/geo`;
    const response = await axios.get(url);
    return response.data;
  },
};

export const isValidIp = (value) => {
  const ipv4 = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)(\.(25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/;
  const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4.test(value) || ipv6.test(value);
};

export const parseCoords = (loc) => {
  if (!loc) return null;
  const parts = loc.split(",");
  if (parts.length !== 2) return null;
  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lng)) return null;
  return { lat, lng };
};