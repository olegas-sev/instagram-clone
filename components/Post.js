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
import { useState } from "react"

function Post({ id, username, userImg, img, caption }) {
    const [emojiOpened, setEmojiOpened] = useState(false)
    const addEmoji = function () {}
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

            {/* Buttons */}
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    <HeartIcon className="btn" />
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn" />
                </div>
                <BookmarkIcon className="btn" />
            </div>

            {/* CONTINUE ON https://youtu.be/a6Xs2Ir40OI?t=8120 */}

            {/* Caption */}
            <p className="p-5 truncate">
                <span className="font-semibold mr-1">{username}</span>
                {caption}
            </p>
            {/* Comments */}

            {/* Input box */}
            <form className="flex items-center p-4">
                <div className="flex flex-col relative">
                    {emojiOpened ? (
                        <Picker
                            onSelect={(emoji) => console.log(emoji.native)}
                            style={{
                                position: "absolute",
                                bottom: "45px",
                                left: "-16px"
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
                    className="border-none flex-1 focus:ring-0"
                    placeholder="Add a comment..."
                />
                <button className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    )
}

export default Post
