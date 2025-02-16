import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShinyButton } from "@/components/magicui/shiny-button";

interface IBlog {
    _id: string;
    title: string;
    content: string;
    author?: string;
    createdAt: string;
    updatedAt: string;
    featuredImage?: string;
}

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    if (!id) {
        return notFound();
    }
    try {
        const response = await fetch(`https://blog-chronicle-backend.vercel.app/api/blogs/${id}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return notFound();
        }

        const jsonData = await response.json();
        const blog: IBlog = jsonData.data;

        return (
            <div className="mx-auto pt-12 pb-16 px-6 text-white rounded-xl shadow-lg backdrop-blur-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="wrap">
                        <h1 className="text-4xl font-bold text-right text-gray-100 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="text-right text-gray-400 mb-8">
                            <p>Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
                            <p>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
                            <p className="mt-2 text-lg font-medium text-gray-300">
                                By <span className="text-emerald-400">{blog.author || "Unknown Author"}</span>
                            </p>
                        </div>

                        <div className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
                            <p className="text-lg text-gray-300 leading-relaxed text-right">{blog.content}</p>
                        </div>

                        <div className="flex justify-end mt-8">
                            <Link href="/blog">
                                <ShinyButton>
                                    <div className="flex items-center gap-2">← Back to Blogs</div>
                                </ShinyButton>
                            </Link>
                        </div>
                    </div>

                    <div className="wrap">
                        <div className="flex justify-center mb-8">
                            <Image
                                src={blog.featuredImage || "/default-image.jpg"}
                                width={800}
                                height={450}
                                alt={blog.title}
                                className="rounded-xl shadow-md object-cover w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return notFound();
    }
};

export default SingleBlog;
