import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white relative p-8">
      <div
        className="absolute -top-6 w-16 h-16 flex justify-center items-center rounded-xl"
        style={{ backgroundColor: `${job.logoBackground}` }}
      >
        <img src={job.logo} alt="logo" />
      </div>
      <div className="flex justify-between mt-10">
        <p>{moment(new Date(job.createdAt)).fromNow()}</p>
        <span> . </span>
        <p>{job.contract}</p>
      </div>
      <Link to={`/${job._id}`} className="text-2xl font-bold ">
        <h3 className="my-7">{job.position}</h3>
      </Link>
      <p className="text-slate-500 text-lg ">{job.company}</p>
      <h4 className="text-indigo-500 font-bold pt-10 text-lg">
        {job.location}
      </h4>
    </div>
  );
};

export default JobCard;
