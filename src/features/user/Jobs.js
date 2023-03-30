import React from 'react';

import axiosClient from '../../api/axios.client';
import JobCard from './JobCard';
import Input from '../../components/Input';

const Jobs = () => {
  const [jobs, setJobs] = React.useState();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axiosClient.get('/jobs');
      setJobs(data.data.metadata.jobs);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axiosClient.get('/jobs', {
      params: {
        position: search,
      },
    });
    setJobs(data.data.metadata.jobs);
  };

  return (
    <div className="px-48">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Search"
          placeholder="Search by position"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="grid grid-cols-3 gap-x-10 gap-y-16 mt-16">
        {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  );
};

export default Jobs;
