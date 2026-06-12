import { Fragment, useState } from "react";
import AdminShell from "../components/AdminShell";
import { initialSchools, loadCourseRecords } from "../data/courseRecordsData";
import { BookOpen, LibraryBig, BookX } from "lucide-react";


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
    extraBooks: [],
    excludedBooks: [],
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
    extraBooks: [],
    excludedBooks: [],
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
};

const emptyBookDraft = {
  title: "",
  edition: "",
  publisher: "",
  author: "",
};

const sectionConfig = {
  original: { label: "Course Records" },
  extra: { label: "Extra Books", emptyMessage: "No extra books added yet." },
  excluded: {
    label: "Excluded Books",
    emptyMessage: "No excluded books added yet.",
  },
};

const normalizeText = (value) => (value ?? "").trim().toLowerCase();

const normalizeClassText = (value) => normalizeText(value).replace(/^class\s+/, "");

const getStoredSchools = () => {
  const storedSchools = loadCourseRecords();
  return Array.isArray(storedSchools) ? storedSchools : initialSchools;
};

const getMatchingBooks = (schoolName, className) => {
  const targetSchool = normalizeText(schoolName);
  const targetClass = normalizeClassText(className);

  const school = getStoredSchools().find(
    (schoolEntry) => normalizeText(schoolEntry.name) === targetSchool
  );

  const classEntry = school?.classes.find(
    (classRecord) => normalizeClassText(classRecord.className) === targetClass
  );

  return classEntry?.books ?? [];
};

const getDraftKey = (receiverId, section) => `${receiverId}-${section}`;
const inputReceiverKey = "input";

function Receivers() {
  const [receivers, setReceivers] = useState(initialReceivers);
  const [form, setForm] = useState(emptyReceiver);
  const [editingId, setEditingId] = useState(null);
  const [isInputMode, setIsInputMode] = useState(false);
  const [expandedReceiverId, setExpandedReceiverId] = useState(null);
  const [activeSectionByReceiverId, setActiveSectionByReceiverId] = useState({});
  const [openMenuByReceiverId, setOpenMenuByReceiverId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [bookDrafts, setBookDrafts] = useState({});
  const [isBookFormOpenByKey, setIsBookFormOpenByKey] = useState({});
  const [inputActiveSection, setInputActiveSection] = useState("original");
  const [inputExtraBooks, setInputExtraBooks] = useState([]);
  const [inputExcludedBooks, setInputExcludedBooks] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyReceiver);
    setEditingId(null);
    setIsInputMode(false);
    setInputActiveSection("original");
    setInputExtraBooks([]);
    setInputExcludedBooks([]);

    setBookDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[getDraftKey(inputReceiverKey, "original")];
      delete nextDrafts[getDraftKey(inputReceiverKey, "extra")];
      delete nextDrafts[getDraftKey(inputReceiverKey, "excluded")];
      return nextDrafts;
    });

    setIsBookFormOpenByKey((current) => {
      const nextVisibility = { ...current };
      delete nextVisibility[getDraftKey(inputReceiverKey, "original")];
      delete nextVisibility[getDraftKey(inputReceiverKey, "extra")];
      delete nextVisibility[getDraftKey(inputReceiverKey, "excluded")];
      return nextVisibility;
    });
  };

  const startInputMode = () => {
    setForm(emptyReceiver);
    setEditingId(null);
    setInputActiveSection("original");
    setInputExtraBooks([]);
    setInputExcludedBooks([]);

    setBookDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[getDraftKey(inputReceiverKey, "original")];
      delete nextDrafts[getDraftKey(inputReceiverKey, "extra")];
      delete nextDrafts[getDraftKey(inputReceiverKey, "excluded")];
      return nextDrafts;
    });

    setIsBookFormOpenByKey((current) => {
      const nextVisibility = { ...current };
      delete nextVisibility[getDraftKey(inputReceiverKey, "original")];
      delete nextVisibility[getDraftKey(inputReceiverKey, "extra")];
      delete nextVisibility[getDraftKey(inputReceiverKey, "excluded")];
      return nextVisibility;
    });

    setIsInputMode(true);
  };

  const toggleExpandedRow = (receiverId) => {
    const isClosing = expandedReceiverId === receiverId;

    setExpandedReceiverId(isClosing ? null : receiverId);
    setOpenMenuByReceiverId(null);
    setMenuPosition(null);

    if (!isClosing) {
      setActiveSectionByReceiverId((current) => ({
        ...current,
        [receiverId]: current[receiverId] ?? "original",
      }));
    }
  };

  const toggleMenu = (receiverId, event) => {
    const rect = event?.currentTarget?.getBoundingClientRect?.();

    setOpenMenuByReceiverId((current) => {
      if (current === receiverId) {
        setMenuPosition(null);
        return null;
      }

      if (!rect) {
        setMenuPosition(null);
        return receiverId;
      }

      const menuWidth = 160;
      const menuHeight = 120;
      const viewportPadding = 8;
      const offset = 8;
      const left = Math.min(
        Math.max(rect.right - menuWidth, viewportPadding),
        window.innerWidth - menuWidth - viewportPadding
      );
      const preferredTop = rect.bottom + offset;
      const fitsBelow = preferredTop + menuHeight <= window.innerHeight - viewportPadding;
      const top = fitsBelow
        ? preferredTop
        : Math.max(viewportPadding, rect.top - menuHeight - offset);

      setMenuPosition({ top, left });
      return receiverId;
    });
  };

  const openSection = (receiverId, section) => {
    setExpandedReceiverId(receiverId);
    setOpenMenuByReceiverId(null);
    setMenuPosition(null);
    setActiveSectionByReceiverId((current) => ({
      ...current,
      [receiverId]: section,
    }));
  };

  const SectionTabs = ({ active, onSelect }) => (
    <>
      {Object.entries(sectionConfig).map(([section, config]) => {
        const isActive = active === section;
        const icon =
          section === "original" ? <BookOpen size={18} /> : section === "extra" ? <LibraryBig size={18} /> : <BookX size={18} />;

        return (
          <button
            key={section}
            type="button"
            onClick={() => onSelect(section)}
            className={`relative -mb-px flex min-w-[8rem] flex-col items-center gap-1 rounded-t-2xl border px-4 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "border-[var(--border)] border-b-white bg-white text-[var(--primary)]"
                : "border-transparent bg-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span className={`text-lg ${isActive ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}>
              {icon}
            </span>
            <span className="text-xs leading-tight">{config.label}</span>
          </button>
        );
      })}
    </>
  );

  const getDraft = (receiverId, section) =>
    bookDrafts[getDraftKey(receiverId, section)] ?? emptyBookDraft;

  const updateDraft = (receiverId, section, field, value) => {
    setBookDrafts((current) => ({
      ...current,
      [getDraftKey(receiverId, section)]: {
        ...(current[getDraftKey(receiverId, section)] ?? emptyBookDraft),
        [field]: value,
      },
    }));
  };

  const clearDraft = (receiverId, section) => {
    setBookDrafts((current) => ({
      ...current,
      [getDraftKey(receiverId, section)]: emptyBookDraft,
    }));
  };

  const setBookFormOpen = (receiverId, section, isOpen) => {
    setIsBookFormOpenByKey((current) => ({
      ...current,
      [getDraftKey(receiverId, section)]: isOpen,
    }));

    if (!isOpen) {
      clearDraft(receiverId, section);
    }
  };

  const isBookFormOpen = (receiverId, section) =>
    Boolean(isBookFormOpenByKey[getDraftKey(receiverId, section)]);

  const addInputBook = (section, event) => {
    event.preventDefault();

    const draft = getDraft(inputReceiverKey, section);
    const title = draft.title.trim();

    if (!title) {
      return;
    }

    const nextBook = {
      id: Date.now(),
      title,
      edition: draft.edition.trim(),
      publisher: draft.publisher.trim(),
      author: draft.author.trim(),
    };

    if (section === "extra") {
      setInputExtraBooks((current) => [...current, nextBook]);
    } else {
      setInputExcludedBooks((current) => [...current, nextBook]);
    }

    clearDraft(inputReceiverKey, section);
    setBookFormOpen(inputReceiverKey, section, false);
  };

  const removeInputBook = (section, bookId) => {
    if (section === "extra") {
      setInputExtraBooks((current) => current.filter((book) => book.id !== bookId));
    } else {
      setInputExcludedBooks((current) => current.filter((book) => book.id !== bookId));
    }
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
          receiver.id === editingId
            ? {
                ...receiver,
                ...form,
                extraBooks: inputExtraBooks,
                excludedBooks: inputExcludedBooks,
              }
            : receiver
        )
      );
    } else {
      setReceivers((current) => [
        {
          id: Date.now(),
          ...form,
          extraBooks: inputExtraBooks,
          excludedBooks: inputExcludedBooks,
        },
        ...current,
      ]);
    }

    resetForm();
  };

  const handleEdit = (receiver) => {
    setForm({
      name: receiver.name,
      its: receiver.its,
      phone: receiver.phone,
      school: receiver.school,
      className: receiver.className,
      subject: receiver.subject,
      parentName: receiver.parentName,
    });
    setEditingId(receiver.id);
    setInputExtraBooks(receiver.extraBooks ?? []);
    setInputExcludedBooks(receiver.excludedBooks ?? []);
    setInputActiveSection("original");
    setIsInputMode(true);
    setOpenMenuByReceiverId(null);
    setMenuPosition(null);

    setBookDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[getDraftKey(inputReceiverKey, "original")];
      delete nextDrafts[getDraftKey(inputReceiverKey, "extra")];
      delete nextDrafts[getDraftKey(inputReceiverKey, "excluded")];
      return nextDrafts;
    });

    setIsBookFormOpenByKey((current) => {
      const nextVisibility = { ...current };
      delete nextVisibility[getDraftKey(inputReceiverKey, "original")];
      delete nextVisibility[getDraftKey(inputReceiverKey, "extra")];
      delete nextVisibility[getDraftKey(inputReceiverKey, "excluded")];
      return nextVisibility;
    });
  };

  const handleRemove = (id) => {
    setReceivers((current) => current.filter((receiver) => receiver.id !== id));

    setBookDrafts((current) => {
      const nextDrafts = { ...current };
      delete nextDrafts[getDraftKey(id, "original")];
      delete nextDrafts[getDraftKey(id, "extra")];
      delete nextDrafts[getDraftKey(id, "excluded")];
      return nextDrafts;
    });

    setIsBookFormOpenByKey((current) => {
      const nextVisibility = { ...current };
      delete nextVisibility[getDraftKey(id, "original")];
      delete nextVisibility[getDraftKey(id, "extra")];
      delete nextVisibility[getDraftKey(id, "excluded")];
      return nextVisibility;
    });

    setActiveSectionByReceiverId((current) => {
      const nextSections = { ...current };
      delete nextSections[id];
      return nextSections;
    });

    setOpenMenuByReceiverId((current) => (current === id ? null : current));
    setMenuPosition(null);
    setExpandedReceiverId((current) => (current === id ? null : current));

    if (editingId === id) {
      resetForm();
    }
  };

  const confirmRemove = (receiver) => {
    setOpenMenuByReceiverId(null);
    setMenuPosition(null);
    if (window.confirm(`Delete ${receiver.name}? This cannot be undone.`)) {
      handleRemove(receiver.id);
    }
  };

  const addBook = (receiverId, section, event) => {
    event.preventDefault();

    const draft = getDraft(receiverId, section);
    const title = draft.title.trim();

    if (!title) {
      return;
    }

    const nextBook = {
      id: Date.now(),
      title,
      edition: draft.edition.trim(),
      publisher: draft.publisher.trim(),
      author: draft.author.trim(),
    };

    setReceivers((current) =>
      current.map((receiver) => {
        if (receiver.id !== receiverId) {
          return receiver;
        }

        const key = section === "extra" ? "extraBooks" : "excludedBooks";
        return { ...receiver, [key]: [...(receiver[key] ?? []), nextBook] };
      })
    );

    clearDraft(receiverId, section);
    setBookFormOpen(receiverId, section, false);
  };

  const removeBook = (receiverId, section, bookId) => {
    setReceivers((current) =>
      current.map((receiver) => {
        if (receiver.id !== receiverId) {
          return receiver;
        }

        const key = section === "extra" ? "extraBooks" : "excludedBooks";
        return {
          ...receiver,
          [key]: (receiver[key] ?? []).filter((book) => book.id !== bookId),
        };
      })
    );
  };

  const inputDraftSection = inputActiveSection === "excluded" ? "excluded" : "extra";
  const inputDraft = getDraft(inputReceiverKey, inputDraftSection);
  const inputShowAddRow =
    (inputActiveSection === "extra" || inputActiveSection === "excluded") &&
    isBookFormOpen(inputReceiverKey, inputActiveSection);
  const inputMatchingBooks = getMatchingBooks(form.school, form.className);

  const viewToggle = (
    <button
      type="button"
      onClick={() =>
        isInputMode
          ? resetForm()
          : startInputMode()
      }
      aria-pressed={isInputMode}
      className="relative inline-flex h-14 w-full max-w-[15rem] items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 sm:w-[15rem]"
    >
      <span
        className={`absolute h-12 w-[calc(50%-0.125rem)] rounded-full bg-[var(--primary)] transition-transform duration-300 ${
          isInputMode ? "translate-x-[calc(100%-0.25rem)]" : "translate-x-0"
        }`}
      />
      <span
        className={`relative z-10 flex-1 text-sm font-medium transition ${
          !isInputMode ? "text-white" : "text-[var(--text-muted)]"
        }`}
      >
        Records
      </span>
      <span
        className={`relative z-10 flex-1 text-sm font-medium transition ${
          isInputMode ? "text-white" : "text-[var(--text-muted)]"
        }`}
      >
        Input
      </span>
    </button>
  );

  return (
    <AdminShell title="Receivers" headerAction={viewToggle}>
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

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                {editingId !== null ? "Save Changes" : "Add Receiver"}
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-3 rounded-2xl border border-[var(--border)] bg-white p-4">
            {inputActiveSection === "original" ? (
              <>
                <div className="flex w-full flex-wrap items-end gap-1 border-b border-[var(--border)] px-1">
                  <SectionTabs active={inputActiveSection} onSelect={setInputActiveSection} />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-[var(--surface-strong)]">
                      <tr className="text-left text-sm text-[var(--text-muted)]">
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Edition</th>
                        <th className="px-4 py-3 font-semibold">Publisher</th>
                        <th className="px-4 py-3 font-semibold">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputMatchingBooks.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--text-muted)]"
                          >
                            No course record found for this school and class.
                          </td>
                        </tr>
                      ) : null}

                      {inputMatchingBooks.map((book) => (
                        <tr
                          key={book.id}
                          className="border-t border-[var(--border)] even:bg-[var(--surface-muted)]"
                        >
                          <td className="px-4 py-3 font-medium text-[var(--text)]">{book.title}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.edition || "-"}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.publisher || "-"}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.author || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}

            {inputActiveSection === "extra" || inputActiveSection === "excluded" ? (
              <>
                <div className="flex w-full items-end justify-between gap-3 border-b border-[var(--border)] px-1">
                  <div className="flex flex-wrap items-end gap-1">
                    <SectionTabs active={inputActiveSection} onSelect={setInputActiveSection} />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setBookFormOpen(
                        inputReceiverKey,
                        inputActiveSection,
                        !isBookFormOpen(inputReceiverKey, inputActiveSection)
                      )
                    }
                    className="mb-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                  >
                    {inputShowAddRow
                      ? "Cancel"
                      : `Add ${inputActiveSection === "extra" ? "Extra" : "Excluded"} Book`}
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-[var(--surface-strong)]">
                      <tr className="text-left text-sm text-[var(--text-muted)]">
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Edition</th>
                        <th className="px-4 py-3 font-semibold">Publisher</th>
                        <th className="px-4 py-3 font-semibold">Author</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(inputActiveSection === "extra" ? inputExtraBooks : inputExcludedBooks).length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--text-muted)]"
                          >
                            {sectionConfig[inputActiveSection].emptyMessage}
                          </td>
                        </tr>
                      ) : null}

                      {(inputActiveSection === "extra" ? inputExtraBooks : inputExcludedBooks).map((book) => (
                        <tr
                          key={book.id}
                          className="border-t border-[var(--border)] even:bg-[var(--surface-muted)]"
                        >
                          <td className="px-4 py-3 font-medium text-[var(--text)]">{book.title}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.edition || "-"}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.publisher || "-"}</td>
                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.author || "-"}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => removeInputBook(inputActiveSection, book.id)}
                              className="rounded-2xl border border-[rgba(166,61,53,0.22)] bg-[var(--danger-soft)] px-3 py-2 text-sm font-medium text-[var(--danger)] transition hover:bg-[#ffe7e5]"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}

                      {inputShowAddRow ? (
                        <tr className="border-t border-[var(--border)] bg-[var(--surface-muted)] align-middle">
                          <td className="px-4 py-3">
                            <input
                              value={inputDraft.title}
                              onChange={(event) =>
                                updateDraft(inputReceiverKey, inputDraftSection, "title", event.target.value)
                              }
                              className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                              placeholder="Title"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={inputDraft.edition}
                              onChange={(event) =>
                                updateDraft(inputReceiverKey, inputDraftSection, "edition", event.target.value)
                              }
                              className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                              placeholder="Edition"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={inputDraft.publisher}
                              onChange={(event) =>
                                updateDraft(inputReceiverKey, inputDraftSection, "publisher", event.target.value)
                              }
                              className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                              placeholder="Publisher"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={inputDraft.author}
                              onChange={(event) =>
                                updateDraft(inputReceiverKey, inputDraftSection, "author", event.target.value)
                              }
                              className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                              placeholder="Author"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={(event) => addInputBook(inputActiveSection, event)}
                              className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="relative overflow-x-auto bg-white">
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
                <th className="px-5 py-4 font-semibold lg:px-7">
                  <span className="sr-only">Controls</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {receivers.map((receiver) => {
                const activeSection = activeSectionByReceiverId[receiver.id] ?? null;
                const extraBooks = receiver.extraBooks ?? [];
                const excludedBooks = receiver.excludedBooks ?? [];
                const draftSection = activeSection === "excluded" ? "excluded" : "extra";
                const draft = getDraft(receiver.id, draftSection);
                const showAddRow =
                  (activeSection === "extra" || activeSection === "excluded") &&
                  isBookFormOpen(receiver.id, activeSection);
                const matchingBooks = getMatchingBooks(receiver.school, receiver.className);

                return (
                  <Fragment key={receiver.id}>
                    <tr className="border-t border-[var(--border)] align-top even:bg-[var(--surface-muted)]">
                      <td className="px-5 py-4 font-medium text-[var(--text)] lg:px-7">{receiver.name}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.its}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.phone}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.school}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.className}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.subject}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)] lg:px-7">{receiver.parentName}</td>
                      <td className="px-5 py-4 lg:px-7">
                        <div className="relative flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExpandedRow(receiver.id)}
                            aria-expanded={expandedReceiverId === receiver.id}
                            aria-label={
                              expandedReceiverId === receiver.id
                                ? "Collapse receiver details"
                                : "Expand receiver details"
                            }
                            className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                          >
                            {expandedReceiverId === receiver.id ? "▴" : "▾"}
                          </button>
                          <button
                            type="button"
                            onClick={(event) => toggleMenu(receiver.id, event)}
                            aria-expanded={openMenuByReceiverId === receiver.id}
                            aria-label="Open receiver menu"
                            className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                          >
                            ⋮
                          </button>

                          {openMenuByReceiverId === receiver.id ? (
                            <div
                              className="fixed z-[80] w-40 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-soft)]"
                              style={{ top: menuPosition?.top ?? 0, left: menuPosition?.left ?? 0 }}
                            >
                              <button
                                type="button"
                                onClick={() => handleEdit(receiver)}
                                className="block w-full px-4 py-3 text-left text-sm text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                onClick={() => confirmRemove(receiver)}
                                className="block w-full px-4 py-3 text-left text-sm text-[var(--danger)] transition hover:bg-[var(--danger-soft)]"
                              >
                                Delete
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>

                    {expandedReceiverId === receiver.id ? (
                      <tr className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
                        <td colSpan="8" className="px-5 py-5 lg:px-7">
                            {activeSection === "original" ? (
                            <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-white p-4">
                                <div className="flex w-full flex-wrap items-end gap-1 border-b border-[var(--border)] px-1">
                                  <SectionTabs
                                    active={activeSection}
                                    onSelect={(section) => openSection(receiver.id, section)}
                                  />
                                </div>

                                <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
                                  <table className="min-w-full border-collapse">
                                    <thead className="bg-[var(--surface-strong)]">
                                      <tr className="text-left text-sm text-[var(--text-muted)]">
                                        <th className="px-4 py-3 font-semibold">Title</th>
                                        <th className="px-4 py-3 font-semibold">Edition</th>
                                        <th className="px-4 py-3 font-semibold">Publisher</th>
                                        <th className="px-4 py-3 font-semibold">Author</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {matchingBooks.length === 0 ? (
                                        <tr>
                                          <td
                                            colSpan="4"
                                            className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--text-muted)]"
                                          >
                                            No course record found for this school and class.
                                          </td>
                                        </tr>
                                      ) : null}

                                      {matchingBooks.map((book) => (
                                        <tr
                                          key={book.id}
                                          className="border-t border-[var(--border)] even:bg-[var(--surface-muted)]"
                                        >
                                          <td className="px-4 py-3 font-medium text-[var(--text)]">{book.title}</td>
                                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.edition || "-"}</td>
                                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.publisher || "-"}</td>
                                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.author || "-"}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : null}

                            {activeSection === "extra" || activeSection === "excluded" ? (
                              <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-white p-4">
                                    <div className="flex w-full items-end justify-between gap-3 border-b border-[var(--border)] px-1">
                                      <div className="flex flex-wrap items-end gap-1">
                                        <SectionTabs
                                          active={activeSection}
                                          onSelect={(section) => openSection(receiver.id, section)}
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setBookFormOpen(
                                            receiver.id,
                                            activeSection,
                                            !isBookFormOpen(receiver.id, activeSection)
                                          )
                                        }
                                        className="mb-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-white"
                                      >
                                        {showAddRow
                                          ? "Cancel"
                                          : `Add ${activeSection === "extra" ? "Extra" : "Excluded"} Book`}
                                      </button>
                                    </div>

                                <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
                                  <table className="min-w-full border-collapse">
                                    <thead className="bg-[var(--surface-strong)]">
                                      <tr className="text-left text-sm text-[var(--text-muted)]">
                                        <th className="px-4 py-3 font-semibold">Title</th>
                                        <th className="px-4 py-3 font-semibold">Edition</th>
                                        <th className="px-4 py-3 font-semibold">Publisher</th>
                                        <th className="px-4 py-3 font-semibold">Author</th>
                                        <th className="px-4 py-3 font-semibold">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(activeSection === "extra" ? extraBooks : excludedBooks).length === 0 ? (
                                        <tr>
                                          <td
                                            colSpan="5"
                                            className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--text-muted)]"
                                          >
                                            {sectionConfig[activeSection].emptyMessage}
                                          </td>
                                        </tr>
                                      ) : null}

                                      {(activeSection === "extra" ? extraBooks : excludedBooks).map((book) => (
                                        <tr
                                          key={book.id}
                                          className="border-t border-[var(--border)] even:bg-[var(--surface-muted)]"
                                        >
                                          <td className="px-4 py-3 font-medium text-[var(--text)]">{book.title}</td>
                                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.edition || "-"}</td>
                                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.publisher || "-"}</td>
                                          <td className="px-4 py-3 text-[var(--text-muted)]">{book.author || "-"}</td>
                                          <td className="px-4 py-3">
                                            <button
                                              type="button"
                                              onClick={() => removeBook(receiver.id, activeSection, book.id)}
                                              className="rounded-2xl border border-[rgba(166,61,53,0.22)] bg-[var(--danger-soft)] px-3 py-2 text-sm font-medium text-[var(--danger)] transition hover:bg-[#ffe7e5]"
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      ))}

                                      {showAddRow ? (
                                      <tr className="border-t border-[var(--border)] bg-[var(--surface-muted)] align-middle">
                                        <td className="px-4 py-3">
                                          <input
                                            value={draft.title}
                                            onChange={(event) =>
                                              updateDraft(
                                                receiver.id,
                                                draftSection,
                                                "title",
                                                event.target.value
                                              )
                                            }
                                            className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                                            placeholder="Title"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            value={draft.edition}
                                            onChange={(event) =>
                                              updateDraft(
                                                receiver.id,
                                                draftSection,
                                                "edition",
                                                event.target.value
                                              )
                                            }
                                            className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                                            placeholder="Edition"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            value={draft.publisher}
                                            onChange={(event) =>
                                              updateDraft(
                                                receiver.id,
                                                draftSection,
                                                "publisher",
                                                event.target.value
                                              )
                                            }
                                            className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                                            placeholder="Publisher"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            value={draft.author}
                                            onChange={(event) =>
                                              updateDraft(
                                                receiver.id,
                                                draftSection,
                                                "author",
                                                event.target.value
                                              )
                                            }
                                            className="w-full rounded-2xl border border-[var(--border)] bg-white px-3 py-2 outline-none transition focus:border-[var(--primary)]"
                                            placeholder="Author"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <button
                                            type="button"
                                            onClick={(event) => addBook(receiver.id, activeSection, event)}
                                            className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
                                          >
                                            Add
                                          </button>
                                        </td>
                                      </tr>
                                      ) : null}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : null}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}

export default Receivers;