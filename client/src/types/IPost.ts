export interface IPost {
    _id: string,
    title: string,
    description: string,
    img?: string,
    cover?: string,
}



export interface PostState {
    posts: IPost[];
    error: null | string;
    page: number;
    limit: number;
}

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
    CREATE_POST = 'CREATE_POST',
    UPDATE_POST = 'UPDATE_POST',
    DELETE_POST = 'DELETE_POST',
    SET_POST_PAGE = 'SET_POST_PAGE'
}

interface FetchPostsAction {
    type: PostActionTypes.FETCH_POSTS;
}
interface FetchPostsSuccessAction {
    type: PostActionTypes.FETCH_POSTS_SUCCESS;
    payload: IPost[]
}
interface FetchPostsErrorAction {
    type: PostActionTypes.FETCH_POSTS_ERROR;
    payload: string
}

interface CreatePostAction {
    type: PostActionTypes.CREATE_POST;
    payload: IPost[]
}
interface UpdatePostAction {
    type: PostActionTypes.UPDATE_POST;
    payload: IPost[]
}
interface DeletePostAction {
    type: PostActionTypes.DELETE_POST;
}
interface SetPostPageAction {
    type: PostActionTypes.SET_POST_PAGE;
    payload: number;
}

export type PostAction =
    FetchPostsAction |
    FetchPostsSuccessAction |
    FetchPostsErrorAction |
    CreatePostAction |
    UpdatePostAction |
    DeletePostAction |
    SetPostPageAction