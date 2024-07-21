import axios from "axios";

export const BASE_URL = "http://localhost:3001";

export const publishArticle = async (payload={}) => {
    try{
        const response = await axios.post(`${BASE_URL}/api/v1/blog`, payload, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMjkyNWFjLTRlODUtNGNhYy04OTQwLWJhZjBkMzUyZmE2OSIsImV4cCI6MTcyMTU1NTgwMzkxM30.KLbenENOX_ui-eSpv92kHmwyhoOYBvwk_uWBVaMeJpw`
            }
        });
        return response;
    }catch(err){
        //Show error toast
    }
}