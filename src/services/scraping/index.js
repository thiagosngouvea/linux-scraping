import axios from "axios";

export const getScraping = async () => {
        const response = await axios.get(`http://ec2-18-224-93-124.us-east-2.compute.amazonaws.com:3000/api/scrape`);
        return response;
};

export const getScrapingAmancio = async (page) => {
        const response = await axios.get(`https://www.imobiliariaamancio.com.br/api/listings?pagina=${page}`);
        return response;
}

export const getScrapingWhatsapp = async (data) => {
        const response = await axios.post(`https://graph.whatsapp.com/graphql/catalog`, data);
        return response;
}