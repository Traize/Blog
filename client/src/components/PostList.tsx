import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";


const PostList: React.FC = () => {
    const {page, limit, posts, error,isLoading} = useTypedSelector(state => state.post)
    const {fetchPosts} = useActions()
    const pages = []
    useEffect(()=>{
        fetchPosts(page, limit)
    },[page])

    if (isLoading){
        return <h1>Идёт загрузка...</h1>
    }
    if (error){
        return <h1>{error}</h1>
    }
    return(
        <div>
            {posts.map(posts =>
            <div key={posts._id}>
                <h1>{posts.title}</h1>
                <h2>{posts.description}</h2>
            </div>
            )}
        </div>
    ) ;
};

export default PostList