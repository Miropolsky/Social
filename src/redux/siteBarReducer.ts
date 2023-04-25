type FriendType = {
    name: string,
    id: Number,
    imgUrl: string
}
type SiteBarInitialStateType = {
    friends: Array<FriendType>,
};

type SiteBarReducerType = (state: SiteBarInitialStateType) => SiteBarInitialStateType


const initialState: SiteBarInitialStateType = {
    friends: [
        {
            name: 'Andrey',
            id: 1,
            imgUrl: 'https://shutniks.com/wp-content/uploads/2019/12/Avatarki_paren_6_07164309.jpg',
        },
        {
            name: 'Alexey',
            id: 2,
            imgUrl: 'https://i.ytimg.com/vi/_EVvJeClXtI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHggISh_MA8=&rs=AOn4CLDSY4Cw7ELBJFRs1jFEYaVO6kmxWA',
        },
        {
            name: 'Sergey',
            id: 3,
            imgUrl: 'https://coolsen.ru/wp-content/uploads/2021/06/15-8.jpg',
        },
    ],
};


const siteBarReducer: SiteBarReducerType = (state = initialState) => {
    return state;
};

export default siteBarReducer;
