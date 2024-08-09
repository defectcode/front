import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
                backgroundColor: ['#E60716', '#E81B29', '#EF9DA2', '#F1C5C7', '#F0F0F0'],
                borderWidth: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div style={{ width: '250px', height: '250px' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

const FundingBreakdownMobile = () => {
    const [totalCost, setTotalCost] = useState(calculateTotalCost());

    useEffect(() => {
        setTotalCost(calculateTotalCost());
    }, []);

    return (
        <div className="bg-black h-full sticky top-0 flex flex-col items-center text-white px-5 pb-20">
            <h2 className="text-2xl font-semibold mb-8 mt-14">Where Your Money Goes</h2>
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
                            <th className="py-2 text-center">
                                <div className="relative flex items-center justify-center gap-1">
                                    <span style={{ display: 'inline-block' }}>Cost</span>
                                    <span style={{ display: 'inline-block', transform: 'translateY(-7px)' }} title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque varius enim non bibendum tincidunt. Aenean condimentum ligula at felis interdum, nec tempor libero tristique. Sed tincidunt purus at dapibus blandit. Donec fringilla fringilla dolor, ac dictum tortor convallis eget.">
                                        <Image src="/icons/question.svg" alt='question' width={15} height={15} />
                                    </span>
                                </div>
                            </th>
                            <th className="py-2 text-center">
                                <div className="relative flex items-center justify-center gap-1">
                                    <span style={{ display: 'inline-block' }}>Week</span>
                                    <span style={{ display: 'inline-block', transform: 'translateY(-7px)' }} title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque varius enim non bibendum tincidunt. Aenean condimentum ligula at felis interdum, nec tempor libero tristique. Sed tincidunt purus at dapibus blandit. Donec fringilla fringilla dolor, ac dictum tortor convallis eget.">
                                        <Image src="/icons/question.svg" alt='question' width={15} height={15} />
                                    </span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='space-y-[20px]'>
                        {costData.map((item, index) => (
                            <tr key={index} className='align-middle'>
                                <td className="py-5 flex items-center relative align-middle" style={{ paddingBottom: index < costData.length - 1 ? '20px' : '0' }}>
                                    <div className="relative flex flex-col items-center point-container align-middle">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.4, duration: 0.5 }}
                                            className="w-[13px] h-[13px] rounded-full point align-middle"
                                            style={{ backgroundColor: ['#E60716', '#E81B29', '#EF9DA2', '#F1C5C7', '#F0F0F0'][index] }}
                                        />
                                        {index < costData.length - 1 && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: '95px' }}
                                                transition={{ delay: (index + 1) * 0.4, duration: 0.5 }}
                                                className="absolute left-1/2 transform -translate-x-1/2 w-[2px] align-middle gap-1"
                                                style={{ backgroundColor: ['#E60716', '#E81B29', '#EF9DA2', '#F1C5C7', '#F0F0F0'][index] }}
                                            />
                                        )}
                                    </div>
                                    <span className="ml-3 text-[#C4C4C4] text-[14px] font-roboto align-middle">{item.category}</span>
                                </td>
                                <td className="py-2 text-[#C4C4C4] text-[14px] font-roboto font-semibold w-[100px] align-middle text-center">${item.cost.toLocaleString()}</td>
                                <td className="py-2 text-[#C4C4C4] text-[14px] font-roboto font-semibold w-[60px] text-center align-middle">{item.week}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .point-container {
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .point-container::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    background-color: currentColor;
                    z-index: -1;
                }
                .point-container:first-child::after {
                    top: 50%;
                    height: 50%;
                }
                .point-container:not(:first-child)::after {
                    top: 0;
                }
                .point-container:not(:last-child)::after {
                    height: calc(100% + 1px);
                }
                .point-container:last-child::after {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default FundingBreakdownMobile;
