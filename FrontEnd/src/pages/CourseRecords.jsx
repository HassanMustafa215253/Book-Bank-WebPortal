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
  const [isSchoolFormOpen, setIsSchoolFormOpen] = useState(false);
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);

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
    setIsSchoolFormOpen(false);
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
    setIsClassFormOpen(false);
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

  return (
    <AdminShell
      title="Course Records"
      subtitle="Track schools, add classes only when needed, and store the courses attached to each class."
    >
      <div className="border-b border-[#dccabd] bg-[#ecdacc] px-5 py-5 lg:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setIsSchoolFormOpen((current) => !current)}
            className="border border-[#6f4e37] bg-[#6f4e37] px-5 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
          >
            {isSchoolFormOpen ? "Close Add School" : "Add School"}
          </button>
          <button
            type="button"
            onClick={() => setIsClassFormOpen((current) => !current)}
            className="border border-[#8b6a53] bg-[#f8ede2] px-5 py-3 text-sm text-[#5d4334] transition hover:bg-[#ecd8c8]"
          >
            {isClassFormOpen ? "Close Add Class" : "Add Class"}
          </button>
        </div>
      </div>

      {isSchoolFormOpen && (
        <div className="border-b border-[#dccabd] bg-[#e6d2c1] px-5 py-5 lg:px-6">
          <h2 className="font-serif text-2xl text-[#35251d]">Add School</h2>
          <form onSubmit={handleSchoolSubmit} className="mt-5 flex flex-col gap-4 sm:flex-row">
            <input
              value={schoolForm.name}
              onChange={(event) => setSchoolForm({ name: event.target.value })}
              className="w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
              placeholder="Enter school name"
            />
            <button
              type="submit"
              className="border border-[#6f4e37] bg-[#6f4e37] px-6 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
            >
              Save School
            </button>
          </form>
        </div>
      )}

      {isClassFormOpen && (
        <div className="border-b border-[#dccabd] bg-[#dfcab8] px-5 py-5 lg:px-6">
          <h2 className="font-serif text-2xl text-[#35251d]">Add Class Record</h2>
          <form onSubmit={handleClassSubmit} className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <label className="text-sm text-[#5b4132]" htmlFor="schoolId">
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
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
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
              <label className="text-sm text-[#5b4132]" htmlFor="className">
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
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter class"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-sm text-[#5b4132]" htmlFor="courses">
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
                rows="3"
                className="mt-2 w-full border border-[#c7ad99] bg-[#fff8f1] px-4 py-3 outline-none transition focus:border-[#6f4e37]"
                placeholder="Enter courses separated by commas"
              />
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button
                type="submit"
                className="border border-[#6f4e37] bg-[#6f4e37] px-6 py-3 text-sm text-white transition hover:bg-[#5a3f31]"
              >
                Save Class Record
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-5 bg-[#fdf7f0] px-5 py-5 lg:px-6">
        {schools.map((school) => (
          <article
            key={school.id}
            className="border border-[#d8c4b4] bg-[#fff8f1] shadow-sm"
          >
            <div className="flex flex-col gap-3 border-b border-[#e6d7ca] bg-[#f2e3d5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-serif text-2xl text-[#35251d]">{school.name}</h2>
              <button
                type="button"
                onClick={() => removeSchool(school.id)}
                className="border border-[#c8917b] bg-[#fff4ef] px-4 py-2 text-sm text-[#8a3c2f] transition hover:bg-[#f2d8cf]"
              >
                Remove School
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              {school.classes.length === 0 ? (
                <p className="text-sm text-[#7b5d49]">
                  No classes added yet for this school.
                </p>
              ) : (
                school.classes.map((classEntry) => (
                  <div
                    key={classEntry.id}
                    className="border border-[#e1d0c2] bg-[#fbf3ea] p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-[#35251d]">
                          {classEntry.className}
                        </p>
                        <p className="mt-1 text-sm text-[#6d4e3d]">
                          {classEntry.courses.length > 0
                            ? classEntry.courses.join(", ")
                            : "No courses recorded"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeClass(school.id, classEntry.id)}
                        className="border border-[#bca18c] bg-[#f8ede2] px-4 py-2 text-sm text-[#5d4334] transition hover:bg-[#ecd8c8]"
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
    </AdminShell>
  );
}

export default CourseRecords;
