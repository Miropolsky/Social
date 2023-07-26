import axios from "axios";
const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=ru&' +
          'apiKey=e880dedd82d8480e80ae1835b02d8ac8';
const instance = axios.create({
    baseURL: url
});

export type NewsType = {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: null | string,
    url: string | null,
    urlToImage: string | null,
    publishedAt: string,
    content: string | null
}

type getNews = {
    status: string,
    totalResults: number,
    articles: NewsType[] | null,
}

export const NewsApi = {
    getNews() {
        return instance.get<getNews>('');
    }
}
