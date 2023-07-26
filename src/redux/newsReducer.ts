import { NewsApi, NewsType } from "../api/NewsApi";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

const initialState = {
    posts: [] as NewsType[],
};

const actions = {
    getPosts: (posts: Array<NewsType>) => ({
        type: 'news/GET_POSTS',
        posts
    }) as const
}

const newsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
    case 'news/GET_POSTS': {
          return {...state, posts: action.posts}  
    }
    default: return state;

    }
};

const getPosts = ():ThunkType => {
    return async (dispatch) => {
        let res = await NewsApi.getNews();
        if (res.data.articles !== null) {
            dispatch(actions.getPosts(res.data.articles))
        }
    };
};

export {newsReducer, actions, getPosts}

export type InitialState = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
