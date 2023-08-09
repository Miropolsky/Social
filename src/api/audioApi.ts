import axios from "axios";

export const MusicApi = {
    async getMusic(text='eminem'){
        return await axios.request({
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
            params: {q: text},
            headers: {
              'X-RapidAPI-Key': '1791a5ea09mshf2316e5676189e5p104773jsn995991524f72',
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
          }).then(res=> res.data)
    }
}

  