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
  const [isInputMode, setIsInputMode] = useState(false);

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
    setIsInputMode(false);
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
    setIsInputMode(true);
  };

  const handleRemove = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const showInputSection = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsInputMode(true);
  };

  const viewToggle = (
    <button
      type="button"
      onClick={() => (isInputMode ? resetForm() : showInputSection())}
      aria-pressed={isInputMode}
      className="relative inline-flex h-14 w-full max-w-[15rem] items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 sm:w-[15rem]"
    >
      <span
        className={`absolute  h-12 w-[calc(50%-0.125rem)] rounded-full bg-[var(--primary)] transition-transform duration-300 ${
          isInputMode ? "translate-x-[calc(100%-0.25rem)]" : "translate-x-0"
        }`}
      />
      <span className={`relative z-10 flex-1 text-sm font-medium transition ${!isInputMode ? "text-white" : "text-[var(--text-muted)]"}`}>
        Records
      </span>
      <span className={`relative z-10 flex-1 text-sm font-medium transition ${isInputMode ? "text-white" : "text-[var(--text-muted)]"}`}>
        Input
      </span>
    </button>
  );



  return (
    <AdminShell title="Inventory" headerAction={viewToggle}>
      {isInputMode ? (
        <div className="border-b border-[var(--border)] bg-white px-5 py-6 lg:px-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
              {editingId !== null ? "Update Book" : "Add New Book"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="edition">
                Edition
              </label>
              <input
                id="edition"
                name="edition"
                value={form.edition}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter edition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="iban">
                IBAN
              </label>
              <input
                id="iban"
                name="iban"
                value={form.iban}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter IBAN"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="author">
                Author
              </label>
              <input
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter author name"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                {editingId !== null ? "Save Changes" : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-[var(--surface-strong)]">
              <tr className="text-left text-sm text-[var(--text-muted)]">
                <th className="px-5 py-4 font-semibold lg:px-7">Title</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Edition</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Author</th>
                <th className="px-5 py-4 font-semibold lg:px-7">IBAN</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-t border-[var(--border)] align-top even:bg-[var(--surface-muted)]"
                >
                  <td className="px-5 py-4 font-medium text-[var(--text)] lg:px-7">{book.title}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{book.edition}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{book.author}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{book.iban}</td>
                  <td className="px-5 py-4 lg:px-7">
                  <button
                    type="button"
                    aria-label="Open receiver menu"
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                  >
                    ⋮
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}

export default Inventory;
