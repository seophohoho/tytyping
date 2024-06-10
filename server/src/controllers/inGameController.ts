import axios from "axios";
import { API_KEY } from "../../key";
import { parseString, parseStringPromise } from "xml2js";

function makeUrl(word: string) {
  return `https://krdict.korean.go.kr/api/search?key=${API_KEY}&type_search=search&part=word&q=${word}&method=start&sort=dict&_csrf=a4e3be16-3af7-4b8e-8abe-ca6ddfa9130c`;
}

async function isCorrectWord(params: string): Promise<any> {
  const word = params;
  try {
    const res = await axios.get(makeUrl(word));
    const xmlData = res.data; // AxiosResponse 객체에서 data 추출
    const jsonResult = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    return JSON.stringify(jsonResult, null, 2);
  } catch (error) {
    console.error("Error fetching or parsing XML:", error);
    return null;
  }
}
export default isCorrectWord;
