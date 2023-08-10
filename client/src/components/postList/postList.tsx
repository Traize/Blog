import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import classes from './myPostList.module.css'


const PostList: React.FC = () => {
    const {page, limit, posts, error,} = useTypedSelector(state => state.post)
    const {fetchPosts} = useActions()
    useEffect(()=>{
        fetchPosts(page, limit)
    }, [page])


    if (error){
        return <h1>{error}</h1>
    }
    return(
        <div className={classes.myList}>
            {posts.map(posts =>
            <div key={posts._id} className={classes.myPost}>
                <h1 className={classes.myTitle}>{posts.title}</h1>
                <div className={classes.myDescription}>{posts.description}</div>
            </div>
            )}
        </div>
    ) ;
};

export default PostList