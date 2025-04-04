import React from 'react';
import { Bed, Users } from 'lucide-react';
import useFetchAPI from '../hooks/useAPI';
import HorizontalCard from '../components/HorizontalCard';

const Dashboard = () => {

  //Used Hook Here instead of Redux Toolkit
  //Task was given by Ajay Bhai
  const {data:beds, loading:loadingBeds, error:bedsError } = useFetchAPI('http://localhost:5000/api/beds/available');
  const admittedPatients = useFetchAPI('http://localhost:5000/api/patients/admitted');
  const dischargedPatients = useFetchAPI('http://localhost:5000/api/patients/discharged')

  console.log(dischargedPatients);


  if (loadingBeds || admittedPatients.loading || dischargedPatients.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bedsError || admittedPatients.error || dischargedPatients.error) {
    return (
      <div className="text-red-600 text-center mt-4">
        Error fetching data. Please try again.
      </div>
    );
  }

  const totalAvailableBeds = beds && beds?.reduce((total, room) => total + room.beds.length, 0);
  const totalBeds = 3 * 30;

  return (
    <div className="select-none">
      <h1 className="text-3xl font-bold mb-8 text-white bg-blue-600 w-fit px-3 py-2 rounded-lg">Dashboard</h1>

      {/* TOP PART */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* FIRST HORIZONTAL CARD */}
        <HorizontalCard
          title={"Available Beds"}
          counts={`${totalAvailableBeds} / ${totalBeds}`}
          Icon={
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Bed size={24} />
            </div>
          }
          Progress={
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(totalAvailableBeds / totalBeds) * 100}%` }}
            ></div>
          }
        />

        {/* SECOND HORIZONTAL CARD */}

        <HorizontalCard
        title={'Current Patients'}
        counts={`${admittedPatients?.data?.length}`}
        Icon={
          <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users size={24} />
          </div>
        }
        Progress={
            <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (admittedPatients?.data?.length / totalBeds) * 100
                    }%`,
                  }}
            ></div>
        }
        />

        {/* THIRD HORIZONTAL CARD */}

        <HorizontalCard
        title={'Happy Patients'}
        counts={
          <p className="text-2xl font-semibold text-gray-700">
                {dischargedPatients?.data?.totalDocs}
              </p>
        }
        Icon={
          <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Users size={24} />
            </div>
        }
        Progress={
          <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: `${dischargedPatients?.data?.totalDocs}%` }}
              ></div>
            </div>
        }
        />


      </div>

      {/* BOTTOM PART */}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Available Beds by Room
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {beds?.map((room) => (
            <div key={room.roomNumber} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">
                Room {room.roomNumber}
              </h3>
              <p className="text-gray-600 mb-2">
                Available: {room.beds.length} / 30
              </p>
              <div className="grid grid-cols-6 text-center gap-2">
                {[...Array(30)].map((_, i) => {
                  const bedNumber = i + 1;
                  const isAvailable = room.beds.includes(bedNumber);
                  return (
                    <span
                      key={bedNumber}
                      className={`inline-block px-3 py-2 text-xs font-medium rounded ${
                        isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Bed {bedNumber}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;