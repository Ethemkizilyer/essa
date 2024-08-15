"use client"
import React from "react";
import PostComponent from "../../components/PostList.tsx";

const PostsPage: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-center py-4 font-bold text-2xl">Posts</h1>
        <PostComponent />
    </div>
  );
};

export default PostsPage;
