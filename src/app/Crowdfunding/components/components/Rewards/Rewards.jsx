import React, { useState } from 'react';

const rewards = [
  { id: 1, name: 'Project Supporter', price: '$1', includes: ['Digital wallpapers'], description: 'Access to news and updates' },
  { id: 2, name: 'Early Backer', price: '$5', includes: ['Early access to updates'], description: 'Support the project early' },
  { id: 3, name: 'Community Member', price: '$10', includes: ['Community access'], description: 'Join the community' },
  // Adaugă aici restul recompenselor
];

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState(rewards[0]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="flex w-full max-w-[1200px]">
        {/* Meniul fix din stânga */}
        <div className="w-1/3 sticky top-0 p-4 h-screen">
          <h2 className="text-white text-xl mb-4">Select Your Reward</h2>
          <ul>
            {rewards.map((reward) => (
              <li
                key={reward.id}
                onClick={() => setSelectedReward(reward)}
                className={`cursor-pointer mb-2 p-2 rounded ${
                  selectedReward.id === reward.id ? 'bg-red-500 text-white' : 'text-gray-400'
                }`}
              >
                <span className="text-sm">{reward.name}</span>
                <span className="text-xs block text-gray-500">{reward.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cardul din centru */}
        <div className="w-1/3 p-4 flex justify-center items-center">
          <div className="bg-gray-700 text-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-lg mb-2">{selectedReward.name}</h3>
            <p className="text-sm mb-4">{selectedReward.description}</p>
            <button className="bg-white text-gray-900 py-2 px-4 rounded">Select</button>
          </div>
        </div>

        {/* Detaliile din dreapta */}
        <div className="w-1/3 p-4">
          <h4 className="text-white text-lg mb-4">Includes</h4>
          <ul className="text-gray-400">
            {selectedReward.includes.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
