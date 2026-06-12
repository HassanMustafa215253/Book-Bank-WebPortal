import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import {
  loadCourseRecords,
  saveCourseRecords,
} from "../data/courseRecordsData";

const emptyClassDraft = { className: "" };
const emptyBookDraft = { title: "", edition: "", publisher: "", author: "" };

function CourseRecords() {
  const [schools, setSchools] = useState(() => loadCourseRecords());
  const [classDrafts, setClassDrafts] = useState({});
  const [visibleClassForms, setVisibleClassForms] = useState({});
  const [rowDrafts, setRowDrafts] = useState({});
  const [visibleRowForms, setVisibleRowForms] = useState({});
  const [editingClasses, setEditingClasses] = useState({});
  const [openMenu, setOpenMenu] = useState(null);

  const [schoolDraft, setSchoolDraft] = useState("");
  const [visibleSchoolForm, setVisibleSchoolForm] = useState(false);

  useEffect(() => {
    saveCourseRecords(schools);
  }, [schools]);

  const getClassDraft = (schoolId) =>
    classDrafts[schoolId] ?? emptyClassDraft;

  const getRowDraft = (classId) => rowDrafts[classId] ?? emptyBookDraft;

  const updateClassDraft = (schoolId, value) => {
    setClassDrafts((current) => ({
      ...current,
      [schoolId]: { className: value },
    }));
  };

  const updateRowDraft = (classId, field, value) => {
    setRowDrafts((current) => ({
      ...current,
      [classId]: {
        ...(current[classId] ?? emptyBookDraft),
        [field]: value,
      },
    }));
  };

  const showClassForm = (schoolId) => {
    setVisibleClassForms((current) => ({ ...current, [schoolId]: true }));
    setClassDrafts((current) => ({
      ...current,
      [schoolId]: current[schoolId] ?? emptyClassDraft,
    }));
    setOpenMenu(null);
  };

  const updateSchoolDraft = (value) => setSchoolDraft(value);

  const showSchoolForm = () => {
    setVisibleSchoolForm(true);
    setSchoolDraft("");
    setOpenMenu(null);
  };

  const hideSchoolForm = () => {
    setVisibleSchoolForm(false);
    setSchoolDraft("");
  };

  const addSchool = (event) => {
    event.preventDefault();
    const name = schoolDraft.trim();
    if (!name) return;
    setSchools((current) =>
      current.some((s) => s.name.toLowerCase() === name.toLowerCase())
        ? current
        : [...current, { id: Date.now(), name, classes: [] }]
    );
    hideSchoolForm();
  };

  const hideClassForm = (schoolId) => {
    setVisibleClassForms((current) => ({ ...current, [schoolId]: false }));
    setClassDrafts((current) => ({ ...current, [schoolId]: emptyClassDraft }));
  };

  const showRowForm = (classId) => {
    setVisibleRowForms((current) => ({ ...current, [classId]: true }));
    setRowDrafts((current) => ({
      ...current,
      [classId]: current[classId] ?? emptyBookDraft,
    }));
    setOpenMenu(null);
  };

  const hideRowForm = (classId) => {
    setVisibleRowForms((current) => ({ ...current, [classId]: false }));
    setRowDrafts((current) => ({ ...current, [classId]: emptyBookDraft }));
  };

  const addClass = (event, schoolId) => {
    event.preventDefault();

    const className = getClassDraft(schoolId).className.trim();

    if (!className) {
      return;
    }

    setSchools((current) =>
      current.map((school) =>
        school.id === schoolId
          ? {
              ...school,
              classes: school.classes.some(
                (classEntry) =>
                  classEntry.className.toLowerCase() === className.toLowerCase()
              )
                ? school.classes
                : [
                    ...school.classes,
                    { id: Date.now(), className, books: [] },
                  ],
            }
          : school
      )
    );

    hideClassForm(schoolId);
  };

  const addRow = (event, schoolId, classId) => {
    event.preventDefault();

    const draft = getRowDraft(classId);
    const title = draft.title.trim();
    const edition = draft.edition.trim();
    const publisher = draft.publisher.trim();
    const author = draft.author.trim();

    if (!title) {
      return;
    }

    setSchools((current) =>
      current.map((school) =>
        school.id === schoolId
          ? {
              ...school,
              classes: school.classes.map((classEntry) =>
                classEntry.id === classId
                  ? {
                      ...classEntry,
                      books: [
                        ...classEntry.books,
                        { id: Date.now(), title, edition, publisher, author },
                      ],
                    }
                  : classEntry
              ),
            }
          : school
      )
    );

    hideRowForm(classId);
  };

  const updateBook = (schoolId, classId, bookId, field, value) => {
    setSchools((current) =>
      current.map((school) =>
        school.id === schoolId
          ? {
              ...school,
              classes: school.classes.map((classEntry) =>
                classEntry.id === classId
                  ? {
                      ...classEntry,
                      books: classEntry.books.map((book) =>
                        book.id === bookId ? { ...book, [field]: value } : book
                      ),
                    }
                  : classEntry
              ),
            }
          : school
      )
    );
  };

  const removeSchool = (id) => {
    if (!window.confirm("Delete this school and all of its classes and books?")) {
      return;
    }

    setSchools((current) => current.filter((school) => school.id !== id));
    setOpenMenu(null);
  };

  const removeClass = (schoolId, classId) => {
    if (!window.confirm("Delete this class and all of its books?")) {
      return;
    }

    setSchools((current) =>
      current.map((school) =>
        school.id === schoolId
          ? {
              ...school,
              classes: school.classes.filter(
                (classEntry) => classEntry.id !== classId
              ),
            }
          : school
      )
    );
    setOpenMenu(null);
  };

  const removeBook = (schoolId, classId, bookId) => {
    setSchools((current) =>
      current.map((school) =>
        school.id === schoolId
          ? {
              ...school,
              classes: school.classes.map((classEntry) =>
                classEntry.id === classId
                  ? {
                      ...classEntry,
                      books: classEntry.books.filter(
                        (book) => book.id !== bookId
                      ),
                    }
                  : classEntry
              ),
            }
          : school
      )
    );
    setOpenMenu(null);
  };

  const toggleEditRows = (classId) => {
    setEditingClasses((current) => ({
      ...current,
      [classId]: !current[classId],
    }));
    setOpenMenu(null);
  };

  const toggleMenu = (key) => {
    setOpenMenu((current) => (current === key ? null : key));
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        event.target instanceof Element &&
        !event.target.closest("[data-menu-root]")
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const menuButtonClass =
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-lg leading-none font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)]";

  const menuPanelClass =
    "absolute right-0 top-11 z-20 min-w-44 overflow-hidden rounded-2xl border border-[var(--border)] bg-white py-1 shadow-[var(--shadow-soft)]";

  const menuItemClass =
    "block w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-muted)]";

  const dangerMenuItemClass =
    "block w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--danger)] transition hover:bg-[var(--danger-soft)]";

  const inputClass =
    "w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)]";

  return (
    <AdminShell
      title="Course Records"
      subtitle="Map each school and class to the exact book details required."
    >
      <div className="space-y-5 bg-[var(--surface-muted)] px-5 py-5 lg:px-7">
        {schools.map((school) => (
          <article
            key={school.id}
            className="overflow-visible rounded-3xl border border-[var(--border)] bg-white shadow-sm"
          >
            <div className="flex flex-col gap-3 border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                {school.name}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showClassForm(school.id)}
                  className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
                >
                  Add Class
                </button>
                <div className="relative" data-menu-root>
                  <button
                    type="button"
                    onClick={() => toggleMenu(`school-${school.id}`)}
                    className={menuButtonClass}
                    aria-label={`Open menu for ${school.name}`}
                  >
                    ⋮
                  </button>
                  {openMenu === `school-${school.id}` ? (
                    <div className={menuPanelClass}>
                      <button
                        type="button"
                        onClick={() => removeSchool(school.id)}
                        className={dangerMenuItemClass}
                      >
                        Remove school
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="space-y-4 px-5 py-5">
              {visibleClassForms[school.id] ? (
                <form
                  onSubmit={(event) => addClass(event, school.id)}
                  className="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <input
                    value={getClassDraft(school.id).className}
                    onChange={(event) =>
                      updateClassDraft(school.id, event.target.value)
                    }
                    className={inputClass}
                    placeholder="Enter class"
                    aria-label={`New class for ${school.name}`}
                  />
                  <button
                    type="submit"
                    className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
                  >
                    Save Class
                  </button>
                  <button
                    type="button"
                    onClick={() => hideClassForm(school.id)}
                    className="rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)]"
                  >
                    Cancel
                  </button>
                </form>
              ) : null}

              {school.classes.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)]">
                  No classes added yet for this school.
                </p>
              ) : (
                school.classes.map((classEntry) => {
                  const isEditingRows = Boolean(editingClasses[classEntry.id]);

                  return (
                    <div
                      key={classEntry.id}
                      className="overflow-visible rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]"
                    >
                      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xl font-semibold text-[var(--text)]">
                            {classEntry.className}
                          </p>
                          <span className="text-sm text-[var(--text-muted)]">
                            |
                          </span>
                          <p className="text-sm text-[var(--text-muted)]">
                            {classEntry.books.length} book
                            {classEntry.books.length === 1 ? "" : "s"} recorded
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => showRowForm(classEntry.id)}
                            className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
                          >
                            Add Row
                          </button>
                          <div className="relative" data-menu-root>
                            <button
                              type="button"
                              onClick={() =>
                                toggleMenu(`class-${classEntry.id}`)
                              }
                              className={menuButtonClass}
                              aria-label={`Open menu for ${classEntry.className}`}
                            >
                              ⋮
                            </button>
                            {openMenu === `class-${classEntry.id}` ? (
                              <div className={menuPanelClass}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleEditRows(classEntry.id)
                                  }
                                  className={menuItemClass}
                                >
                                  {isEditingRows
                                    ? "Finish editing"
                                    : "Edit rows"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeClass(school.id, classEntry.id)
                                  }
                                  className={dangerMenuItemClass}
                                >
                                  Delete class
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto border-t border-[var(--border)] bg-white">
                        <table className="min-w-full border-collapse">
                          <thead className="bg-[var(--surface-strong)]">
                            <tr className="text-left text-sm text-[var(--text-muted)]">
                              <th className="px-4 py-3 font-semibold">
                                Title
                              </th>
                              <th className="px-4 py-3 font-semibold">
                                Edition
                              </th>
                              <th className="px-4 py-3 font-semibold">
                                Publisher
                              </th>
                              <th className="px-4 py-3 font-semibold">
                                Author
                              </th>
                              <th className="w-16 px-4 py-3 font-semibold">
                                <span className="sr-only">Menu</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {classEntry.books.length === 0 &&
                            !visibleRowForms[classEntry.id] ? (
                              <tr>
                                <td
                                  colSpan="5"
                                  className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--text-muted)]"
                                >
                                  No books recorded for this class yet.
                                </td>
                              </tr>
                            ) : null}

                            {classEntry.books.map((book) => (
                              <tr
                                key={book.id}
                                className="border-t border-[var(--border)] align-middle even:bg-[var(--surface-muted)]"
                              >
                                <td className="px-4 py-3 font-medium text-[var(--text)]">
                                  {isEditingRows ? (
                                    <input
                                      value={book.title}
                                      onChange={(event) =>
                                        updateBook(
                                          school.id,
                                          classEntry.id,
                                          book.id,
                                          "title",
                                          event.target.value
                                        )
                                      }
                                      className={inputClass}
                                      aria-label="Title"
                                    />
                                  ) : (
                                    book.title
                                  )}
                                </td>
                                <td className="px-4 py-3 text-[var(--text-muted)]">
                                  {isEditingRows ? (
                                    <input
                                      value={book.edition}
                                      onChange={(event) =>
                                        updateBook(
                                          school.id,
                                          classEntry.id,
                                          book.id,
                                          "edition",
                                          event.target.value
                                        )
                                      }
                                      className={inputClass}
                                      aria-label="Edition"
                                    />
                                  ) : (
                                    book.edition || "-"
                                  )}
                                </td>
                                <td className="px-4 py-3 text-[var(--text-muted)]">
                                  {isEditingRows ? (
                                    <input
                                      value={book.publisher}
                                      onChange={(event) =>
                                        updateBook(
                                          school.id,
                                          classEntry.id,
                                          book.id,
                                          "publisher",
                                          event.target.value
                                        )
                                      }
                                      className={inputClass}
                                      aria-label="Publisher"
                                    />
                                  ) : (
                                    book.publisher || "-"
                                  )}
                                </td>
                                <td className="px-4 py-3 text-[var(--text-muted)]">
                                  {isEditingRows ? (
                                    <input
                                      value={book.author}
                                      onChange={(event) =>
                                        updateBook(
                                          school.id,
                                          classEntry.id,
                                          book.id,
                                          "author",
                                          event.target.value
                                        )
                                      }
                                      className={inputClass}
                                      aria-label="Author"
                                    />
                                  ) : (
                                    book.author || "-"
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative flex justify-end" data-menu-root>
                                    <button
                                      type="button"
                                      onClick={() => toggleMenu(`book-${book.id}`)}
                                      className={menuButtonClass}
                                      aria-label={`Open menu for ${book.title}`}
                                    >
                                      ⋮
                                    </button>
                                    {openMenu === `book-${book.id}` ? (
                                      <div className={menuPanelClass}>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeBook(
                                              school.id,
                                              classEntry.id,
                                              book.id
                                            )
                                          }
                                          className={dangerMenuItemClass}
                                        >
                                          Delete row
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                </td>
                              </tr>
                            ))}

                            {visibleRowForms[classEntry.id] ? (
                              <tr className="border-t border-[var(--border)] bg-[var(--surface-muted)] align-middle">
                                <td className="px-4 py-3">
                                  <input
                                    value={getRowDraft(classEntry.id).title}
                                    onChange={(event) =>
                                      updateRowDraft(
                                        classEntry.id,
                                        "title",
                                        event.target.value
                                      )
                                    }
                                    className={inputClass}
                                    placeholder="Title"
                                    aria-label="New row title"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={getRowDraft(classEntry.id).edition}
                                    onChange={(event) =>
                                      updateRowDraft(
                                        classEntry.id,
                                        "edition",
                                        event.target.value
                                      )
                                    }
                                    className={inputClass}
                                    placeholder="Edition"
                                    aria-label="New row edition"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={getRowDraft(classEntry.id).publisher}
                                    onChange={(event) =>
                                      updateRowDraft(
                                        classEntry.id,
                                        "publisher",
                                        event.target.value
                                      )
                                    }
                                    className={inputClass}
                                    placeholder="Publisher"
                                    aria-label="New row publisher"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={getRowDraft(classEntry.id).author}
                                    onChange={(event) =>
                                      updateRowDraft(
                                        classEntry.id,
                                        "author",
                                        event.target.value
                                      )
                                    }
                                    className={inputClass}
                                    placeholder="Author"
                                    aria-label="New row author"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <form
                                    onSubmit={(event) =>
                                      addRow(event, school.id, classEntry.id)
                                    }
                                    className="flex flex-col gap-2 sm:flex-row sm:justify-end"
                                  >
                                    <button
                                      type="submit"
                                      className="rounded-xl bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => hideRowForm(classEntry.id)}
                                      className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)]"
                                    >
                                      Cancel
                                    </button>
                                  </form>
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </article>
        ))}

        <div className="flex items-center justify-center">
          {visibleSchoolForm ? (
            <form onSubmit={addSchool} className="flex items-center gap-2 w-full max-w-md">
              <input
                value={schoolDraft}
                onChange={(e) => updateSchoolDraft(e.target.value)}
                className={inputClass}
                placeholder="School name"
                aria-label="New school name"
              />
              <button
                type="submit"
                className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={hideSchoolForm}
                className="rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)]"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={showSchoolForm}
              className="rounded-2xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
            >
              Add School
            </button>
          )}
        </div>

      </div>
    </AdminShell>
  );
}

export default CourseRecords;
