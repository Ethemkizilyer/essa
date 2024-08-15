"use client"

import React, { useEffect, useState } from "react";
import { Post } from "../api/PostService";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, fetchPosts, updatePost } from "../features/postSlice";
import { AppDispatch, RootState } from "../store/store";
import Loading from "./Loading";
import Error from "./Error";
import { useRouter } from "next/navigation";

const PostComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const { data: posts } = useSelector((state: RootState) => state.posts);
  const [update, setUpdate] = useState<Post>({ id: 0, title: "", body: "",userId:1 });
  const [postLoading, setPostLoading] = useState<{ [key: number]: boolean }>({})
  const [postError, setPostError] = useState<{ [key: number]: string | null }>({})

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  const handleAddPost = async () => {
    setPostLoading((prev) => ({ ...prev, [-1]: true }))
    try {
      await dispatch(createPost({ id: Date.now(), title: update.title, body: "", userId: 1 }));
      setUpdate({ id: 0, title: "", body: "", userId: 1 })
    } catch (error: any) {
      setPostError((prev) => ({ ...prev, [-1]: error.message }))
    } finally {
      setPostLoading((prev) => ({ ...prev, [-1]: false }))
    }
  }

  const handleDeletePost = async (id: number) => {
    setPostLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(deletePost(id));
    } catch (error: any) {
      setPostError((prev) => ({ ...prev, [id]: error.message }));
    } finally {
      setPostLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleUpdate = async (id: number) => {
    const postToUpdate = id === -1 ? { id: id, title: update.title, body: "", userId: 1 } : posts?.find((item) => item?.id === id);
    if (postToUpdate) {
      setUpdate(postToUpdate);
    }
  };

  const handleUpdatePost = async (id: number, item: Post) => {
    setPostLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(updatePost(item));
      setUpdate({ id: 0, title: "", body: "", userId: 1 });
    } catch (error: any) {
      setPostError((prev) => ({ ...prev, [id]: error.message }));
    } finally {
      setPostLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="flex flex-wrap flex-grow p-4 container mx-auto">
      <button className="py-1 px-2 bg-blue-600 text-white rounded-lg" onClick={() => handleUpdate(-1)}>Add Post</button>
      <div className="p-4 flex flex-wrap justify-between items-center">
        {update?.id || update?.id === -1 ? (
          <div className="flex flex-col justify-center items-center text-center shadow-md rounded-lg overflow-hidden h-36 w-72 group relative border m-2 bg-orange-400">
            <textarea
              className="w-[90%] overflow-hidden"
              value={update?.title}
              onChange={(e) =>
                setUpdate((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <button
              className="btn p-1 rounded-lg mt-2 bg-blue-500"
              onClick={() =>
                update.id === -1
                  ? handleAddPost()
                  : handleUpdatePost(update.id, update)
              }
            >
              {postLoading[update.id] ? "Loading..." : "Update"}
            </button>
          </div>
        ) : (
          <div className="flex-none hidden"></div>
        )}

        {posts.map((post) => (
          <div className="flex flex-col bg-white justify-center items-center text-center shadow-md rounded-lg overflow-hidden h-36 w-72 group relative border m-2" key={post.id}>
            {postLoading[post.id] ? (
              <Loading />
            ) : postError[post.id] ? (
              <Error error={postError[post.id] || "Unknown error"} />
            ) : (
              <>
                <div onClick={() => router.push(`/detail/${post.id}`)} className="cursor-pointer">
                  {post.title}
                </div>
                <div>
                  <button
                    className="btn p-1 rounded-lg mt-2 me-1 bg-orange-500"
                    onClick={() => handleUpdate(post.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn p-1 rounded-lg mt-2 bg-red-500"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;
