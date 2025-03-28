import { API_KEY } from './my_api_key';

const URL_REF_A = "https://api.esv.org/v3/passage/html/?q="
const URL_REF_Atext = "https://api.esv.org/v3/passage/text/?q="
const URL_REF_B = "&include-passage-references=false&include-headings=true&include-footnotes=false&include-verse-anchors=true";
const URL_REF_C = "&include-passage-references=false&include-headings=false&include-footnotes=false&include-verse-numbers=false";

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
        console.error("API error",error);
    }
}

export const getAPITextVerse = async (book, verse) => {
    try {
        const response = await
        fetch(URL_REF_Atext + book + '+' + verse + URL_REF_C, {
            method: "GET",
            headers: {
                "Authorization": API_KEY
            }
        });
        const json  = await response.json();
        return json;
    } catch (error) {
        console.error("API Memory Verse",error);
    }
}

export const getAPIHighlights = async (id) => {
    try {
        const response = await
        fetch(URL_REF_Atext + id + URL_REF_C, {
            method: "GET",
            headers: {
                "Authorization": API_KEY
            }
        });
        const json  = await response.json();
        return json;
    } catch (error) {

    }
}