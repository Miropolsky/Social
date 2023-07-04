import { follow, unfollow } from "./usersReducer"
import { usersApi } from "../api/usersApi";
import { ResponseType } from "../api/api";
import { actions } from "./usersReducer";

jest.mock("../api/usersApi")
const userApiMock = usersApi as jest.Mocked<typeof usersApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userApiMock.follow.mockClear();
    userApiMock.unfollow.mockClear();
})
const result: ResponseType = {
    resultCode: 0,
    messages: [],
    data: {}
}


test('success follow thunk', async ()=> {
    userApiMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1);
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async ()=> {
    userApiMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1);
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})