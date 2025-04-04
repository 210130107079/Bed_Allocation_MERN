import React from "react";

const HorizontalCard = ({title, counts, Icon, Progress}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        {Icon}
        <div className="ml-4">
          <p className="text-sm text-gray-500 uppercase">{title}</p>
          <p className="text-2xl font-semibold text-gray-700">
            {counts}    
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            {Progress}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
