import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobTrackerHome = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('recent');

  const jobs = [
    {
      id: 1,
      company: 'OpenAI',
      role: 'Frontend Engineer',
      status: 'Interview',
      date: '2026-02-24',
      priority: 1,
    },
    {
      id: 2,
      company: 'Stripe',
      role: 'Fullstack Developer',
      status: 'Applied',
      date: '2026-02-21',
      priority: 3,
    },
    {
      id: 3,
      company: 'Vercel',
      role: 'React Specialist',
      status: 'Technical Task',
      date: '2026-02-19',
      priority: 2,
    },
    {
      id: 4,
      company: 'Discord',
      role: 'Senior UI Dev',
      status: 'Rejected',
      date: '2026-02-15',
      priority: 4,
    },
  ];

  const stats = useMemo(() => {
    const total = jobs.length;
    const interviews = jobs.filter((job) => job.status === 'Interview').length;
    const pending = jobs.filter((job) => job.status === 'Applied').length;
    const offers = jobs.filter((job) => job.status === 'Offer').length;
    return { total, interviews, pending, offers };
  }, [jobs]);

  const sortedJobs = useMemo(() => {
    const items = [...jobs];
    if (sortBy === 'priority') {
      return items.sort((a, b) => a.priority - b.priority);
    }
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [jobs, sortBy]);

  const handleExportData = () => {
    const header = ['Company', 'Role', 'Status', 'Date', 'Priority'];
    const rows = jobs.map((job) => [job.company, job.role, job.status, job.date, job.priority]);
    const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNewApplication = () => {
    navigate('/applications/new');
  };

  const handleViewArchive = () => {
    navigate('/applications/archive');
  };

  const handlePrepareNow = () => {
    navigate('/prepare');
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
          <div>
            <h1 className="display-5 fw-bold text-dark mb-1">Dashboard</h1>
            <p className="text-secondary mb-0">
              Welcome back! You have <span className="text-warning fw-bold text-decoration-underline">3 interviews</span> this week.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-dark fw-bold" onClick={handleExportData}>Export Data</button>
            <button className="btn btn-warning fw-bold" onClick={handleNewApplication}>+ New Application</button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <StatCard label="Total Sent" value={stats.total} icon="📨" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard label="Interviews" value={stats.interviews} icon="🎯" trend="+2 this week" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard label="Pending" value={stats.pending} icon="⏳" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard label="Offers" value={stats.offers} icon="🎉" />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold text-dark mb-0">Active Applications</h2>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="recent">Recent First</option>
                    <option value="priority">By Priority</option>
                  </select>
                </div>

                <div className="list-group list-group-flush">
                  {sortedJobs.map((job) => (
                    <JobListItem
                      key={job.id}
                      company={job.company}
                      role={job.role}
                      status={job.status}
                      date={job.date}
                      isDimmed={job.status === 'Rejected'}
                    />
                  ))}
                </div>

                <button className="btn btn-link w-100 mt-3 text-secondary text-uppercase fw-bold" onClick={handleViewArchive}>
                  View Archive
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm bg-warning text-dark mb-4">
              <div className="card-body">
                <h3 className="h6 fw-bold mb-3">Upcoming Round</h3>
                <div className="bg-white bg-opacity-50 border border-white rounded-3 p-3 mb-3">
                  <div className="text-uppercase fw-bold small text-dark opacity-75">Tomorrow @ 10:00 AM</div>
                  <div className="fw-bold">Google • System Design</div>
                </div>
                <button className="btn btn-dark w-100 fw-bold" onClick={handlePrepareNow}>Prepare Now</button>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h6 fw-bold text-dark mb-2">Search Insight</h3>
                <p className="text-secondary mb-0">
                  Your response rate is <span className="text-success fw-bold">24% higher</span> when applying within the first 48 hours of a posting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Refined UI Components ---

const StatCard = ({ label, value, icon, trend }) => (
  <div className="card border-0 shadow-sm h-100">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span className="fs-4">{icon}</span>
        {trend && <span className="badge bg-success bg-opacity-10 text-success">{trend}</span>}
      </div>
      <div className="display-6 fw-bold text-dark">{value}</div>
      <div className="text-uppercase fw-bold small text-secondary">{label}</div>
    </div>
  </div>
);

const JobListItem = ({ company, role, status, date, isDimmed }) => (
  <div className={`list-group-item d-flex justify-content-between align-items-center py-3 ${isDimmed ? 'opacity-50' : ''}`}>
    <div className="d-flex align-items-center gap-3">
      <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center fw-bold text-secondary" style={{ width: '48px', height: '48px' }}>
        {company.charAt(0)}
      </div>
      <div>
        <div className="fw-bold text-dark">{role}</div>
        <div className="text-secondary small">{company} • {date}</div>
      </div>
    </div>
    <span className={`badge ${status === 'Interview' ? 'bg-warning text-dark' : 'bg-light text-secondary'}`}>
      {status}
    </span>
  </div>
);

export default JobTrackerHome;