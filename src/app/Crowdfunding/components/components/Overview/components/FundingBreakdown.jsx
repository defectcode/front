import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';

const costData = [
    { category: 'Rent and Prepare the Space', cost: 75000, week: '1-2' },
    { category: 'Premium Equipment', cost: 65000, week: '3-4' },
    { category: 'Staff (first month)', cost: 17000, week: '5-6' },
    { category: 'Materials (first month)', cost: 20000, week: '7-8' },
    { category: 'Additional Costs for International Shipping and Online Orders', cost: 50000, week: '9-10' }
];

const calculateTotalCost = () => {
    return costData.reduce((total, item) => total + item.cost, 0);
};

const DoughnutChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                data: data.map(item => item.cost),
                backgroundColor: ['#E60716', '#BA1520', '#EB3F4A', '#EA757C', '#EF9DA2'],
                borderWidth: 0 
            }
        ]
    };

    const options = {
        responsive: true,
        cutout: '80%', 
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
};

const FundingBreakdown = () => {
    const [totalCost, setTotalCost] = useState(calculateTotalCost());

    useEffect(() => {
        setTotalCost(calculateTotalCost());
    }, []);

    return (
        <div className="bg-black h-screen sticky top-0 flex flex-col items-center text-white pr-20">
            <h2 className="text-3xl font-semibold mb-8 mt-14">Where Your Money Goes</h2>
            <div className="relative">
                <DoughnutChart data={costData} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">${totalCost.toLocaleString()}</span>
                </div>
            </div>
            <div className="mt-8 w-full max-w-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className='font-bold text-[14px] font-roboto text-[#F5F5F7]'>
                            <th className="py-2">Category</th>
                            <th className="py-2">Cost</th>
                            <th className="py-2">Week</th>
                        </tr>
                    </thead>
                    <tbody>
                        {costData.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 flex items-center">
                                    <div className="relative flex items-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.2, duration: 0.5 }}
                                            className="w-[13px] h-[13px] rounded-full"
                                            style={{ backgroundColor: ['#E50815', '#F25C5C', '#F27C7C', '#F29C9C', '#F2BCBC'][index] }}
                                        />
                                    </div>
                                    <span className="ml-2 text-[#C4C4C4] text-[14px] font-roboto w-[70%]">{item.category}</span>
                                </td>
                                <td className="py-2 text-[#C4C4C4] text-[14px] font-roboto font-semibold w-[100px]">${item.cost.toLocaleString()}</td>
                                <td className="py-2 text-[#C4C4C4] text-[14px] font-roboto font-semibold w-[60px]">{item.week}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FundingBreakdown;
