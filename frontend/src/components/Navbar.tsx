import React from 'react';
import { Link } from 'react-router-dom';
import { Bed } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md select-none">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Bed className="h-7 w-7 mr-2" />
            <Link to="/" className="text-xl font-bold">Bed Management</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Dashboard
            </Link>
            <Link to="/add-doc" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Add Doctor
            </Link>
            <Link to="/admit" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Admit Patient
            </Link>
            <Link to="/admitted-patients" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Admitted Patients
            </Link>
            <Link to="/discharged-patients" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Discharged Patients
            </Link>
            <Link to="/patients-all" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              All Patients
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;