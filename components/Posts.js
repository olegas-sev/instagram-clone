import Post from "./Post";

const posts = [
    {
        id: "123",
        username: "4kt.os",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "This is dope, I like this instagram clone!",
    },
    {
        id: "123",
        username: "4kt.os",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "This is dope, I like this instagram clone!",
    },
    {
        id: "123",
        username: "4kt.os",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "This is dope, I like this instagram clone!",
    },
];

function Posts() {
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}

export default Posts;
