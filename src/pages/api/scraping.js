import axios from "axios";

export const getScraping = async (data) => {
        const response = await axios.get("http://localhost:3000/api/scrape");
        return response;
};

export const getScrapingOlx = async (url) => {
        const response = await axios.get(url);
        return response;
};

export const getScrapingOlxPup = async (url) => {
        const response = await axios.get("http://localhost:3000/api/scrape-olx");
        return response;
}

export const getScrapingWhatsapp = async (data) => {
        const response = await axios.post("https://graph.whatsapp.com/graphql/catalog",data);
        return response;
}