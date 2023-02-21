import axios from "axios";

export const getScraping = async (data) => {
        const response = await axios.get("http://localhost:3000/api/scrape-olx");
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