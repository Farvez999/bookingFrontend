"use client";
import { useGetallblogsQuery } from "@/redux/api/contentApi";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

const Blog = () => {
  const { data } = useGetallblogsQuery(undefined);
  return (
    <div className="h-screen container mx-auto">
      <h1 className="text-3xl text-blue-500 font-bold text-center my-8">
        Some Blogs
      </h1>
      <div className="grid lg:grid-cols-3  gap-4 grid-cols-1">
        {data?.map((blog: any) => (
          <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
              <figure>
                <Image src={blog?.image} alt="Album" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>
                  publicationDate:{" "}
                  {format(new Date(blog?.createdAt), "yyyy MMM dd")}
                </p>
                <p>category: {blog?.category}</p>
                <div className="card-actions justify-end">
                  <Link href={`/blog/${blog?._id}`}>
                    <button className="btn btn-accent bg-blue-600 text-white border-0">
                      details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Blog;
