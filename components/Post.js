import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"
import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore"
import { db } from "../firebase"
import Moment from "react-moment"

function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [emojiOpened, setEmojiOpened] = useState(false)
    const [hasLiked, setHasLiked] = useState(false)
    const commentRef = useRef(null)

    // First init set state on comments, updates on database update
    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    )

    // Loops over updates and updates the state on database or id change
    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    )

    useEffect(
        () =>
            setHasLiked(
                likes.findIndex((like) => like.id === session?.user?.uid) !== -1
            ),
        [likes]
    )

    // Liking a post
    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            })
        }
    }

    // Making a comment
    const sendComment = async (e) => {
        e.preventDefault()
        const commentToSend = comment
        setComment("")
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    return (
        <div className="bg-white my-5 border-rounded-sm border border-gray-200">
            {/* Header */}
            <div className="flex items-center p-5">
                <img
                    src={userImg}
                    className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
                    alt={username}
                />
                <p className="flex-1">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            {/* Img */}
            <img
                src={img}
                className="object-cover w-full"
                alt={"Picture of " + username}
            />

            {/* Buttons only if logged in */}
            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        {hasLiked ? (
                            <HeartIconFilled
                                onClick={likePost}
                                className="btn"
                                className="btn text-[#ed4956]"
                            />
                        ) : (
                            <HeartIcon onClick={likePost} className="btn" />
                        )}
                        <ChatIcon onClick={() => {commentRef.current.focus()}} className="btn" />
                        <PaperAirplaneIcon className="btn" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            )}

            {/* Caption if it exists? */}
            {caption && (
                <p className="p-5 pt-3 truncate">
                    {likes.length > 0 && (
                        <p className="font-semibold mb-1">{likes.length} likes</p>
                    )}

                    <span className="font-semibold mr-1">{username}</span>
                    {caption}
                </p>
            )}
            {/* Comments */}
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div
                            className="flex items-center space-x-2 mb-3"
                            key={comment.id}
                        >
                            <img
                                className="h-7 rounded-full"
                                src={comment.data().userImage}
                                alt={
                                    "Commented user's " +
                                    comment.data().username +
                                    " picture"
                                }
                            />
                            <p className="text-sm flex-1">
                                <span className="font-semibold">
                                    {comment.data().username}
                                </span>{" "}
                                {comment.data().comment}
                            </p>
                            <Moment
                                fromNow
                                className="pr-5 text-sm text-gray-500"
                            >
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* Input box only if logged in */}
            {session && (
                <form className="flex items-center p-4">
                    <div className="flex flex-col relative">
                        {emojiOpened ? (
                            <Picker
                                onSelect={(emoji) =>
                                    setComment(comment + emoji.native)
                                }
                                style={{
                                    position: "absolute",
                                    bottom: "45px",
                                    left: "-16px",
                                }}
                                title="Pick your emoji…"
                                emoji="point_up"
                            />
                        ) : null}
                        <EmojiHappyIcon
                            className="h-7 btn"
                            onClick={() => setEmojiOpened(!emojiOpened)}
                        />
                    </div>

                    <input
                        type="text"
                        value={comment}
                        ref={commentRef}
                        onChange={(e) => setComment(e.target.value)}
                        className="border-none flex-1 focus:ring-0"
                        placeholder="Add a comment..."
                    />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="font-semibold text-blue-400"
                        onClick={sendComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post
