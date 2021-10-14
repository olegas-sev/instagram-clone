import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

function Post({ id, username, userImg, img, caption }) {
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
            {/* Comments */}
            {/* Input box */}
        </div>
    );
}

export default Post;
