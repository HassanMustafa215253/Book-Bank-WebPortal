import { useState } from "react";
import AdminShell from "../components/AdminShell";

const initialLentBooks = [
  {
    id: 1,
    receiverName: "Fatema Noor",
    its: "30456789",
    school: "MSB Educational Institute",
    className: "Class 8",
    subject: "Mathematics",
    bookTitle: "Algebra for Beginners",
    iban: "BB-10021",
    issueDate: "2026-05-20",
    dueDate: "2026-06-20",
  },
  {
    id: 2,
    receiverName: "Ali Abbas",
    its: "30456890",
    school: "Burhani Academy",
    className: "Class 10",
    subject: "Physics",
    bookTitle: "Foundations of Physics",
    iban: "BB-10022",
    issueDate: "2026-05-18",
    dueDate: "2026-06-18",
  },
];

const emptyLentBook = {
  receiverName: "",
  its: "",
  school: "",
  className: "",
  subject: "",
  bookTitle: "",
  iban: "",
  issueDate: "",
  dueDate: "",
};

function LentBooks() {
  const [lentBooks, setLentBooks] = useState(initialLentBooks);
  const [form, setForm] = useState(emptyLentBook);
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
    setForm(emptyLentBook);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.receiverName ||
      !form.its ||
      !form.school ||
      !form.className ||
      !form.subject ||
      !form.bookTitle ||
      !form.iban
    ) {
      return;
    }

    if (editingId !== null) {
      setLentBooks((current) =>
        current.map((entry) =>
          entry.id === editingId ? { ...entry, ...form } : entry
        )
      );
    } else {
      setLentBooks((current) => [{ id: Date.now(), ...form }, ...current]);
    }

    resetForm();
  };

  const handleEdit = (entry) => {
    setForm(entry);
    setEditingId(entry.id);
    setIsFormOpen(true);
  };

  const handleRemove = (id) => {
    setLentBooks((current) => current.filter((entry) => entry.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <AdminShell
      title="Lent Books"
      subtitle="Track the books that have been lent out to receivers and maintain their lending records."
    >
      <div className="flex flex-col gap-4 border-b border-[#dccabd] bg-[#ecdacc] px-5 py-5 sm:flex-row sm:items-center sm:justify-end lg:px-6">
        <button
          type="button"
          onClick={() =>
            isFormOpen && editingId === null
              ? setIsFormOpen(false)
              : (setForm(emptyLentBook), setEditingId(null), setIsFormOpen(true))
          }
          className="border border-[#6f4e37] bg-[#6f4e37] px-5 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
        >
          {isFormOpen && editingId === null
            ? "Close Lent Record"
            : "Add Lent Record"}
        </button>
      </div>

      {isFormOpen && (
        <div className="border-b border-[#dccabd] bg-[#e6d2c1] px-5 py-5 lg:px-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl text-[#35251d]">
              {editingId !== null ? "Update Lent Record" : "Add Lent Record"}
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
            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="receiverName">
                Receiver Name
              </label>
              <input
                id="receiverName"
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter receiver name"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="its">
                ITS
              </label>
              <input
                id="its"
                name="its"
                value={form.its}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter ITS number"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="school">
                School
              </label>
              <input
                id="school"
                name="school"
                value={form.school}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter school"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="className">
                Class
              </label>
              <input
                id="className"
                name="className"
                value={form.className}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter class"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="bookTitle">
                Book Title
              </label>
              <input
                id="bookTitle"
                name="bookTitle"
                value={form.bookTitle}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter book title"
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

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="issueDate">
                Issue Date
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="date"
                value={form.issueDate}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
              />
            </div>

            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="border border-[#6f4e37] bg-[#6f4e37] px-6 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
              >
                {editingId !== null ? "Save Changes" : "Add Record"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-[#fdf7f0]">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#e4cfbc]">
            <tr className="text-left text-sm text-[#6d4e3d]">
              <th className="px-5 py-4 font-medium lg:px-6">Receiver</th>
              <th className="px-5 py-4 font-medium lg:px-6">ITS</th>
              <th className="px-5 py-4 font-medium lg:px-6">School</th>
              <th className="px-5 py-4 font-medium lg:px-6">Class</th>
              <th className="px-5 py-4 font-medium lg:px-6">Subject</th>
              <th className="px-5 py-4 font-medium lg:px-6">Book</th>
              <th className="px-5 py-4 font-medium lg:px-6">IBAN</th>
              <th className="px-5 py-4 font-medium lg:px-6">Issued</th>
              <th className="px-5 py-4 font-medium lg:px-6">Due</th>
              <th className="px-5 py-4 font-medium lg:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lentBooks.map((entry) => (
              <tr
                key={entry.id}
                className="border-t border-[#e0cebf] bg-[#fff9f3] align-top even:bg-[#f5e9dd]"
              >
                <td className="px-5 py-4 lg:px-6">{entry.receiverName}</td>
                <td className="px-5 py-4 lg:px-6">{entry.its}</td>
                <td className="px-5 py-4 lg:px-6">{entry.school}</td>
                <td className="px-5 py-4 lg:px-6">{entry.className}</td>
                <td className="px-5 py-4 lg:px-6">{entry.subject}</td>
                <td className="px-5 py-4 lg:px-6">{entry.bookTitle}</td>
                <td className="px-5 py-4 lg:px-6">{entry.iban}</td>
                <td className="px-5 py-4 lg:px-6">{entry.issueDate || "-"}</td>
                <td className="px-5 py-4 lg:px-6">{entry.dueDate || "-"}</td>
                <td className="px-5 py-4 lg:px-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(entry)}
                      className="border border-[#bca18c] bg-[#f8ede2] px-4 py-2 text-sm text-[#5d4334] transition hover:bg-[#ecd8c8]"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(entry.id)}
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

export default LentBooks;
