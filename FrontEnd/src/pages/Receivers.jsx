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
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    setIsFormOpen(false);
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
    setIsFormOpen(true);
  };

  const handleRemove = (id) => {
    setReceivers((current) => current.filter((receiver) => receiver.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <AdminShell
      title="Receivers"
      subtitle="Maintain receiver details and record extra books requested outside their course."
    >
      <div className="flex flex-col gap-4 border-b border-[#dccabd] bg-[#ecdacc] px-5 py-5 sm:flex-row sm:items-center sm:justify-end lg:px-6">
        <button
          type="button"
          onClick={() =>
            isFormOpen && editingId === null
              ? setIsFormOpen(false)
              : (setForm(emptyReceiver), setEditingId(null), setIsFormOpen(true))
          }
          className="border border-[#6f4e37] bg-[#6f4e37] px-5 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
        >
          {isFormOpen && editingId === null
            ? "Close Add Receiver"
            : "Add Receiver"}
        </button>
      </div>

      {isFormOpen && (
        <div className="border-b border-[#dccabd] bg-[#e6d2c1] px-5 py-5 lg:px-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl text-[#35251d]">
              {editingId !== null ? "Update Receiver" : "Add Receiver"}
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
              <label className="text-sm text-[#5b4132]" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
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
              <label className="text-sm text-[#5b4132]" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter phone number"
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
                placeholder="Enter school name"
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
              <label className="text-sm text-[#5b4132]" htmlFor="parentName">
                Parent Name
              </label>
              <input
                id="parentName"
                name="parentName"
                value={form.parentName}
                onChange={handleChange}
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter parent name"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-sm text-[#5b4132]" htmlFor="extraBooks">
                Extra Books Outside Course
              </label>
              <textarea
                id="extraBooks"
                name="extraBooks"
                value={form.extraBooks}
                onChange={handleChange}
                rows="3"
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Add any extra books this receiver wants outside the course"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="border border-[#6f4e37] bg-[#6f4e37] px-6 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
              >
                {editingId !== null ? "Save Changes" : "Add Receiver"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-[#fdf7f0]">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#e4cfbc]">
            <tr className="text-left text-sm text-[#6d4e3d]">
              <th className="px-5 py-4 font-medium lg:px-6">Name</th>
              <th className="px-5 py-4 font-medium lg:px-6">ITS</th>
              <th className="px-5 py-4 font-medium lg:px-6">Phone</th>
              <th className="px-5 py-4 font-medium lg:px-6">School</th>
              <th className="px-5 py-4 font-medium lg:px-6">Class</th>
              <th className="px-5 py-4 font-medium lg:px-6">Subject</th>
              <th className="px-5 py-4 font-medium lg:px-6">Parent</th>
              <th className="px-5 py-4 font-medium lg:px-6">Extra Books</th>
              <th className="px-5 py-4 font-medium lg:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receivers.map((receiver) => (
              <tr
                key={receiver.id}
                className="border-t border-[#e0cebf] bg-[#fff9f3] align-top even:bg-[#f5e9dd]"
              >
                <td className="px-5 py-4 lg:px-6">{receiver.name}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.its}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.phone}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.school}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.className}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.subject}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.parentName}</td>
                <td className="px-5 py-4 lg:px-6">{receiver.extraBooks || "-"}</td>
                <td className="px-5 py-4 lg:px-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(receiver)}
                      className="border border-[#bca18c] bg-[#f8ede2] px-4 py-2 text-sm text-[#5d4334] transition hover:bg-[#ecd8c8]"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(receiver.id)}
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

export default Receivers;
