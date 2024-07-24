import { createAxiosClient } from "./createAxiosClient";

const REFRESH_TOKEN_URL = 'http://localhost:3001'
const BASE_URL = 'http://localhost:3001'
// const BASE_URL = 'https://backend.destructo.workers.dev'

function getCurrentAccessToken() {
    // this is how you access the zustand store outside of React.
    return sessionStorage.getItem("access_token");
}

function getCurrentRefreshToken() {
    // this is how you access the zustand store outside of React.
    return sessionStorage.getItem("refresh_token");
}

function setRefreshedTokens(tokens){
    console.log('set tokens...')
}

async function logout(){
    console.log('logout...')
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})