
import { ProjectCard } from "@/components/utils/ProjectCard";
import { IProject } from "@/types";

const ProjectPage = async () => {
    const res = await fetch("https://blog-chronicle-backend.vercel.app/api/projects", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch projects");
    }

    const projects = await res.json();

    return (
        <>
            <div className="my-10 w-[95%] mx-auto">
                <div className="text-left">
                    <h1 className="text-3xl pl-5 font-bold tracking-tight text-gray-800 dark:text-gray-100">
                        Recent Projects
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4 ">
                    {projects
                        .sort((a: { serial: string; }, b: { serial: string; }) => Number(a.serial) - Number(b.serial))
                        .map((project: IProject) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default ProjectPage;
