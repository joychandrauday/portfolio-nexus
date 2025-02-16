/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm } from 'react-hook-form';
import { useAddBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useGetBlogByUserIdQuery } from '@/Redux/features/blogs/blogApi';
import { Blog, IBlog } from '@/types';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoadingPage from '@/components/utils/Loading';
import toast from 'react-hot-toast';

const ManageBlogPage = () => {
    // Get session info
    const { data: session, status } = useSession();

    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [open, setOpen] = useState(false);

    // Wait for session to load before proceeding
    useEffect(() => {
        if (status === 'loading') return; // Don't proceed if session is still loading
        if (!session) console.log('User not logged in');
    }, [session, status]);

    // Redux mutations
    const [createBlog] = useAddBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    // Fetch blogs using Redux query hook, only when session is ready
    const userEmail = session?.user?.email || '';
    const { data: allblogs, refetch } = useGetBlogByUserIdQuery(userEmail, { skip: !userEmail });
    const blogs = allblogs as IBlog[] | undefined;

    // React Hook Form
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            content: '',
            featuredImage: 'https://designshack.net/wp-content/uploads/placeholder-image.png',
            isPublished: true,
        },
    });

    // Handle form submit (Create or Update Blog)
    const onSubmit = async (data: { title: string; content: string; isPublished: boolean }) => {
        const blogData = {
            ...data,
            author: session?.user?.email || undefined,
            createdAt: currentBlog ? currentBlog.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            if (currentBlog) {
                const res = await updateBlog({ blogId: currentBlog._id, updatedProject: blogData });
                if (res?.data?.success) {
                    toast.success('Blog Updated successfully!');
                    refetch();
                } else {
                    toast.error("Blog update failed!");
                }
            } else {
                const res = await createBlog(blogData);
                if (res?.data?.success) {
                    toast.success('Blog Created successfully!');
                    refetch();
                } else {
                    toast.error("Blog creation failed!");
                }
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }

        setOpen(false);
        reset();
    };

    // Handle edit button click
    const handleEdit = (blog: Blog) => {
        setCurrentBlog(blog);
        setValue('title', blog.title);
        setValue('content', blog.content);
        setValue('featuredImage', blog.featuredImage);
        setValue('isPublished', blog.isPublished);
        setOpen(true);
    };

    // Handle delete blog
    const handleDelete = async (blogId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const res = await deleteBlog(blogId);
            if (res?.data?.success) {
                toast.success('Blog deleted successfully.');
                refetch();
            } else {
                toast.error('Failed to delete blog.');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    if (status === 'loading') return <LoadingPage />;
    if (!session) return <div>You must be logged in to manage blogs.</div>;

    return (
        <div className="p-6 min-h-screen my-10">
            <h1 className="text-3xl font-bold text-left mb-8">Manage Your Blogs</h1>

            <div className="flex justify-start mb-6">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <ShinyButton onClick={() => { setCurrentBlog(null); reset(); }}>Create New Blog</ShinyButton>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg bg-transparent backdrop-blur-md text-white">
                        <DialogHeader>
                            <DialogTitle>{currentBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
                            <div>
                                <label className="block text-lg">Title</label>
                                <input {...register('title', { required: 'Title is required' })} className="w-full px-4 py-2 border rounded-md bg-transparent" />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block text-lg">Featured Image</label>
                                <input {...register('featuredImage')} className="w-full px-4 py-2 border rounded-md bg-transparent" />
                            </div>
                            <div>
                                <label className="block text-lg">Content</label>
                                <textarea {...register('content', { required: 'Content is required' })} className="w-full px-4 py-2 border rounded-md bg-transparent" rows={5}></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-lg">Published</label>
                                <input type="checkbox" {...register('isPublished')} className="w-6 h-6" />
                            </div>
                            <button type="submit" className="w-full py-2 bg-black text-white hover:bg-gray-900 border border-gray-700">
                                {currentBlog ? 'Update Blog' : 'Create Blog'}
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {blogs?.length ? blogs.map((blog: IBlog) => (
                    <div key={blog._id} className="rounded-xl shadow-lg p-4 bg-gray-900">
                        <Image src={blog.featuredImage || '/default.jpg'} width={500} height={300} alt={blog.title} className="rounded-xl" />
                        <h3 className="text-xl mt-2">{blog.title}</h3>
                        <div className="mt-4 flex gap-2">
                            <ShinyButton onClick={() => handleEdit(blog)}>Edit</ShinyButton>
                            <ShinyButton onClick={() => handleDelete(blog._id)}>Delete</ShinyButton>
                        </div>
                    </div>
                )) : <p className="text-center text-xl">No blogs found.</p>}
            </div>
        </div>
    );
};

export default ManageBlogPage;
