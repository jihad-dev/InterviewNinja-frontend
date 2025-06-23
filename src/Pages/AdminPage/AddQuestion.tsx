import React, { useState } from "react";
import { toast } from "sonner";
import { useCreateQuestionsMutation } from "../../Redux/features/categories/categoryApi";
import { skills } from "../../components/Skills/Skills";

interface QuestionFormState {
  question: string;
  answer: string;
  category: string;
}

const QuestionForm: React.FC = () => {
  const [form, setForm] = useState<QuestionFormState>({
    question: "",
    answer: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [createQuestion] = useCreateQuestionsMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Creating Question...");
    try {

     await createQuestion(form).unwrap();
   
      toast.success("Question created successfully!", { id: toastId });
      // Reset form
      (e.target as HTMLFormElement).reset();
      toast.dismiss();
      setLoading(false);
    } catch (err: any) {

      const errorMessage = err?.data?.message || "Failed to create Question";
      toast.error(errorMessage, { id: toastId });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Question & Answer</h2>
      <div>
        <label className="block mb-1 font-medium">Question</label>
        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Answer</label>
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {skills && skills?.map((skill) => (
            <option key={skill?.name} value={skill?.name}>
              {skill?.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creating..." : "Submit"}
      </button>
    </form>
  );
};

export default QuestionForm;