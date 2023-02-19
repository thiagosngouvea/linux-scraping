import axios from "axios";

export const getScraping = async (data) => {
        const response = await axios.get("http://localhost:3000/api/scrape");
        return response;
};
