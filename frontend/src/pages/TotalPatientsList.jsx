import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {fetchAll} from '../redux/patientSlice.js'

const TotalPatientsList = () => {

  const dispatch = useDispatch()
  const {listThree:patients,error,loading,success} = useSelector((state)=>state.patients)

  useEffect(()=>{
    dispatch(fetchAll())
  },[success])

  const calculateExpectedDischargeDate = (admissionDate, totalDays) => {
    const admission = new Date(admissionDate);
    admission.setDate(admission.getDate() + totalDays);
    return admission.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='select-none'>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{success}</div>
      )}

      {patients.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No patients found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bed
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Doctor
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discharged / Expected Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Bill
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-center divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {patient.roomNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {patient.bedNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {patient.totalDays}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {patient.doctorName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(patient.admissionDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.dischargeDate ? (
                        <div className="text-sm text-green-700">
                          {new Date(patient.dischargeDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-blue-700">
                            {(calculateExpectedDischargeDate(
                              patient.admissionDate,
                              patient.totalDays
                            ))}
                          </div>
                          <span className="mt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 px-2 py-1">
                            Expected Date
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.dischargeDate ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Discharged
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Admitted
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-center whitespace-nowrap'>
                      <div className='text-sm text-gray-700'>
                        {(()=>{
                          let roomRent = 0
                          if(patient.roomNumber === 101){
                            roomRent = 1000
                          }else if(patient.roomNumber === 102){
                            roomRent = 2500
                          }else{
                            roomRent = 4500
                          }

                          const totalRentRoom = roomRent * patient.totalDays + 1400
                          const gstTotal = (totalRentRoom*18)/100
                          const totalBill = totalRentRoom + gstTotal
                          return totalBill.toFixed(2)
                        })()}
                      {" "}₹</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalPatientsList;