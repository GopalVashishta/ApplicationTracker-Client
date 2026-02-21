import React, { useState, useEffect } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([
        { _id: '1', name: 'JobAppTkr', githubLink: 'https://github.com/user/jobapptkr', createdAt: '2026-01-10' },
        { _id: '2', name: 'Portfolio Site', githubLink: 'https://github.com/user/portfolio', createdAt: '2026-02-05' },
        { _id: '3', name: 'Chat App', githubLink: 'https://github.com/user/chat-app', createdAt: '2026-02-18' },
    ]);

    const [formData, setFormData] = useState({ name: '', githubLink: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchProjects = async () => {
        // TODO: call GET /api/projects and setProjects(response.data)
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.githubLink.trim()) return;

        // TODO: call POST /api/projects with formData
        // On success, append the new project to state:
        const newProject = {
            _id: Date.now().toString(),
            name: formData.name,
            githubLink: formData.githubLink,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setProjects((prev) => [...prev, newProject]);
        setFormData({ name: '', githubLink: '' });
    };

    const handleDeleteProject = async (id) => {
        // TODO: call DELETE /api/projects/:id
        setProjects((prev) => prev.filter((p) => p._id !== id));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-vh-100 bg-light py-4">
            <div className="container">
                <h1 className="display-6 fw-bold text-dark mb-4">Projects</h1>

                <div className="row g-4">
                    {/* Add Project Form */}
                    <div className="col-12 col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Add New Project</h5>
                                <form onSubmit={handleAddProject}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-bold small">Project Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="e.g. My Awesome App"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="githubLink" className="form-label fw-bold small">GitHub Link</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="githubLink"
                                            name="githubLink"
                                            placeholder="https://github.com/..."
                                            value={formData.githubLink}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-warning fw-bold w-100">
                                        + Add Project
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Projects Table */}
                    <div className="col-12 col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">All Projects</h5>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>GitHub</th>
                                                <th>Date Created</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projects.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center text-secondary py-4">No projects yet.</td>
                                                </tr>
                                            ) : (
                                                projects.map((project, index) => (
                                                    <tr key={project._id}>
                                                        <td className="fw-bold text-secondary">{index + 1}</td>
                                                        <td className="fw-bold">{project.name}</td>
                                                        <td>
                                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-warning fw-bold">
                                                                View Repo
                                                            </a>
                                                        </td>
                                                        <td className="text-secondary small">{project.createdAt}</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProject(project._id)}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
