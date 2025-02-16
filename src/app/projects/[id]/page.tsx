import React from "react";
import Head from "next/head"; // Import Head for dynamic title
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaServer } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiFirebase } from "react-icons/si";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { JSX } from "react/jsx-runtime";

// Define types for project and technologies
interface Project {
    title: string;
    coverImage: string;
    description: string;
    projectType: string;
    liveLink?: string;
    clientCodeLink?: string;
    serverCodeLink?: string;
    features: string[];
    usedTechnologies: string[];
    underDevelopment: boolean;
}

interface TechIcons {
    [key: string]: JSX.Element;
}

async function SingleProject({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await fetch(`https://blog-chronicle-backend.vercel.app/api/projects/${id}`);
    const project: Project = await res.json();

    const techIcons: TechIcons = {
        React: <SiReact className="text-blue-500" />,
        NextJS: <SiNextdotjs className="text-black" />,
        TailwindCSS: <SiTailwindcss className="text-teal-500" />,
        MongoDB: <SiMongodb className="text-green-500" />,
        Express: <SiExpress className="text-gray-700" />,
        Firebase: <SiFirebase className="text-orange-500" />,
    };

    return (
        <>
            {/* ✅ SEO Optimized Dynamic Title */}
            <Head>
                <title>{project?.title ? `${project.title} | My Portfolio` : "Project Details"}</title>
                <meta name="description" content={project?.description || "Project details and features"} />
                <meta name="keywords" content="React, Next.js, Web Development, Projects" />
                <meta name="author" content="Joy Chandra Uday" />
                <meta property="og:title" content={project?.title || "Project Details"} />
                <meta property="og:description" content={project?.description || "Explore project features and technologies"} />
                <meta property="og:image" content={project?.coverImage || "/default-image.jpg"} />
                <meta property="og:type" content="website" />
            </Head>

            <div className="w-[95%] mx-auto p-6 grid grid-cols-1 py-12 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex flex-col items-center text-left space-y-4">
                    <h1 className="relative px-6 py-3 text-white text-3xl font-bold shadow-lg hover:shadow-xl transition-all text-left">
                        {project?.title}
                    </h1>
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={project?.coverImage}
                            alt="Project Cover"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            priority
                        />
                    </div>
                    <span className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full shadow-md">
                        {project?.projectType}
                    </span>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <p className="text-lg text-gray-600 dark:text-gray-300">{project?.description}</p>

                    {/* Links Section */}
                    <div className="flex flex-wrap gap-4">
                        {project?.liveLink && (
                            <ShinyButton>
                                <a href={project?.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <FaExternalLinkAlt className="mr-2" /> Live Project
                                </a>
                            </ShinyButton>
                        )}
                        {project?.clientCodeLink && (
                            <ShinyButton>
                                <a href={project?.clientCodeLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <FaGithub className="mr-2" /> Client Code
                                </a>
                            </ShinyButton>
                        )}
                        {project?.serverCodeLink && (
                            <ShinyButton>
                                <a href={project?.serverCodeLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                    <FaServer className="mr-2" /> Server Code
                                </a>
                            </ShinyButton>
                        )}
                    </div>

                    {/* Features Section */}
                    {project?.features?.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Key Features</h2>
                            <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                                {project.features.map((feature: string, index: number) => (
                                    <li key={index} className="text-lg flex items-start">
                                        <span className="mr-2">✅</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies Section */}
                    {project?.usedTechnologies?.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Technologies Used</h2>
                            <div className="mt-4 flex flex-wrap gap-4">
                                {project.usedTechnologies.map((tech: string, index: number) => (
                                    <RippleButton key={index} rippleColor="#ADD8E6" className="flex items-center">
                                        {techIcons[tech] || "🔹"} <span className="ml-2 text-gray-700 dark:text-gray-300">{tech}</span>
                                    </RippleButton>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Project Status Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Project Status</h2>
                        <p className="mt-2 text-lg">
                            {project?.underDevelopment ? (
                                <span className="text-red-500">🚧 Under Development</span>
                            ) : (
                                <span className="text-green-500">✅ Completed</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProject;
