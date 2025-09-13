import { useParams, useLoaderData } from "react-router-dom";
import articles from '../article-content';
import axios from 'axios';
import CommentsList from "../CommentsList";

export default function ArticlePage() {
    const params = useParams();
    const name = params.name;

    const {upvotes, comments} = useLoaderData();

    // or
    // const { name } = useParams();

    const article = articles.find(a => a.name === name);

    return (
        <>
            <h1>{article.title}</h1>
            <p>This article has {upvotes} upvotes!</p>
            {article.content.map(p => <p key={p}>{p}</p>)}
            <CommentsList comments={comments}/>
        </>
    )
}

export async function loader({ params }) {
        const response = await axios.get('/api/articles/' + params.name);
        const {upvotes, comments} = response.data;
        return { upvotes, comments };
}