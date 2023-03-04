const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    users: [
        // {
        //     id: 1,
        //     photoUrl:
        //         'https://kartinkin.net/uploads/posts/2022-02/thumbs/1645485890_21-kartinkin-net-p-top-kartinki-na-avu-24.jpg',
        //     followed: false,
        //     fullName: 'Pavel',
        //     status: 'Пашка лучший',
        //     location: { city: 'Moscow', country: 'Russia' },
        // },
        // {
        //     id: 2,
        //     photoUrl:
        //         'https://kartinkin.net/uploads/posts/2022-02/thumbs/1645485890_21-kartinkin-net-p-top-kartinki-na-avu-24.jpg',
        //     followed: true,
        //     fullName: 'Саша',
        //     status: 'Саша программист в Москве',
        //     location: { city: 'Ekaterinburg', country: 'Russia' },
        // },
        // {
        //     id: 3,
        //     photoUrl:
        //         'https://kartinkin.net/uploads/posts/2022-02/thumbs/1645485890_21-kartinkin-net-p-top-kartinki-na-avu-24.jpg',
        //     followed: false,
        //     fullName: 'Леха',
        //     status: 'Я самый главный в Москве',
        //     location: { city: 'Salda', country: 'Russia' },
        // },
    ],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
};

const follow = (userId) => {
    return {
        type: FOLLOW,
        userId,
    };
};
const unfollow = (userId) => {
    return {
        type: UNFOLLOW,
        userId,
    };
};

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    };
};

const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    };
};

const setTotalUsersCount = (totalCount) => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount,
    };
};

const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    };
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (action.userId === u.id) {
                        return { ...u, followed: true };
                    }
                    return u;
                }),
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (action.userId === u.id) {
                        return { ...u, followed: false };
                    }
                    return u;
                }),
            };

        case SET_USERS:
            return { ...state, users: action.users };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };
        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalCount };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        default:
            return state;
    }
};

export {
    usersReducer,
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
};
