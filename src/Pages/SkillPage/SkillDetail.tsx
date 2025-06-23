import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetQuestionsByCategoryQuery } from '../../Redux/features/categories/categoryApi';
import Loader from '../../utils/Loader';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
    _id: string;
    question: string;
    answer: string;
    category: string;
    __v?: number;
};

const SkillDetail: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { data, isLoading, error } = useGetQuestionsByCategoryQuery(name);
    const [visibleCount, setVisibleCount] = useState(3);

    if (isLoading) return <Loader />;
    if (error) return <div className="text-center text-red-500 font-semibold mt-10">Error loading questions.</div>;

    const questions = data as Question[];
    const visibleQuestions = questions.slice(0, visibleCount);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-10 max-w-2xl mx-auto min-h-[70vh]"
        >
            <h2 className="mb-1 text-3xl font-extrabold text-gray-900 tracking-tight capitalize font-sans">{name}</h2>
            <h3 className="mb-6 text-lg font-medium text-gray-500 font-sans">Interview Questions</h3>

            <div className="space-y-5">
                <AnimatePresence>
                    {visibleQuestions.map((q, idx) => (
                        <motion.div
                            key={q._id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: idx * 0.07 }}
                            className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <details className="group">
                                <summary className="cursor-pointer font-semibold text-base outline-none py-2 flex items-center gap-2 select-none text-blue-700 group-open:text-blue-900 transition-colors">
                                    <span className="text-blue-500 font-bold">Q{idx + 1}:</span> {q.question}
                                </summary>
                                <div className="mt-2 text-gray-700 text-[1rem] leading-relaxed">
                                    <strong className="block mb-1 text-blue-600">Answer:</strong>
                                    <div>{q.answer}</div>
                                </div>
                            </details>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Load More Button */}
            {visibleCount < questions.length && (
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVisibleCount(prev => prev + 5)}
                    className="mt-6 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    Load More
                </motion.button>
            )}

            <br />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center"
            >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        to="/"
                        className="inline-block mt-10 text-blue-600 border border-blue-600 font-semibold rounded-md px-6 py-2 transition-colors hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SkillDetail;
