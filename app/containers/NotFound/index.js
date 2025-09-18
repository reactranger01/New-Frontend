import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center p-5 bg-white w-full">
      <div className="text-center">
        <div className="inline-flex rounded-fullp-4">
          <div className="rounded-full p-4 ">
            <img
              src="/images/notFound.gif"
              className="max-w-[300px] md:max-w-[600px]"
              alt="not-found"
            />
          </div>
        </div>
        <h1 className="mt-5 text-28 md:text-[36px] font-bold text-slate-800 lg:text-[50px]">
          404 - Page not found
        </h1>
        <p className="text-slate-600 mt-5 lg:text-lg">
          The page you are looking for doesn&apos;t exist or <br />
          has been removed.
        </p>
        <Link to="/" className="my-10 w-full btn btn-black">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
