"use client"

import React, { useEffect, useState } from "react";
import { Post } from "../api/PostService";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, fetchPosts, postUpdate, updatePost } from "../features/postSlice";
import { AppDispatch, RootState } from "../store/store";
import Loading from "./Loading";
import Error from "./Error";
import { useRouter } from "next/navigation";

const PostComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router=useRouter()
  const { data: posts, loading, error } = useSelector((state: RootState) => state.posts);
  const [update, setUpdate] = useState<Post>({ id: 0, title: "", body: "",userId:1 })

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])


  const handleAddPost = async () => {
    dispatch(createPost({ id: Date.now(), title: update.title, body: "" ,userId:1}));
    setUpdate({ id: 0, title: "", body: "",userId:1 })

  }

  const handleDeletePost = async (id: number) => {
    dispatch(deletePost(id));
  };
  
  const handleUpdate = async (id: number) => {
    if (id === -1) {
        const newPost = { id: id, title: update.title, body: "",userId:1 };
        setUpdate(newPost);
    } else {
      const postToUpdate = posts?.find((item) => item?.id === id);
      if (postToUpdate) {
        setUpdate(postToUpdate);
      }
    }
  };
  const handleUpdatePost = async (id: number, item: Post) => {
    dispatch(updatePost(item))
    dispatch(postUpdate(item))
    setUpdate({ id: 0, title: "", body: "",userId:1 });
  };

  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  return (
    <div className="flex flex-wrap flex-grow p-4 container mx-auto">
      <button className="py-1 px-2 bg-blue-600 text-white rounded-lg" onClick={() => handleUpdate(-1)}>Add Post</button>
      <div className="p-4 flex flex-wrap  justify-between items-center ">
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
              Update
            </button>
          </div>
        ) : (
          <div className=" flex-none hidden"></div>
        )}

        {posts.map((post) => (
          <div onClick={()=>router.push(`/detail/${post.id}`)} className="flex flex-col bg-white justify-center items-center text-center shadow-md rounded-lg overflow-hidden h-36 w-72 group relative border m-2">
            <div key={post.id}>{post.title}</div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;
