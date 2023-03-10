/* eslint-disable consistent-return */
import axios from 'axios';

const makeRequest = async (
  baseURL,
  apiEndPoint = { url: '', method: '' },
  dynamicConfig = {},
) => {
  try {
    const requestDetails = {
      baseURL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default makeRequest;
