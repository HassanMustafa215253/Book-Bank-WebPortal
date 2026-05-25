import { useState } from "react";
import AdminShell from "../components/AdminShell";

const initialBooks = [
  {
    id: 1,
    title: "Algebra for Beginners",
    edition: "3rd Edition",
    author: "M. A. Saifi",
    iban: "BB-10021",
  },
  {
    id: 2,
    title: "Foundations of Physics",
    edition: "1st Edition",
    author: "R. Karim",
    iban: "BB-10022",
  },
  {
    id: 3,
    title: "English Composition",
    edition: "5th Edition",
    author: "N. Ali",
    iban: "BB-10023",
  },
];

const emptyForm = {
  title: "",
  edition: "",
  author: "",
  iban: "",
};

function Inventory() {
  const [books, setBooks] = useState(initialBooks);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.edition || !form.author || !form.iban) {
      return;
    }

    if (editingId !== null) {
      setBooks((current) =>
        current.map((book) =>
          book.id === editingId ? { ...book, ...form } : book
        )
      );
    } else {
      setBooks((current) => [{ id: Date.now(), ...form }, ...current]);
    }

    resetForm();
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      edition: book.edition,
      author: book.author,
      iban: book.iban,
    });
    setEditingId(book.id);
    setIsFormOpen(true);
  };

  const handleRemove = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const openNewBookForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsFormOpen(true);
  };

  return (
    <AdminShell title="Inventory" subtitle="Manage the current book collection.">
      <div className="flex flex-col gap-4 border-b border-[#dccabd] bg-[#ecdacc] px-5 py-5 sm:flex-row sm:items-center sm:justify-end lg:px-6">
        <button
          type="button"
          onClick={() =>
            isFormOpen && editingId === null ? setIsFormOpen(false) : openNewBookForm()
          }
          className="border border-[#6f4e37] bg-[#6f4e37] px-5 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
        >
          {isFormOpen && editingId === null ? "Close Add Book" : "Add New Book"}
        </button>
      </div>

      {isFormOpen && (
        <div className="border-b border-[#dccabd] bg-[#e6d2c1] px-5 py-5 lg:px-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl text-[#35251d]">
              {editingId !== null ? "Update Book" : "Add New Book"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="border border-[#bca18c] bg-[#fff8f1] px-4 py-2 text-sm text-[#5d4334] transition hover:bg-[#efdece]"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="text-sm text-[#5b4132]" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="edition">
                Edition
              </label>
              <input
                id="edition"
                name="edition"
                value={form.edition}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter edition"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="iban">
                IBAN
              </label>
              <input
                id="iban"
                name="iban"
                value={form.iban}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter IBAN"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-sm text-[#5b4132]" htmlFor="author">
                Author
              </label>
              <input
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter author name"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="border border-[#6f4e37] bg-[#6f4e37] px-6 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
              >
                {editingId !== null ? "Save Changes" : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-[#fdf7f0]">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#e4cfbc]">
            <tr className="text-left text-sm text-[#6d4e3d]">
              <th className="px-5 py-4 font-medium lg:px-6">Title</th>
              <th className="px-5 py-4 font-medium lg:px-6">Edition</th>
              <th className="px-5 py-4 font-medium lg:px-6">Author</th>
              <th className="px-5 py-4 font-medium lg:px-6">IBAN</th>
              <th className="px-5 py-4 font-medium lg:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="border-t border-[#e0cebf] bg-[#fff9f3] align-top even:bg-[#f5e9dd]"
              >
                <td className="px-5 py-4 text-[#2f231d] lg:px-6">{book.title}</td>
                <td className="px-5 py-4 text-[#5f4537] lg:px-6">{book.edition}</td>
                <td className="px-5 py-4 text-[#5f4537] lg:px-6">{book.author}</td>
                <td className="px-5 py-4 text-[#5f4537] lg:px-6">{book.iban}</td>
                <td className="px-5 py-4 lg:px-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(book)}
                      className="border border-[#bca18c] bg-[#f8ede2] px-4 py-2 text-sm text-[#5d4334] transition hover:bg-[#ecd8c8]"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(book.id)}
                      className="border border-[#c8917b] bg-[#fff4ef] px-4 py-2 text-sm text-[#8a3c2f] transition hover:bg-[#f2d8cf]"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

export default Inventory;
