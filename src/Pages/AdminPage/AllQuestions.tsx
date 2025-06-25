import { useState } from 'react';
import { Edit, Eye, Trash2, ArrowUpDown } from 'lucide-react';
import Button from '../../components/ui/Button';
import Loader from '../../utils/Loader';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useGetAllQuestionsQuery } from '../../Redux/features/categories/categoryApi';

interface Question {
    _id: string;
    question: string;
    answer: string;
    category: string;
}

interface AllQuestionsResponse {
    total: number;
    questions: Question[];
    page: number;
    pages: number;
}

const AllQuestions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [sortField, setSortField] = useState<keyof Question | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const { data, isLoading } = useGetAllQuestionsQuery({ page, search: searchTerm }) as { data: AllQuestionsResponse, isLoading: boolean };
    const questions = data?.questions || [];

    // Delete (Demo placeholder)
    const handleDelete = async (question: Question) => {
        Swal.fire({
            title: 'Confirm Delete',
            text: 'Are you sure you want to delete this?',
            icon: 'warning',
            showCancelButton: true,
        });
    };

    // Sorting
    const handleSort = (field: keyof Question) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const sortedQuestions = [...questions].sort((a, b) => {
        if (!sortField) return 0;
        const aVal = a[sortField]?.toLowerCase() || '';
        const bVal = b[sortField]?.toLowerCase() || '';
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to first page when searching
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4">
            {/* Search Field */}
            <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
                <div className="flex w-full max-w-md">
                    <input
                        type="search"
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <Button type="submit" variant="primary" size="sm" className="rounded-l-none rounded-r-lg">Search</Button>
                </div>
                <Link to="/dashboard/question/add-question">
                    <Button variant="primary" size="sm" className="w-full sm:w-auto cursor-pointer">Add Question</Button>
                </Link>
            </form>

            {/* Questions Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                <button onClick={() => handleSort('question')} className="flex items-center gap-1 group hover:text-blue-700">
                                    Question <ArrowUpDown className="w-4 h-4 text-gray-400 group-hover:text-blue-700" />
                                </button>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                <button onClick={() => handleSort('category')} className="flex items-center gap-1 group hover:text-blue-700">
                                    Category <ArrowUpDown className="w-4 h-4 text-gray-400 group-hover:text-blue-700" />
                                </button>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Answer</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sortedQuestions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-400">No questions found.</td>
                            </tr>
                        ) : (
                            sortedQuestions.map((q, idx) => (
                                <tr
                                    key={q._id}
                                    className={
                                        `transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`
                                    }
                                >
                                    <td className="px-6 py-4 max-w-xs text-gray-900 text-sm font-medium truncate" title={q.question}>{q.question}</td>
                                    <td className="px-6 py-4 text-gray-700 text-sm">
                                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{q.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate" title={q.answer}>{q.answer}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <Link to={`/dashboard/questions/view-question/${q._id}`} title="View">
                                            <Button size="sm" variant="ghost" className="hover:bg-blue-100 cursor-pointer" aria-label="View"><Eye className="w-4 h-4" /></Button>
                                        </Link>
                                        <Button size="sm" variant="ghost" className="hover:bg-yellow-100 cursor-pointer" aria-label="Edit" title="Edit"><Edit className="w-4 h-4 text-yellow-500" /></Button>
                                        <Button onClick={() => handleDelete(q)} size="sm" variant="ghost" className="hover:bg-red-100 cursor-pointer" aria-label="Delete" title="Delete"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2 px-4 pb-4">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-semibold">{questions.length}</span> of <span className="font-semibold">{data?.total || 0}</span> questions
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            variant="outline"
                            size="sm"
                        >
                            Previous
                        </Button>
                        <span className="text-gray-700 text-sm pt-2">Page {page} of {data?.pages}</span>
                        <Button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page === data?.pages}
                            variant="outline"
                            size="sm"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllQuestions;
