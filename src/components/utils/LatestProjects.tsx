import Link from "next/link";
import { ProjectCard } from "@/components/utils/ProjectCard";
import { IProject } from "@/types";
import { ShinyButton } from "../magicui/shiny-button";

const LatestProjects = async () => {
    const res = await fetch("https://blog-chronicle-backend.vercel.app/api/projects", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch projects");
    }

    const projects = await res.json();

    return (
        <div className="my-10 w-[95%] mx-auto">
            <div className="flex justify-between items-center pb-5">
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                    Latest Projects
                </h2>
                <Link href="/projects">
                    <ShinyButton>
                        View All Projects →
                    </ShinyButton>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {projects.sort((a: { serial: string; }, b: { serial: string; }) => Number(a.serial) - Number(b.serial)).slice(0, 2).map((project: IProject) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default LatestProjects;
