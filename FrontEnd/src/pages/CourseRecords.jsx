import { useState } from "react";
import AdminShell from "../components/AdminShell";

const initialSchools = [
  {
    id: 1,
    name: "MSB Educational Institute",
    classes: [
      {
        id: 11,
        className: "Class 8",
        courses: ["Mathematics", "General Science", "English", "Urdu"],
      },
      {
        id: 12,
        className: "Class 10",
        courses: ["Physics", "Chemistry", "Biology"],
      },
    ],
  },
  {
    id: 2,
    name: "Burhani Academy",
    classes: [
      {
        id: 21,
        className: "Class 6",
        courses: ["Mathematics", "Islamiyat", "English"],
      },
    ],
  },
];

const emptySchool = { name: "" };
const emptyClass = { schoolId: "", className: "", courses: "" };

function CourseRecords() {
  const [schools, setSchools] = useState(initialSchools);
  const [schoolForm, setSchoolForm] = useState(emptySchool);
  const [classForm, setClassForm] = useState(emptyClass);
  const [isInputMode, setIsInputMode] = useState(false);

  const handleSchoolSubmit = (event) => {
    event.preventDefault();

    if (!schoolForm.name) {
      return;
    }

    setSchools((current) => [
      ...current,
      { id: Date.now(), name: schoolForm.name, classes: [] },
    ]);
    setSchoolForm(emptySchool);
    setIsInputMode(false);
  };

  const handleClassSubmit = (event) => {
    event.preventDefault();

    if (!classForm.schoolId || !classForm.className) {
      return;
    }

    const parsedCourses = classForm.courses
      .split(",")
      .map((course) => course.trim())
      .filter(Boolean);

    setSchools((current) =>
      current.map((school) =>
        school.id === Number(classForm.schoolId)
          ? {
              ...school,
              classes: [
                ...school.classes,
                {
                  id: Date.now(),
                  className: classForm.className,
                  courses: parsedCourses,
                },
              ],
            }
          : school
      )
    );

    setClassForm(emptyClass);
    setIsInputMode(false);
  };

  const removeSchool = (id) => {
    setSchools((current) => current.filter((school) => school.id !== id));
  };

  const removeClass = (schoolId, classId) => {
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
  };

  const viewToggle = (
    <button
      type="button"
      onClick={() => setIsInputMode((current) => !current)}
      aria-pressed={isInputMode}
      className="relative inline-flex h-14 w-full max-w-[15rem] items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 sm:w-[15rem]"
    >
      <span
        className={`absolute h-12 w-[calc(50%-0.125rem)] rounded-full bg-[var(--primary)] transition-transform duration-300 ${
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
      title="Course Records"
      headerAction={viewToggle}
    >
      {isInputMode ? (
        <div className="grid gap-6 bg-[var(--surface-muted)] px-5 py-6 lg:grid-cols-2 lg:px-7">
          <section className="rounded-3xl border border-[var(--border)] bg-white px-5 py-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                Add School
              </h3>
              <button
                type="button"
                onClick={() => setSchoolForm(emptySchool)}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-white"
              >
                Clear
              </button>
            </div>
            <form onSubmit={handleSchoolSubmit} className="mt-5 flex flex-col gap-4">
              <input
                value={schoolForm.name}
                onChange={(event) => setSchoolForm({ name: event.target.value })}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                placeholder="Enter school name"
              />
              <button
                type="submit"
                className="self-end rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                Save School
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-[var(--border)] bg-white px-5 py-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                Add Class Record
              </h3>
              <button
                type="button"
                onClick={() => setClassForm(emptyClass)}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-white"
              >
                Clear
              </button>
            </div>
            <form onSubmit={handleClassSubmit} className="mt-5 grid gap-4">
              <div>
                <label className="text-sm font-medium text-[var(--text)]" htmlFor="schoolId">
                  School
                </label>
                <select
                  id="schoolId"
                  value={classForm.schoolId}
                  onChange={(event) =>
                    setClassForm((current) => ({
                      ...current,
                      schoolId: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                >
                  <option value="">Select school</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--text)]" htmlFor="className">
                  Class
                </label>
                <input
                  id="className"
                  value={classForm.className}
                  onChange={(event) =>
                    setClassForm((current) => ({
                      ...current,
                      className: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                  placeholder="Enter class"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--text)]" htmlFor="courses">
                  Courses
                </label>
                <textarea
                  id="courses"
                  value={classForm.courses}
                  onChange={(event) =>
                    setClassForm((current) => ({
                      ...current,
                      courses: event.target.value,
                    }))
                  }
                  rows="4"
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:bg-white"
                  placeholder="Enter courses separated by commas"
                />
              </div>

              <button
                type="submit"
                className="justify-self-end rounded-2xl bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-strong)]"
              >
                Save Class Record
              </button>
            </form>
          </section>
        </div>
      ) : (
        <div className="space-y-5 bg-[var(--surface-muted)] px-5 py-5 lg:px-7">
          {schools.map((school) => (
            <article
              key={school.id}
              className="rounded-3xl border border-[var(--border)] bg-white shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text)]">{school.name}</h2>
                <button
                  type="button"
                  onClick={() => removeSchool(school.id)}
                  className="rounded-2xl border border-[rgba(166,61,53,0.22)] bg-[var(--danger-soft)] px-4 py-2 text-sm font-medium text-[var(--danger)] transition hover:bg-[#ffe7e5]"
                >
                  Remove School
                </button>
              </div>

              <div className="space-y-4 px-5 py-5">
                {school.classes.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">
                    No classes added yet for this school.
                  </p>
                ) : (
                  school.classes.map((classEntry) => (
                    <div
                      key={classEntry.id}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-[var(--text)]">
                            {classEntry.className}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                            {classEntry.courses.length > 0
                              ? classEntry.courses.join(", ")
                              : "No courses recorded"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeClass(school.id, classEntry.id)}
                          className="rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
                        >
                          Remove Class
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

export default CourseRecords;
