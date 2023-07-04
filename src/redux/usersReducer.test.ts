import { InitialState, actions, usersReducer } from "./usersReducer";

let state: InitialState;


//Перед каждый тестом задавать это значения
beforeEach(()=> {
    state = {
        users: [
            {
                id: 0, name: 'Dsss', followed: false, photos: {small:null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'sss1', followed: true, photos: {small:null, large: null}, status: 'status 1'
            },
            {
                id: 2, name: 'Dsss2', followed: true, photos: {small:null, large: null}, status: 'status 2'
            },
        ],
        pageSize: 5,
        totalUsersCount: 20,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [],
    };
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy() // Значение false
    expect(newState.users[1].followed).toBeTruthy() // Значение true
})
test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2))
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeFalsy()
})