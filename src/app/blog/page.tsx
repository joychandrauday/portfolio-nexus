
import { ShinyButton } from '@/components/magicui/shiny-button';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { FaUser } from 'react-icons/fa';
import { IBlog } from '@/types';
export interface APIResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: IBlog[]; // The array of blogs
}
const BlogPage = async () => {
    // Fetch the data server-side
    const res = await fetch('https://blog-chronicle-backend.vercel.app/api/blogs');
    const blogs: APIResponse = await res.json();
    if (!blogs) {
        return <div>No blogs found</div>; // Handle case where no blogs exist
    }
    return (
        <>
            <Head>
                <title>Blog Page | Explore Latest Articles</title>
                <meta name="description" content="Read insightful blogs on various topics, written by experts. Stay updated with the latest trends and stories." />
                <meta name="keywords" content="blog, articles, latest news, insights, trends" />
                <meta name="author" content="Your Website Name" />
                <meta property="og:title" content="Blog Page | Explore Latest Articles" />
                <meta property="og:description" content="Read insightful blogs on various topics, written by experts. Stay updated with the latest trends and stories." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/default-image.jpg" />
                <meta property="og:url" content="https://yourwebsite.com/blog" />
                <meta name="twitter:title" content="Blog Page | Explore Latest Articles" />
                <meta name="twitter:description" content="Read insightful blogs on various topics, written by experts. Stay updated with the latest trends and stories." />
                <meta name="twitter:image" content="/default-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <div className='w-[95%] mx-auto py-12'>
                <h1 className="text-4xl font-bold text-left text-gray-900 dark:text-white mb-12">
                    Welcome to Blog Page
                </h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
                    {blogs?.data.map((blog: IBlog) => (
                        <div key={blog._id} className="group w-full max-w-sm mx-auto rounded-xl shadow-xl transition-transform duration-300 transform perspective-1000 hover:scale-[1.05] hover:rotate-[1deg]">
                            <div className="relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-emerald-500 transition-all duration-300">
                                <div className="relative w-full h-52 overflow-hidden rounded-t-xl">
                                    <Image
                                        src={blog?.featuredImage || '/default-image.jpg'}
                                        width={500}
                                        height={500}
                                        alt={blog?.title}
                                        className="object-cover w-full h-full rounded-t-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-1"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-white">{blog.title}</h3>
                                    <p className="mt-2 text-md text-gray-300">{blog.content.slice(0, 120)}...</p>
                                    <div className="flex items-center text-sm gap-2">
                                        <FaUser /> {blog.author}
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <Link href={`/blog/${blog._id}`}>
                                            <ShinyButton>
                                                <div className="flex items-center">
                                                    Read More →
                                                </div>
                                            </ShinyButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogPage;
