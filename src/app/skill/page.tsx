"use client";
import React from "react";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { RippleButton } from "@/components/magicui/ripple-button";

type Skill = {
    name: string;
    stack: string;
    logo: string;
    details: string;
};

const SkilledStack: React.FC = () => {
    const skills: Skill[] = [
        {
            name: "JavaScript",
            stack: "Others",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
            details: "JavaScript brings web pages to life by allowing interactivity and dynamic elements.",
        },
        {
            name: "TypeScript",
            stack: "Others",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
            details: "TypeScript is a superset of JavaScript that adds static typing for better code quality.",
        },
        {
            name: "React",
            stack: "Frontend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
            details: "React allows you to build modular and reusable components for user interfaces.",
        },
        {
            name: "Next.js",
            stack: "Frontend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
            details: "Next.js is a React framework for building optimized and SEO-friendly web applications.",
        },
        {
            name: "Redux",
            stack: "Frontend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
            details: "Redux is a state management tool that helps manage application state efficiently.",
        },
        {
            name: "Node.js",
            stack: "Backend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
            details: "Node.js lets you run JavaScript outside the browser, powering backend development.",
        },
        {
            name: "Express",
            stack: "Backend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
            details: "Express is a minimal framework that makes building web servers with Node.js easier.",
        },
        {
            name: "MongoDB",
            stack: "Backend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongoose.svg",
            details: "A NoSQL database that stores data in JSON-like documents, perfect for modern apps.",
        },
        {
            name: "Mongoose",
            stack: "Backend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
            details: "Mongoose is an ODM for MongoDB that simplifies schema and data validation in Node.js apps.",
        },
        {
            name: "HTML",
            stack: "Frontend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
            details: "HTML provides the structure for web pages, defining content and elements.",
        },
        {
            name: "CSS",
            stack: "Frontend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
            details: "CSS styles your web pages, controlling layout, colors, and animations.",
        },
        {
            name: "Git",
            stack: "Others",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
            details: "Git tracks changes in code, making collaboration and version control easy.",
        },
        {
            name: "Tailwind CSS",
            stack: "Frontend",
            logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
            details: "A utility-first CSS framework that makes styling web pages fast and flexible.",
        },
    ];



    return (
        <section className="py-20 min-h-[90vh] w-[95%] mx-auto flex flex-col items-start justify-center gap-8 relative overflow-hidden">
            <div className="text-left">
                <h1 className="text-3xl pl-5 font-bold tracking-tight text-gray-800 dark:text-gray-100">
                    Skilled Stack
                </h1>
            </div>
            <div className="relative">
                <div className="h-full overflow-hidden">
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                        <Marquee pauseOnHover speed={50} className="flex space-x-8">
                            {skills.map((skill) => (
                                <TooltipProvider key={skill.name}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="p-3 rounded-xl text-center min-w-[10rem] border border-transparent shadow-md transition-transform transform hover:scale-105 bg-gradient-to-b from-gray-50 dark:from-gray-800 to-transparent">
                                                <div className="w-16 h-16 mx-auto">
                                                    <Image
                                                        unoptimized
                                                        width={64}
                                                        height={64}
                                                        className="mx-auto"
                                                        src={skill.logo}
                                                        alt={`${skill.name} logo`}
                                                    />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-xs bg-gray-800 text-white shadow-lg p-4 rounded-lg">
                                            <h2 className="text-lg font-semibold">{skill.name}</h2>
                                            <p className="text-sm">{skill.details}</p>
                                            <RippleButton>{skill.stack}</RippleButton>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Left & Right Gradient Overlays */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white dark:from-[#0A0A0A] z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-white dark:from-[#0A0A0A] z-10"></div>
            </div>
        </section>
    );
};

export default SkilledStack;
