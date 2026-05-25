import { useState } from "react";
import bookBankImage from "../assets/image.png";

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

const navItems = ["Inventory", "Issued Books", "Returns", "Members"];

function Inventory() {
  const [books, setBooks] = useState(initialBooks);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
      setBooks((current) => [
        {
          id: Date.now(),
          ...form,
        },
        ...current,
      ]);
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
    <div className="min-h-screen bg-[#e7d9cb] text-[#2f231d]">
      <header className="sticky top-0 z-30 border-b border-[#cdb7a3] bg-[#f1e4d6]/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center border border-[#bca18c] bg-[#fff8f1] text-[#5d4334] transition hover:bg-[#eedccc]"
              aria-label="Toggle navigation panel"
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>

            <div className="flex items-center gap-3">
              <img
                src={bookBankImage}
                alt="Book Bank logo"
                className="h-14 w-14 shrink-0 rounded-full border border-[#c7af9a] bg-[#fff8f1] object-cover p-1 shadow-sm"
              />
              <div>
                <p className="font-serif text-2xl leading-none text-[#3b2a22]">
                  Book Bank
                </p>
                <p className="mt-1 text-sm text-[#7a5b49]">
                  Tolobat Ul Kulliyaat Ul Muminoon
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((current) => !current)}
              className="flex items-center gap-3 border border-[#bca18c] bg-[#fff8f1] px-3 py-2 text-left transition hover:bg-[#f0dfcf]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6f4e37] text-sm font-semibold text-white">
                AM
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#3c2a21]">Admin Member</p>
                <p className="text-xs text-[#7f624e]">Inventory Manager</p>
              </div>
              <span className="text-[#6f4e37]">▼</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden border border-[#cdb7a3] bg-[#fff8f1] shadow-lg">
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-[#4b3529] transition hover:bg-[#efdece]"
                >
                  Settings
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-[#8a3c2f] transition hover:bg-[#f5dcd3]"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside
          className={`border-r border-[#ccb6a3] bg-[#ddcab7] transition-all duration-300 ${
            isSidebarOpen ? "w-[250px]" : "w-[88px]"
          }`}
        >
          <nav className="flex min-h-[calc(100vh-76px)] flex-col gap-3 px-3 py-6">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`flex items-center gap-3 border px-4 py-3 text-left text-sm transition ${
                  item === "Inventory"
                    ? "border-[#6f4e37] bg-[#6f4e37] text-white shadow-sm"
                    : "border-[#ccb6a3] bg-[#f8efe6] text-[#5d4334] hover:bg-[#eedccc]"
                }`}
              >
                <span className="text-base">{item === "Inventory" ? "■" : "□"}</span>
                {isSidebarOpen && <span>{item}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <section className="mx-auto w-full max-w-[1100px] overflow-hidden border border-[#cab19d] bg-[#f9f1e8] shadow-[0_18px_50px_rgba(91,63,43,0.08)]">
            <div className="flex flex-col gap-4 border-b border-[#dccabd] bg-[#ecdacc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-6">
              <div>
                <h1 className="font-serif text-3xl text-[#31231b]">Inventory</h1>
                <p className="mt-1 text-sm text-[#7b5d49]">
                  Manage the current book collection.
                </p>
              </div>

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
          </section>
        </main>
      </div>
    </div>
  );
}

export default Inventory;
