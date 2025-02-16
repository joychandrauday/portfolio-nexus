import { ShinyButton } from "@/components/magicui/shiny-button";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const skills = [
    {
        name: "JavaScript",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png",
    },
    {
        name: "React",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/react/react.png",
    },
    {
        name: "Node.js",
        category: "Backend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png",
    },
    {
        name: "Express",
        category: "Backend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/express/express.png",
    },
    {
        name: "MongoDB",
        category: "Backend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/mongodb/mongodb.png",
    },
    {
        name: "HTML",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/html/html.png",
    },
    {
        name: "CSS",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/css/css.png",
    },
    {
        name: "Git",
        category: "Others",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/git/git.png",
    },
    {
        name: "Tailwind CSS",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png",
    },
    {
        name: "TypeScript",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png",
    },
    {
        name: "Next.js",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png",
    },
    {
        name: "Mongoose",
        category: "Backend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/mongoose/mongoose.png",
    },
    {
        name: "Redux",
        category: "Frontend",
        logo: "https://raw.githubusercontent.com/github/explore/main/topics/redux/redux.png",
    },
];

const educationData = [
    {
        degree: "Bachelor of Arts in English Literature",
        institution: "National University Bangladesh",
        year: "2019 - present",
        description: "A detailed study in English and European literature.",
    },
    {
        degree: "Higher Secondary Certificate",
        institution: "Govt. Janata College",
        year: "2018 - 2020",
        description: "Focused on science subjects with a specialization in mathematics and physics.",
    },
    {
        degree: "Secondary School Certificate",
        institution: "Lebukhali Habibullah Secondary School",
        year: "2012 - 2017",
        description: "Completed secondary education with a focus on general science.",
    },
];

const experienceData = [
    {
        role: "Wordpress Developer",
        company: "Fiverr",
        year: "2021 - Present",
        description: "Developing and maintaining web applications using Wordpress CMS.",
    },
];

const Resume = () => {
    return (
        <section className="pt-16 lg:pt-24 w-[95%] mx-auto" >
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-12">
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Joy Chandra Uday</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 w-2/3">
                            Passionate MERN Stack Developer specializing in building dynamic and responsive web applications.
                        </p>
                    </div>
                    <div className="lg:ml-8 flex justify-center">
                        <a href="/joychandraudayRESUMEd.pdf" download target="_blank" rel="noreferrer">
                            <ShinyButton>Download Resume</ShinyButton>
                        </a>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Education</h2>
                    <div className="space-y-6">
                        {educationData.map((education, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{education.year}</p>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{education.degree}</h3>
                                <p className="text-base text-gray-600 dark:text-gray-400">{education.institution}</p>
                                <p className="text-base text-gray-500 dark:text-gray-400">{education.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Skills</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <div key={index} className="group flex flex-col items-center justify-center text-center relative">
                                <div className="w-16 h-16 mb-4 relative group-hover:scale-110 transition-transform duration-200">
                                    <Image src={skill.logo} alt={skill.name} width={64} height={64} />
                                </div>

                                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
                                <div className="absolute top-0 right-4 hidden group-hover:block text-sm bg-gray-800 text-white p-2">
                                    {skill.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Experience</h2>
                    <div className="space-y-6">
                        {experienceData.map((experience, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{experience.year}</p>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{experience.role}</h3>
                                <p className="text-base text-gray-600 dark:text-gray-400">{experience.company}</p>
                                <p className="text-base text-gray-500 dark:text-gray-400">{experience.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Contact</h2>
                    <div className="flex flex-wrap gap-4 items-center py-6 justify-center lg:justify-start">
                        <a
                            href="https://github.com/joychandrauday"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-lg" /> Github
                                </div>
                            </ShinyButton>
                        </a>
                        <a
                            href="https://linkedin.com/in/joychandrauday"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaLinkedin className="text-lg" /> Linkedin
                                </div>
                            </ShinyButton>
                        </a>
                        <a
                            href="https://facebook.com/joychandraudayy"
                            target="_blank">
                            <ShinyButton>
                                <div className="flex items-center gap-2">
                                    <FaFacebook className="text-lg" /> Facebook
                                </div>
                            </ShinyButton>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
