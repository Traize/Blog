import axios from "axios"
import { Dispatch } from "react"
import { PostAction, PostActionTypes } from "../../types/IPost"

export const fetchPosts = (page = 1, limit = 9) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({ type: PostActionTypes.FETCH_POSTS })
            const respone = await axios.get('http://localhost:5000/api/post', {
                params: { page: page, limit: limit }
            })

            dispatch({ type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: respone.data })

        } catch (e) {

            dispatch({ type: PostActionTypes.FETCH_POSTS_ERROR, payload: 'Error' })

        }
    }
}

export function setPostsPage(page: number): PostAction {
    return { type: PostActionTypes.SET_POST_PAGE, payload: page }
}