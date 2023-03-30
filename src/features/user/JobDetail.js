import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

import axiosClient from '../../api/axios.client';

import Button from '../../components/Button';

const JobDetail = () => {
  const { _id } = useParams();
  const [job, setJob] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axiosClient.get(`/jobs/${_id}`);
      setJob(data.data.metadata.job);
    };
    fetchData();
  }, [_id]);

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center mb-8'>
        {job && (
          <div className='flex justify-between items-center gap-96 bg-white rounded-lg pr-8'>
            <div className='flex items-center gap-10'>
              <div
                className='w-36 h-36 flex justify-center items-center'
                style={{ backgroundColor: `${job.logoBackground}` }}
              >
                <img src={job.logo} alt='logo' width={80} height={80} />
              </div>
              <div>
                <h3 className='text-2xl font-bold'>{job.company}</h3>
                <p>{job.website}</p>
              </div>
            </div>
            <Button type='button'>Company Site</Button>
          </div>
        )}
      </div>

      <div className='bg-white w-[1000px] mx-auto p-12'>
        {job && (
          <div>
            <div className='flex justify-between items-center'>
              <div>
                <span className='text-xl text-slate-400'>
                  {moment(new Date(job.createdAt)).fromNow()} - {job.contract}
                </span>
                <h1 className='text-3xl font-bold my-3'>{job.position}</h1>
                <p className='text-indigo-500 font-bold'>{job.location}</p>
              </div>
              <Button type='button'>Apply Now</Button>
            </div>

            <p className='my-8 text-slate-400'>{job.description}</p>

            <div>
              <h2 className='text-2xl font-bold'>Requirements</h2>
              <p className='my-6'>{job.requirements.content}</p>
              <ul className='list-disc'>
                {job.requirements.items.map((item, index) => (
                  <li className='text-slate-500 my-3' key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className='text-2xl font-bold mt-8'>What will you do</h2>
              <p className='my-6'>{job.role.content}</p>
              <ol className='list-decimal'>
                {job.role.items.map((item, index) => (
                  <li className='text-slate-500 my-3' key={index}>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
