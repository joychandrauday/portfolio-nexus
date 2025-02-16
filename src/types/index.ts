export interface IBlog {
    _id: string;
    title: string;
    brief: string;
    cover: string;
    slug: string;
    content: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    featuredImage: string;
    isPublished: boolean;
    author: string;
}

export interface IProject {
    coverImage: string;
    liveLink: string;
    _id: string;
    title: string;
    slug: string;
    brief: string;
    cover: string;
    type: string;
    frontend: {
        technologies: string[];
        deploymentLink: string;
        github: string;
    };
    backend: {
        technologies: string[];
        deploymentLink: string;
        github: string;
    };
}
// types.d.ts

export type Session = {
    user?: {
        name: string;
        email: string;
        image?: string;
    };
};

export type Blog = {
    _id: string;
    title: string;
    content: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    featuredImage: string;
    isPublished: boolean;
};
