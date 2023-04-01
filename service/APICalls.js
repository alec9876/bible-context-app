import { API_KEY } from './my_api_key';

const URL_REF_A = "https://api.esv.org/v3/passage/text/?q="
const URL_REF_B = "&include-passage-references=false&include-headings=False&include-footnotes=false";

export const getAPIVerse = async (book, verse) => {
    try {
        const response = await
        fetch(URL_REF_A + book + '+' + verse + URL_REF_B, {
            method: "GET",
            headers: {
                "Authorization": API_KEY
            }
        });
        const json  = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}