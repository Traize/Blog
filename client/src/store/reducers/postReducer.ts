import { PostState, PostAction, PostActionTypes } from "../../types/IPost";

const initialState: PostState = {
  posts: [],
  error: '',
  page: 1,
  limit: 10,
}
export const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return { ...state }
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload }
    case PostActionTypes.FETCH_POSTS_ERROR:
      return { ...state, error: action.payload }
    case PostActionTypes.UPDATE_POST:
      return { ...state, posts: action.payload }
    case PostActionTypes.SET_POST_PAGE:
      return { ...state, page: action.payload }
    case PostActionTypes.DELETE_POST:
      return { ...state }
    default:
      return state
  }
}

