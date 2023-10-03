import { observer } from "mobx-react";
import { BLOG_POSTS, linkFromSlug } from "../blog";
import { Link } from "react-router-dom";

export const HomePage = observer(() => {
    return (
        <div>
            <ul>
                {BLOG_POSTS.map(post => (
                    <Link to={linkFromSlug(post.slug)}>{post.title}</Link>
                ))}
            </ul>
        </div>
    );
});
