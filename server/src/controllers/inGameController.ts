import axios from "axios";
import { API_KEY } from "../../key";
import convert from "xml-js";

function makeUrl(word: string) {
  return `https://krdict.korean.go.kr/api/search?key=${API_KEY}&type_search=search&part=word&q=${word}&method=start&sort=dict&_csrf=a4e3be16-3af7-4b8e-8abe-ca6ddfa9130c`;
}

async function isCorrectWord(params: string) {
  const word = params;
  try {
    const res = await axios.get(makeUrl(word));
    const result = convert.xml2json(res.data, { compact: true, spaces: 4 });
    return result;
  } catch (error: any) {
    return null;
  }
}

export default isCorrectWord;
