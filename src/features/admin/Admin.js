import React from 'react';
import { useNavigate } from 'react-router-dom';

import axiosClient from '../../api/axios.client';

import Button from '../../components/Button';
import Input from '../../components/Input';

const Admin = () => {
  const [jobs, setJobs] = React.useState();
  const [edit, setEdit] = React.useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await axiosClient.get('/jobs');
    setJobs(data.data.metadata.jobs);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const data = axiosClient.delete(`/jobs/${_id}`);
      alert('Delete successful!');
      fetchData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='p-20'>
      <Button type='button' onClick={() => navigate('/jobs/create')}>
        Create new job
      </Button>

      <div className='overflow-x-auto mt-5'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Location</th>
              <th>Contract</th>
              <th>Position</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job, index) => (
                <tr key={job._id}>
                  <td>{index}</td>
                  {edit ? (
                    <>
                      <td>
                        <Input type='text' value={job.company} />
                      </td>
                      <td>
                        <Input type='text' value={job.location} />
                      </td>
                      <td>
                        <Input type='text' value={job.contract} />
                      </td>
                      <td>
                        <Input type='text' value={job.position} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{job.company}</td>
                      <td>{job.location}</td>
                      <td>{job.contract}</td>
                      <td>{job.position}</td>
                    </>
                  )}
                  <td>
                    <span onClick={() => setEdit(!edit)}>Edit</span>
                  </td>
                  <td>
                    <span
                      className='cursor-pointer'
                      onClick={() => {
                        handleDelete(job._id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
