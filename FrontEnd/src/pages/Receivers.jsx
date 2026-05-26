import { useState } from "react";
import AdminShell from "../components/AdminShell";

const initialReceivers = [
  {
    id: 1,
    name: "Fatema Noor",
    its: "30456789",
    phone: "0300-4567890",
    school: "MSB Educational Institute",
    className: "Class 8",
    subject: "Mathematics",
    parentName: "Zainab Noor",
    extraBooks: "Atlas of Science, Urdu Grammar Companion",
  },
  {
    id: 2,
    name: "Ali Abbas",
    its: "30456890",
    phone: "0312-7788990",
    school: "Burhani Academy",
    className: "Class 10",
    subject: "Physics",
    parentName: "Husain Abbas",
    extraBooks: "English Composition",
  },
];

const emptyReceiver = {
  name: "",
  its: "",
  phone: "",
  school: "",
  className: "",
  subject: "",
  parentName: "",
  extraBooks: "",
};

function Receivers() {
  const [receivers, setReceivers] = useState(initialReceivers);
  const [form, setForm] = useState(emptyReceiver);
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
    setForm(emptyReceiver);
    setEditingId(null);
    setIsInputMode(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.its ||
      !form.phone ||
      !form.school ||
      !form.className ||
      !form.subject ||
      !form.parentName
    ) {
      return;
    }

    if (editingId !== null) {
      setReceivers((current) =>
        current.map((receiver) =>
          receiver.id === editingId ? { ...receiver, ...form } : receiver
        )
      );
    } else {
      setReceivers((current) => [{ id: Date.now(), ...form }, ...current]);
    }

    resetForm();
  };

  const handleEdit = (receiver) => {
    setForm(receiver);
    setEditingId(receiver.id);
    setIsInputMode(true);
  };

  const handleRemove = (id) => {
    setReceivers((current) => current.filter((receiver) => receiver.id !== id));

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
          : (setForm(emptyReceiver), setEditingId(null), setIsInputMode(true))
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
      title="Receivers"
      headerAction={viewToggle}
    >
      {isInputMode ? (
        <div className="border-b border-[var(--border)] bg-white px-5 py-6 lg:px-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
              {editingId !== null ? "Update Receiver" : "Add Receiver"}
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
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
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
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter phone number"
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
                placeholder="Enter school name"
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
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="parentName">
                Parent Name
              </label>
              <input
                id="parentName"
                name="parentName"
                value={form.parentName}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter parent name"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-[var(--text)]" htmlFor="extraBooks">
                Extra Books Outside Course
              </label>
              <textarea
                id="extraBooks"
                name="extraBooks"
                value={form.extraBooks}
                onChange={handleChange}
                rows="3"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Add any extra books this receiver wants outside the course"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                {editingId !== null ? "Save Changes" : "Add Receiver"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-[var(--surface-strong)]">
              <tr className="text-left text-sm text-[var(--text-muted)]">
                <th className="px-5 py-4 font-semibold lg:px-7">Name</th>
                <th className="px-5 py-4 font-semibold lg:px-7">ITS</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Phone</th>
                <th className="px-5 py-4 font-semibold lg:px-7">School</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Class</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Subject</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Parent</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Extra Books</th>
                <th className="px-5 py-4 font-semibold lg:px-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivers.map((receiver) => (
                <tr
                  key={receiver.id}
                  className="border-t border-[var(--border)] align-top even:bg-[var(--surface-muted)]"
                >
                  <td className="px-5 py-4 font-medium text-[var(--text)] lg:px-7">{receiver.name}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.its}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.phone}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.school}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.className}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.subject}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.parentName}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.extraBooks || "-"}</td>
                  <td className="px-5 py-4 lg:px-7">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(receiver)}
                        className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(receiver.id)}
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

export default Receivers;
