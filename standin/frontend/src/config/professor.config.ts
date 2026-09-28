export interface ProfessorConfig {
  name: string;
  initials: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  officeHours: string;
  freeWindowWeekly: string;
  bio: string;
  coursesTaught: string[];
  primarySubject: string;
  avatarBgColor: string;
  taglinePrimary: string;
  taglineSecondary: string;
}

export const defaultProfessor: ProfessorConfig = {
  name: "Dr. Ahmed",
  initials: "DA",
  title: "Associate Professor of Computer Science",
  department: "Department of Computer Science",
  institution: "Faculty of Engineering & Technology",
  email: "m.saleem@duet.edu.pk",
  officeHours: "Tuesday & Thursday: 2:00 PM – 4:00 PM",
  freeWindowWeekly: "3 to 4 hours weekly",
  bio: "Senior educator with extensive classroom teaching in Object-Oriented Programming, Data Structures, and Software Engineering. Curated and reviewed all course slide materials and academic judgement policies.",
  coursesTaught: [
    "Object-Oriented Programming (Java)",
    "Programming Fundamentals",
    "Data Structures & Algorithms",
    "Theory of Automata",
    "Design & Analysis of Algorithms"
  ],
  primarySubject: "Object-Oriented Programming (Java)",
  avatarBgColor: "#372E31",
  taglinePrimary: "Your professor, when you need guidance.",
  taglineSecondary: "Ask. Learn. Understand."
};
