import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ name: '', githubLink: '', createdAt: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const pageSizeOptions = [5, 10, 20, 50, 100];
    const [sortBy, setSortBy] = useState('newest');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchProjects = async (page = 1) => {
        try {
            const config = { withCredentials: true };
            const res = await axios.get(`${serverEndpoint}/appProject/getProjects?page=${page}&limit=${limit}&sortBy=${sortBy}`, config);
            setProjects(res.data.projects);
            setTotalPages(res.data.pagination?.totalPages || 1);
            setCurrentPage(res.data.pagination?.currentPage || 1);
            setErrors(null);
        } catch (error) {
            console.log("Error fetching projects:", error);
            setErrors({ message: 'Failed to fetch projects. Please try again.' });
        }
    };

    const handlePageSizeChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.githubLink.trim()) return;

        try {
            const body = {
                name: formData.name,
                githubLink: formData.githubLink,
                createdAt: formData.createdAt ? new Date(formData.createdAt) : undefined
            };
            const config = { withCredentials: true };
            await axios.post(`${serverEndpoint}/appProject/createProject`, body, config);
            fetchProjects(1);
            setFormData({ name: '', githubLink: '', createdAt: '' });
            setMessage('Project added successfully!');
            setErrors(null);
        } catch (error) {
            console.log("Error creating project:", error);
            setErrors({ message: 'Failed to add project. Please try again.' });
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            const config = { withCredentials: true, data: { id } };
            await axios.delete(`${serverEndpoint}/appProject/deleteProject`, config);
            fetchProjects(1);
            setMessage('Project deleted successfully!');
            setErrors(null);
        } catch (error) {
            console.log("Error deleting project:", error);
            setErrors({ message: 'Failed to delete project. Please try again.' });
        }
    };

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage, limit, sortBy]);

    return (
        <div className="min-vh-100 bg-light py-4">
            <div className="container">
                <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
                    <div>
                        <h1 className="display-6 fw-bold text-dark mb-1">Projects</h1>
                        <p className="text-secondary mb-0">Manage your projects and track your portfolio.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label>Sort:</label>
                        <select
                            className="form-select form-select-sm rounded-pill"
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
                {errors && <div className="alert alert-danger">{errors.message}</div>}
                {message && <div className="alert alert-success">{message}</div>}

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
                                    <div className="mb-3">
                                        <label htmlFor="createdAt" className="form-label fw-bold small">Date Created</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="createdAt"
                                            name="createdAt"
                                            value={formData.createdAt}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-warning fw-bold w-100">
                                         Add Project
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
                                                        <td className="fw-bold text-secondary">{(currentPage - 1) * limit + index + 1}</td>
                                                        <td className="fw-bold">{project.name}</td>
                                                        <td>
                                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-warning fw-bold">
                                                                View Repo
                                                            </a>
                                                        </td>
                                                        <td className="text-secondary small">{new Date(project.createdAt).toLocaleDateString()}</td>
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

                                {totalPages >= 1 && (
                                    <nav className="mt-4 d-flex justify-content-center align-items-center flex-wrap gap-3">
                                        <ul className="pagination shadow-sm mb-0">
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                                    &laquo;
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li key={index} className={`page-item ${currentPage === (index + 1) ? "active" : ""}`}>
                                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                    &raquo;
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="d-flex align-items-center gap-2">
                                            <label className="text-muted mb-0 small">Records per page:</label>
                                            <select
                                                className="form-select form-select-sm"
                                                style={{ width: 'auto' }}
                                                value={limit}
                                                onChange={handlePageSizeChange}
                                            >
                                                {pageSizeOptions.map((size) => (
                                                    <option key={size} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </nav>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
