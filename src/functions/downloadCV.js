import axios from "axios"
import apiConfig from "../apiConfig"

const downloadCV = async (cvLocation) => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    console.log(cvLocation)
    const cvLoc = encodeURIComponent(cvLocation)
    console.log('encoded', cvLoc)
   try {
    const response = await axios({
      method: "GET",
      responseType: "blob",
      url:
        apiConfig.baseURL + apiConfig.public.downloadCV + `?filePath=${cvLoc}`,
      // `?filePath=g4ic3sB4JRVfQ35yx45Pa3sfNf65Q%2FmtvxHal33oChJnMNR0hZez2r9AcU%2FPNHyXwAWIrk1Zy0Gb1JrAP%2BHAbV30GPiqbWctBghz0WqbcS5H9Slxh%2FAoa1x5cwSpnHLE8uZcPXrhCA8OybF0%2BsDCOfYrIEMc2qak8Lsut92%2FAbOs3Y9vuucsM4Uw6PoBlX6R`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // 'Accept-Language': 'en-US,en;q=0.9',
        // 'Encode': 'gzip, deflate, br,',
        // 'Connection': "keep-alive",
      },
    });
    console.log("download api res", response);
    const res = response.data;

    
   } catch (error) {
    console.log('error From Catch')
   }


}

export default downloadCV