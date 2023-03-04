const initialState = {
    musics: [
        { id: 0, track: 'Темная ночь', author: 'Каспийский груз' },
        { id: 1, track: 'Дальнобойщики', author: 'Красный огонек' },
        { id: 2, track: 'Кино', author: 'Macan' },
    ],
};

const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default musicReducer;
