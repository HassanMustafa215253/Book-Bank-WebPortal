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
  const [isInputMode, setIsInputMode] = useState(false);

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
    setIsInputMode(false);
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
    setIsInputMode(true);
  };

  const handleRemove = (id) => {
    setLentBooks((current) => current.filter((entry) => entry.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const viewToggle = (
    <button
      type="button"
      onClick={() =>
        isInputMode
          ? resetForm()
          : (setForm(emptyLentBook), setEditingId(null), setIsInputMode(true))
      }
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
    <AdminShell
      title="Lent Books"
      headerAction={viewToggle}
    >
      {isInputMode ? (
        <div className="border-b border-[var(--border)] bg-white px-5 py-6 lg:px-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
              {editingId !== null ? "Update Lent Record" : "Add Lent Record"}
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
            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="receiverName">
                Receiver Name
              </label>
              <input
                id="receiverName"
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter receiver name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="its">
                ITS
              </label>
              <input
                id="its"
                name="its"
                value={form.its}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter ITS number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="school">
                School
              </label>
              <input
                id="school"
                name="school"
                value={form.school}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter school"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="className">
                Class
              </label>
              <input
                id="className"
                name="className"
                value={form.className}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter class"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="bookTitle">
                Book Title
              </label>
              <input
                id="bookTitle"
                name="bookTitle"
                value={form.bookTitle}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter book title"
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

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="issueDate">
                Issue Date
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="date"
                value={form.issueDate}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                {editingId !== null ? "Save Changes" : "Add Record"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-[var(--surface-strong)]">
              <tr className="text-left text-sm text-[var(--text-muted)]">
                <th className="px-5 py-4 font-semibold lg:px-7">Receiver</th>
                <th className="px-5 py-4 font-semibold lg:px-7">ITS</th>
                <th className="px-5 py-4 font-semibold lg:px-7">School</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Class</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Subject</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Book</th>
                <th className="px-5 py-4 font-semibold lg:px-7">IBAN</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Issued</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Due</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lentBooks.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-t border-[var(--border)] align-top even:bg-[var(--surface-muted)]"
                >
                  <td className="px-5 py-4 font-medium text-[var(--text)] lg:px-7">{entry.receiverName}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.its}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.school}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.className}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.subject}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.bookTitle}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.iban}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.issueDate || "-"}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{entry.dueDate || "-"}</td>
                  <td className="px-5 py-4 lg:px-7">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(entry)}
                        className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(entry.id)}
                        className="rounded-2xl border border-[rgba(166,61,53,0.22)] bg-[var(--danger-soft)] px-4 py-2 text-sm font-medium text-[var(--danger)] transition hover:bg-[#ffe7e5]"
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
      )}
    </AdminShell>
  );
}

export default LentBooks;
