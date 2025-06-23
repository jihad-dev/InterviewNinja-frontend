import { useState } from 'react';
// import { useAddCategoryMutation } from '../../Redux/features/categories/categoryApi';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CategoryState {
    name: string;
}

const AddCategories = () => {
    const [category, setCategory] = useState<CategoryState>({
        name: ''
    });
    // const [addCategory, { isLoading }] = useAddCategoryMutation();
    const isLoading = false; // Remove this when using the mutation

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!category.name.trim()) {
            toast.error('Category name is required');
            return;
        }

        let toastId: string | number | undefined = undefined;

        try {
            toastId = toast.loading('Adding category...');
            // await addCategory(category).unwrap();
            console.log(category)
            toast.success('Category added successfully!', { id: toastId });
            setCategory({
                name: ''
            });
        } catch (error) {
            let errorMessage = 'An unknown error occurred while adding the category';
            if (error && typeof error === 'object' && 'data' in error && (error as any).data?.message) {
                errorMessage = (error as any).data.message;
            }
            toast.error(errorMessage, {
                id: toastId,
                duration: 3000
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gray-50 py-12"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-8 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Add New Category
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Create a new product category to organize your inventory
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
                        <div className="grid grid-cols-1 gap-y-8">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                    Category Name *
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={category.name}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200 ease-in-out shadow-sm"
                                        required
                                        placeholder="Enter category name"
                                        autoComplete="off"
                                        spellCheck="false"
                                        maxLength={50}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent 
                                    rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 
                                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed
                                    transition duration-150 ease-in-out"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    'Add Category'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default AddCategories;
