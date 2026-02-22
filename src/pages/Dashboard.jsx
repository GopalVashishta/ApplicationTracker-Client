import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

const stageDisplayMap = {
  application: 'Applied',
  OA: 'Online Assessment',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};

const getLatestStage = (processAt) => {
  if (!processAt || processAt.length === 0) return 'application';
  return processAt[processAt.length - 1].name;
};

const getLatestStageDate = (processAt) => {
  if (!processAt || processAt.length === 0) return '';
  return processAt[processAt.length - 1].date || '';
};

const toInputDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 16);
};

const JobTrackerHome = () => {
  const [applications, setApplications] = useState([]);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    title: '',
    description: '',
    status: 'active',
    projectId: '',
    stageName: 'application',
    stageDate: '',
    stageDescription: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchApplications = async () => {
    try {
      const config = { withCredentials: true };
      const res = await axios.get(`${serverEndpoint}/appProject/getApplications`, config);
      setApplications(res.data);
    } catch (error) {
      console.log("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const resetForm = () => {
    setNewApplication({
      title: '',
      description: '',
      status: 'active',
      projectId: '',
      stageName: 'application',
      stageDate: '',
      stageDescription: ''
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!newApplication.title.trim()) return;
    try {
      const stage = [{
        name: newApplication.stageName,
        date: newApplication.stageDate ? new Date(newApplication.stageDate) : new Date(),
        description: newApplication.stageDescription
      }];

      const body = {
        title: newApplication.title,
        description: newApplication.description,
        status: newApplication.status,
        projectId: newApplication.projectId || undefined,
        processAt: stage
      };
      const config = { withCredentials: true };
      if (editingId) {
        const res = await axios.put(`${serverEndpoint}/appProject/updateApplication`, { id: editingId, ...body }, config);
        setApplications((prev) => prev.map((app) => (app._id === editingId ? res.data : app)));
        setMessage('Application updated successfully!');
      } else {
        const res = await axios.post(`${serverEndpoint}/appProject/createApplication`, body, config);
        setApplications((prev) => [...prev, res.data]);
        setMessage('Application added successfully!');
      }
      resetForm();
      setEditingId(null);
      setShowForm(false);
      setErrors(null);
    } catch (error) {
      console.log("Error creating application:", error);
      setErrors({ message: 'Failed to add application. Please try again.' });
    }
  };

  const handleNewApplication = () => {
    setShowForm((prev) => !prev);
    setEditingId(null);
    resetForm();
    setErrors(null);
    setMessage('');
  };

  const handleChange = (e) => {
    setNewApplication({ ...newApplication, [e.target.name]: e.target.value });
  };

  const handleEditApplication = (app) => {
    setShowForm(true);
    setEditingId(app._id);
    const latestStage = getLatestStage(app.processAt);
    const latestStageDate = getLatestStageDate(app.processAt);
    setNewApplication({
      title: app.title || '',
      description: app.description || '',
      status: app.status || 'active',
      projectId: app.projectId || '',
      stageName: latestStage || 'application',
      stageDate: toInputDate(latestStageDate),
      stageDescription: ''
    });
    setErrors(null);
    setMessage('');
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
          <div>
            <h1 className="display-5 fw-bold text-dark mb-1">Dashboard</h1>
            <p className="text-secondary mb-0">
              Welcome back! Track your applications below.
            </p>
          </div>

          {errors && <div className="alert alert-danger mb-0">{errors.message}</div>}
          {message && <div className="alert alert-success mb-0">{message}</div>}

          <div className="d-flex gap-2">
            <button className="btn btn-warning fw-bold" onClick={handleNewApplication}>+ New Application</button>
          </div>
        </div>

        {showForm && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h5 fw-bold text-dark mb-3">{editingId ? 'Update Application' : 'Add New Application'}</h2>
              <form onSubmit={handleSubmitApplication}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold small">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="e.g. Software Engineer Role"
                    value={newApplication.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold small">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Brief description of the application..."
                    value={newApplication.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label fw-bold small">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={newApplication.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="projectId" className="form-label fw-bold small">Project Id (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectId"
                    name="projectId"
                    placeholder="Project ObjectId"
                    value={newApplication.projectId}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stageName" className="form-label fw-bold small">Stage</label>
                  <select
                    className="form-select"
                    id="stageName"
                    name="stageName"
                    value={newApplication.stageName}
                    onChange={handleChange}
                  >
                    <option value="application">Applied</option>
                    <option value="OA">Online Assessment</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="stageDate" className="form-label fw-bold small">Stage Date (optional)</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="stageDate"
                    name="stageDate"
                    value={newApplication.stageDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stageDescription" className="form-label fw-bold small">Stage Description (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="stageDescription"
                    name="stageDescription"
                    placeholder="Short note about the stage"
                    value={newApplication.stageDescription}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-warning fw-bold w-100">
                  {editingId ? 'Update Application' : '+ Add Application'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="row g-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold text-dark mb-0">Applications</h2>
                </div>

                <div className="list-group list-group-flush">
                  {applications.length === 0 ? (
                    <p className="text-center text-secondary py-4 mb-0">No applications yet.</p>
                  ) : (
                    applications.map((app) => {
                      const stage = getLatestStage(app.processAt);
                      return (
                        <JobListItem
                          key={app._id}
                          title={app.title}
                          description={app.description}
                          stage={stageDisplayMap[stage] || 'Applied'}
                          date={new Date(app.createdAt).toLocaleDateString()}
                          isDimmed={app.status === 'rejected'}
                          onEdit={() => handleEditApplication(app)}
                        />
                      );
                    })
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListItem = ({ title, description, stage, date, isDimmed, onEdit }) => (
  <div className={`list-group-item d-flex justify-content-between align-items-center py-3 ${isDimmed ? 'opacity-50' : ''}`}>
    <div className="d-flex align-items-center gap-3">
      <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center fw-bold text-secondary" style={{ width: '48px', height: '48px' }}>
        {title.charAt(0)}
      </div>
      <div>
        <div className="fw-bold text-dark">{title}</div>
        <div className="text-secondary small">{description ? `${description} • ` : ''}{date}</div>
      </div>
    </div>
    <div className="d-flex align-items-center gap-2">
      <span className={`badge ${stage === 'Interview' ? 'bg-warning text-dark' : stage === 'Offer' ? 'bg-success text-white' : 'bg-light text-secondary'}`}>
        {stage}
      </span>
      <button className="btn btn-sm btn-outline-dark" type="button" onClick={onEdit}>
        Edit
      </button>
    </div>
  </div>
);

export default JobTrackerHome;