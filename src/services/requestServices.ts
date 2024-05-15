import axios from "axios";

const $host = axios.create({
  baseURL: "https://siricrm.up.railway.app/",
});

export { $host };
