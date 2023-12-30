import axios from "axios";

export default async function getExchangeRate(oldCurrency, newCurrency) {
  try {
    const response =
    await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/${oldCurrency}/${newCurrency}`);

    

    return response.data.conversion_rate;
  } catch (error) {
    throw error.data;
  }
}
