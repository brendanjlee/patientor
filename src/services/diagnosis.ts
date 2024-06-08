import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
  return data;
};

export default {
  getAllDiagnosis,
};
