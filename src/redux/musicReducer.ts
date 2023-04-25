type MusicType = {
    id: number,
    track: string,
    author: string
}

type MusicInitialStateType = {
    musics: Array<MusicType>
}

const initialState: MusicInitialStateType = {
    musics: [
        { id: 0, track: 'Темная ночь', author: 'Каспийский груз' },
        { id: 1, track: 'Дальнобойщики', author: 'Красный огонек' },
        { id: 2, track: 'Кино', author: 'Macan' },
    ],
};

const musicReducer = (state = initialState) => {
    return state;
};

export default musicReducer;
