/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { useFieldArray, useForm } from 'react-hook-form';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ShinyButton } from '@/components/magicui/shiny-button';
import LoadingPage from '@/components/utils/Loading';

import Swal from "sweetalert2";
import { useDeleteProjectMutation } from '@/Redux/features/projects/projectApi';

interface Project {
    _id: string;
    title: string;
    coverImage: string;
    description: string;
    liveLink: string;
    clientCodeLink: string;
    serverCodeLink: string;
    serial: string;
    projectType: string;
    underDevelopment: boolean;
    features: { id: string; value: string }[];
    usedTechnologies: { id: string; value: string }[] // Used Technologies as an array of strings
}

const ProjectManagePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Loader state
    const [projects, setProjects] = useState<Project[]>([]);
    const [open, setOpen] = useState(false);
    const [deleteProject] = useDeleteProjectMutation()
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { register, handleSubmit, reset, control } = useForm<Project>({
        defaultValues: selectedProject || {
            title: '',
            coverImage: '',
            description: '',
            serial: '',
            liveLink: '',
            clientCodeLink: '',
            serverCodeLink: '',
            projectType: '',
            underDevelopment: false,
            features: [],
            usedTechnologies: [],
        },
    });

    // Properly typed field arrays for features and technologies
    const { fields: featureFields, append: appendFeature } = useFieldArray({
        control,
        name: "features",
    });


    const { fields: techFields, append: appendTechnology } = useFieldArray({
        control,
        name: "usedTechnologies",
    });


    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://blog-chronicle-backend.vercel.app/api/projects`, { cache: 'no-store' });
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                toast.error('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Delete Project
    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);
            await deleteProject(id);
            toast.success("Project deleted successfully!");
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            toast.error("Error deleting project!");
        } finally {
            setLoading(false);
        }
    };

    // Add or Update Project
    const onSubmit = async (data: Project) => {
        try {
            setLoading(true);
            const filteredData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => {
                    if (Array.isArray(value)) return value.length > 0;
                    return value !== "" && value !== null && value !== undefined;
                })
            );

            if (selectedProject) {
                // Update existing project
                await fetch(`https://blog-chronicle-backend.vercel.app/api/projects/${selectedProject._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filteredData),
                });
                toast.success('Project updated successfully!');
            } else {
                // Add new project
                await fetch(`https://blog-chronicle-backend.vercel.app/api/projects`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                toast.success('Project added successfully!');
            }

            setOpen(false);
            reset();
            router.refresh();
        } catch (error) {
            toast.error('Error saving project!');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-8">
            {loading && <LoadingPage />}
            <h1 className="text-2xl font-bold mb-4">Project Management</h1>
            <ShinyButton onClick={() => setOpen(true)} className="mb-4">Add New Project</ShinyButton>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                    .sort((a, b) => Number(a.serial) - Number(b.serial))
                    .map((project) => (
                        <div key={project._id} className="p-4 border rounded-lg shadow-lg relative">
                            <Image src={project.coverImage} alt={project.title} width={300} height={200} className="rounded-md w-full h-40 object-cover mb-4" />
                            <h2 className="text-xl font-bold">{project.title}</h2>
                            <p className="text-gray-600">{project.description.slice(0, 120)}...</p>
                            <div className="mt-4 flex justify-between">
                                <Button onClick={() => { setSelectedProject(project); setOpen(true); }}>
                                    <FaEdit /> Edit
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(project._id)}>
                                    <FaTrash /> Delete
                                </Button>
                            </div>
                            <ShinyButton className="absolute capitalize px-2  top-2 right-2">
                                {project.projectType}
                            </ShinyButton>
                        </div>
                    ))}
            </div>

            {/* Project Form Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                {...register("title")}
                                placeholder="Project Title"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                {...register("coverImage")}
                                placeholder="Cover Image URL"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                {...register("description")}
                                placeholder="Project Description"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                {...register("liveLink")}
                                placeholder="Live Link"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                {...register("clientCodeLink")}
                                placeholder="Client Code Link"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                {...register("serverCodeLink")}
                                placeholder="Server Code Link"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                {...register("serial")}
                                type='number'
                                placeholder="serial number"
                                className="w-full p-2 border rounded"
                            />
                            <select
                                {...register("projectType")}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Project Type</option>
                                <option value="full-stack">Full Stack</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                            </select>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" {...register("underDevelopment")} />
                                <span>Under Development</span>
                            </label>
                        </div>

                        {/* Features Array */}
                        <div className="flex gap-2">
                            <div>
                                <label className="font-semibold">Features:</label>
                                {featureFields.map((item, index) => (
                                    <div key={item.id} className="space-y-2 grid grid-cols-3 gap-4">
                                        <input
                                            {...register(`features.${index}`)}
                                            placeholder={`Feature ${index + 1}`}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => appendFeature({ id: uuidv4(), value: "" })}
                                    className='backdrop-blur-md border px-2 rounded-md bg-opacity-60'
                                >
                                    Add Feature
                                </button>

                            </div >

                            {/* Used Technologies Array */}
                            < div >
                                <label className="font-semibold">Used Technologies:</label>
                                {
                                    techFields.map((item, index) => (
                                        <div key={item.id} className="space-y-2 grid grid-cols-3 gap-4">
                                            <input
                                                {...register(`usedTechnologies.${index}`)}
                                                placeholder={`Technology ${index + 1}`}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    ))
                                }
                                <button
                                    type="button"
                                    onClick={() => appendTechnology({ id: uuidv4(), value: "" })}
                                    className='backdrop-blur-md border px-2 rounded-md bg-opacity-60'
                                >
                                    Add Technology
                                </button>
                            </div >
                            {loading && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                <LoadingPage />
                            </div>}
                        </div >

                        <Button className='' type="submit">{selectedProject ? "Update Project" : "Add Project"}</Button>
                    </form >
                </DialogContent >
            </Dialog >

        </div >
    );
};

export default ProjectManagePage;
