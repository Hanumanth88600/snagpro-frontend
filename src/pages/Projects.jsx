import MainLayout from "../layouts/MainLayout";

import { useEffect, useState } from "react";

import {
    getProjects,
    createProject,
} from "../api/projectApi";

import AddProjectModal from "../components/AddProjectModal";
import {
    updateProject,
    deleteProject
}
    from "../api/projectApi";

import ViewProjectModal
    from "../components/ViewProjectModal";

import EditProjectModal
    from "../components/EditProjectModal";

import {
    getClients
}
    from "../api/clientApi";
export default function Projects() {

    const [projects, setProjects] =
        useState([]);

    const [clients, setClients] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [openModal, setOpenModal] =
        useState(false);

    const [viewModal, setViewModal] =
        useState(false);

    const [editModal, setEditModal] =
        useState(false);

    const [selectedProject,
        setSelectedProject] =
        useState(null);

    useEffect(() => {

        fetchProjects();

    }, []);

    const fetchProjects = async () => {

        try {

            const [
                projectData,
                clientData
            ] = await Promise.all([

                getProjects(),

                getClients()

            ]);

            setProjects(
                projectData
            );

            setClients(
                clientData
            );

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const handleCreateProject =
        async (formData) => {

            try {

                await createProject(
                    formData
                );

                await fetchProjects();

                setOpenModal(false);

                alert(
                    "Project Created Successfully"
                );

            } catch (err) {

                console.log(err);

                alert(
                    "Failed to Create Project"
                );

            }

        };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this project?"
            );

        if (!confirmDelete) return;

        try {

            await deleteProject(id);

            await fetchProjects();

            alert(
                "Project Deleted"
            );

        } catch (err) {

            console.log(err);

            alert(
                "Delete Failed"
            );

        }

    };

    const handleUpdate = async (
        formData
    ) => {

        try {

            await updateProject(
                selectedProject.id,
                formData
            );

            await fetchProjects();

            setEditModal(false);

            alert(
                "Project Updated"
            );

        } catch (err) {

            console.log(err);

            alert(
                "Update Failed"
            );

        }

    };
    return (

        <MainLayout showNavbar={false}>

            {/* Header */}

            <div
                className="
        flex
        justify-between
        items-center
        mb-8
        "
            >

                <div>

                    <h1
                        className="
            text-4xl
            font-bold
            "
                    >
                        Projects
                    </h1>

                    <p
                        className="
            text-white/60
            "
                    >
                        Manage Construction Projects
                    </p>

                </div>

                <button

                    onClick={() =>
                        setOpenModal(true)
                    }

                    className="
          bg-cyan-500
          hover:bg-cyan-400

          px-5
          py-3

          rounded-2xl

          font-semibold

          transition
          "
                >
                    + Add Project
                </button>

            </div>

            {/* Loading */}

            {loading ? (

                <div
                    className="
          text-center
          text-white/60
          "
                >
                    Loading Projects...
                </div>

            ) : (

                <div
                    className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
                >

                    {projects.map(
                        (project) => (

                            <ProjectCard
                                key={project.id}
                                project={project}

                                onView={() => {

                                    setSelectedProject(
                                        project
                                    );

                                    setViewModal(true);

                                }}

                                onEdit={() => {

                                    setSelectedProject(
                                        project
                                    );

                                    setEditModal(true);

                                }}

                                onDelete={() =>
                                    handleDelete(
                                        project.id
                                    )
                                }
                            />

                        )
                    )}

                </div>

            )}

            {/* Add Modal */}

            <AddProjectModal

                open={openModal}

                onClose={() =>
                    setOpenModal(false)
                }

                onSubmit={
                    handleCreateProject
                }

                clients={
                    clients
                }

            />
            <ViewProjectModal

                open={viewModal}

                project={selectedProject}

                onClose={() =>
                    setViewModal(false)
                }

            />

            <EditProjectModal

                open={editModal}

                project={selectedProject}

                onClose={() =>
                    setEditModal(false)
                }

                onSave={
                    handleUpdate
                }

            />

        </MainLayout>

    );

}


const handleUpdate = async (
    formData
) => {

    try {

        await updateProject(
            selectedProject.id,
            formData
        );

        await fetchProjects();

        setEditModal(false);

        alert(
            "Project Updated"
        );

    } catch (err) {

        console.log(err);

        alert(
            "Update Failed"
        );

    }

};

function ProjectCard({

    project,

    onView,

    onEdit,

    onDelete,

}) {

    return (

        <div
            className="
      bg-white/10

      backdrop-blur-xl

      border
      border-white/10

      rounded-3xl

      p-6

      hover:scale-[1.02]

      transition
      "
        >

            <div
                className="
        flex
        justify-between
        items-start
        "
            >

                <div>

                    <h2
                        className="
            text-2xl
            font-bold
            "
                    >
                        🏗 {project.project_name}
                    </h2>

                    <p
                        className="
            text-white/60
            mt-2
            "
                    >
                        📍 {project.location}
                    </p>

                </div>

                <span
                    className="
          px-3
          py-1

          rounded-full

          bg-green-500/20

          text-green-300

          text-sm
          "
                >
                    {project.status}
                </span>

            </div>

            <div
                className="
        mt-5
        space-y-2
        "
            >

                <p>
                    📅 Start :
                    {" "}
                    {project.start_date}
                </p>

                <p>
                    🏷 Code :
                    {" "}
                    {project.project_code}
                </p>
                <p>
                    👤 Client :
                    {" "}
                    {
                        project.client_name
                        ||
                        "Not Assigned"
                    }
                </p>

                <p>
                    📝 Description :
                    {" "}
                    {project.description}
                </p>

            </div>

            <div
                className="
        flex
        gap-3

        mt-6
        "
            >

                <button

                    onClick={onView}

                    className="
  flex-1
  py-2
  rounded-xl
  bg-cyan-500/20
  text-cyan-300
  "
                >
                    View
                </button>

                <button

                    onClick={onEdit}

                    className="
  flex-1
  py-2
  rounded-xl
  bg-yellow-500/20
  text-yellow-300
  "
                >
                    Edit
                </button>

                <button

                    onClick={onDelete}

                    className="
  flex-1
  py-2
  rounded-xl
  bg-red-500/20
  text-red-300
  "
                >
                    Delete
                </button>

            </div>

        </div>

    );

}