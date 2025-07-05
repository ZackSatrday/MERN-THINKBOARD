import React from "react";
import { Plus } from 'lucide-react';
import { Link } from "react-router";

const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/20">
      <div className="mx-auto max-w-7xl py-2">
        <div className="flex items-center justify-around">
            <h1 className="text-2xl max-md:text-xl font-bold text-base-content ">
                Think<span className="text-primary">Board</span>
            </h1>
            <div>
                <Link to='/create' className="btn btn-primary shadow-black btn-sm flex items-center gap-2">
                <Plus size='15' />
                <span>Create Note</span>
            </Link>
            </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
