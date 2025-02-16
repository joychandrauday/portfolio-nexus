import React from 'react';
import { FaCopy, FaGithub } from "react-icons/fa";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Designation from "@/components/utils/Designation";
import { IoDocumentText } from "react-icons/io5";
import LatestProjects from "@/components/utils/LatestProjects";
import Image from "next/image";
import Link from "next/link";
import SkilledStack from '@/app/skill/page';
const BannerElements = () => {
    return (
        <div className="min-h-[90vh] px-6 py-10 sm:py-16 md:py-24 lg:py-20">
            <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-center lg:justify-between lg:gap-12 text-center lg:text-left">
                {/* Optimized Image */}
                <div className="relative w-60 sm:w-72 md:w-80 lg:w-2/6">
                    <Image
                        src="https://res.cloudinary.com/dklikxmpm/image/upload/v1739120856/download-2_hnaegx.png"
                        alt="Joy Chandra Uday"
                        width={500}
                        height={500}
                        className="rounded-lg shadow-2xl shadow-black"
                    />
                </div>

                {/* Text Section */}
                <div className="mt-8 lg:mt-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        Hello, I&apos;m Joy Chandra Uday
                    </h1>
                    <p className="py-3 text-lg flex flex-wrap justify-center lg:justify-start items-center gap-2">
                        I am a passionate <Designation />
                    </p>
                    <p className="text-gray-500 text-lg italic">
                        &quot;Transforming your Ideas into Reality through Code&quot;
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-start">
                        <a
                            href="https://github.com/joychandrauday"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-lg" /> My Github
                                </div>
                            </ShinyButton>
                        </a>
                        <Link href="/projects">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaCopy className="text-lg" /> Projects
                                </div>
                            </ShinyButton>
                        </Link>
                        <Link
                            href="/joychandraudayRESUMEd.pdf"
                            target="_blank"
                        >
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <IoDocumentText className="text-lg" /> Resume
                                </div>
                            </ShinyButton>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="skill-section mt-12">
                <SkilledStack />
            </div>
            <div className="projectStack mt-12">
                <LatestProjects />
            </div>
        </div>
    );
}

export default BannerElements;
