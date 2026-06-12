export const COURSE_RECORDS_STORAGE_KEY = "book-bank-course-records";

export const initialSchools = [
  {
    id: 1,
    name: "MSB Educational Institute",
    classes: [
      {
        id: 11,
        className: "Class 8",
        books: [
          {
            id: 111,
            title: "Algebra for Beginners",
            edition: "2024",
            publisher: "Oxford",
            author: "A. Khan",
          },
          {
            id: 112,
            title: "Exploring Science",
            edition: "2023",
            publisher: "Pearson",
            author: "S. Ahmed",
          },
        ],
      },
      {
        id: 12,
        className: "Class 10",
        books: [
          {
            id: 121,
            title: "Foundations of Physics",
            edition: "2024",
            publisher: "Cambridge",
            author: "R. Ali",
          },
        ],
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
        books: [
          {
            id: 211,
            title: "Islamiyat for Middle School",
            edition: "2nd",
            publisher: "Al-Huda",
            author: "M. Farooq",
          },
        ],
      },
    ],
  },
];

export const loadCourseRecords = () => {
  try {
    const storedValue = window.localStorage.getItem(COURSE_RECORDS_STORAGE_KEY);

    if (!storedValue) {
      return initialSchools;
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : initialSchools;
  } catch {
    return initialSchools;
  }
};

export const saveCourseRecords = (schools) => {
  window.localStorage.setItem(
    COURSE_RECORDS_STORAGE_KEY,
    JSON.stringify(schools)
  );
};