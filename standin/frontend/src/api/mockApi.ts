import type { AskResponse, RuleItem, ReviewsListResponse, HealthResponse } from './types';

export const MOCK_RULES: RuleItem[] = [
  {
    cat: 'Academic integrity',
    why: "I can't write assignment or project code, or help get past plagiarism checks.",
    do: "I can explain the concept behind it, suggest tools, or clarify the general assignment guidelines. Try asking about the concept instead."
  },
  {
    cat: 'Exam protection',
    why: "I can't share or solve actual exam questions, past, current or future.",
    do: "I can explain the underlying topics so you can prepare properly."
  },
  {
    cat: 'Grading',
    why: "I can't round up grades or grant regrade or re-evaluation requests.",
    do: "Grades stand as recorded. Follow the official university process if you believe there was a recording error."
  },
  {
    cat: 'Official documents',
    why: "I can't write or promise recommendation letters.",
    do: "Request it from the professor in person during office hours. The weekly counseling window is 3 to 4 hours."
  },
  {
    cat: 'Marks policy',
    why: "Extra projects don't earn extra marks or a CGPA boost.",
    do: "They do improve your learning and practical skills, so they are still worth doing if you're curious."
  },
  {
    cat: 'Privacy',
    why: "I can't share scores or academic records of other students.",
    do: "You can discuss your own results with the professor directly."
  },
  {
    cat: 'Missed exam / medical',
    why: "I can't approve retakes or medical exemptions myself.",
    do: "Any leniency requires an official emergency letter from a recognized hospital, submitted through the university registrar."
  }
];

export const MOCK_TOPICS = [
  {
    id: 'curriculum',
    title: 'Curriculum & Marks',
    category: 'Academic',
    icon: 'GraduationCap',
    description: '3+1 credit hours distribution: Theory (100) and Practical (50).',
    suggestedQuery: 'What is the marks distribution for OOP Java?'
  },
  {
    id: 'teaching',
    title: 'Lecture Slides & Notes',
    category: 'Teaching',
    icon: 'Presentation',
    description: 'OOP pillars, class fundamentals, and slide summaries.',
    suggestedQuery: 'What are the main topics covered in the OOP lectures?'
  },
  {
    id: 'readings',
    title: 'Recommended Textbooks',
    category: 'Academic',
    icon: 'BookOpen',
    description: 'Official course literature, online Java tutorials, and reading assignments.',
    suggestedQuery: 'Which books or tutorials does the professor recommend?'
  },
  {
    id: 'mentorship',
    title: 'Student Guidance & Advice',
    category: 'Advice',
    icon: 'HeartHandshake',
    description: 'Problem-solving mindsets, analytical thinking, and beginner advice.',
    suggestedQuery: 'Who can learn this Java course?'
  },
  {
    id: 'experience',
    title: 'Industry & Development Tools',
    category: 'Experience',
    icon: 'Briefcase',
    description: 'IDE recommendations (IntelliJ, VS Code, NetBeans) and JDK setup.',
    suggestedQuery: 'Which IDE should I use for Java assignments?'
  },
  {
    id: 'policies',
    title: 'University & Department Policies',
    category: 'Academic',
    icon: 'Building2',
    description: 'Course policies, attendance guidelines, and academic integrity.',
    suggestedQuery: 'What is the policy regarding assignment deadlines?'
  },
  {
    id: 'office-hours',
    title: 'Office Hours & Counseling',
    category: 'Advice',
    icon: 'MessageSquare',
    description: 'Free weekly window (3 to 4 hours) and booking appointments.',
    suggestedQuery: 'How can I contact the professor for personal counseling?'
  },
  {
    id: 'oop-concepts',
    title: 'Core OOP: Encapsulation & Inheritance',
    category: 'Teaching',
    icon: 'Lightbulb',
    description: 'Aggregation vs Composition, polymorphism analogies, and JVM architecture.',
    suggestedQuery: 'What is the difference between aggregation and composition?'
  }
];

export async function mockAsk(question: string): Promise<AskResponse> {
  const q = question.toLowerCase();

  // Simulate realistic network delay (350ms)
  await new Promise(r => setTimeout(r, 350));

  // Check escalation rules
  if (q.includes('assignment code') || q.includes('solve my project') || q.includes('do my homework') || q.includes('cheat') || q.includes('plagiar')) {
    return {
      type: 'esc',
      cat: 'Academic integrity',
      text: "I can't write assignment or project code, or help get past plagiarism checks.\n\nI can explain the concept behind it, suggest tools, or clarify the general assignment guidelines. Try asking about the concept instead.",
      sources: ['Stop rule: Academic integrity']
    };
  }

  if (q.includes('exam') && (q.includes('leak') || q.includes('paper') || q.includes('question') || q.includes('cheat'))) {
    return {
      type: 'esc',
      cat: 'Exam protection',
      text: "I can't share or solve actual exam questions, past, current or future.\n\nI can explain the underlying topics so you can prepare properly.",
      sources: ['Stop rule: Exam protection']
    };
  }

  if (q.includes('round') || q.includes('grade') || q.includes('regrade') || q.includes('gpa') || q.includes('cgpa')) {
    return {
      type: 'esc',
      cat: 'Grading',
      text: "I can't round up grades or grant regrade or re-evaluation requests.\n\nGrades stand as recorded. Follow the official university process if you believe there was a recording error.",
      sources: ['Stop rule: Grading']
    };
  }

  // Answer queries based on slide content
  if (q.includes('aggregation') || q.includes('composition') || q.includes('assoc')) {
    return {
      type: 'ans',
      text: "**Association vs Aggregation vs Composition:**\n\n- **Association** is a general relationship between two classes with independent lifecycles and no ownership (e.g. *Teacher* and *Student*).\n- **Aggregation** is a specialized 'has-a' relationship with weak/shared ownership. The contained object can survive independently. Example: a *Wallet* has *Money*, but *Money* can exist without the wallet.\n- **Composition** is a strong 'part-of' relationship with exclusive ownership and co-dependent lifecycles. If the container is destroyed, the parts are destroyed too. Example: a *Human* and a *Heart*.\n\n```java\n// Composition Example:\nclass University {\n    private Department dept;\n    public University() {\n        this.dept = new Department(); // lifecycle tied to container\n    }\n}\n```",
      cat: null,
      sources: ['Association lecture, slides 10-19'],
      general: false
    };
  }

  if (q.includes('polymorphism') || q.includes('poly')) {
    return {
      type: 'ans',
      text: "**Polymorphism** means 'many forms'. In Java, it allows a single interface or method name to take multiple forms depending on the context.\n\n*Analogy from slides:* A person can be a student in class, a child at home, and a customer in a store. Same person, different behaviors!\n\nJava provides two types:\n1. **Compile-time Polymorphism (Overloading):** Same method name, different parameter signatures.\n2. **Runtime Polymorphism (Overriding):** Subclass provides a specific implementation of a method declared in its superclass.\n\n```java\nShape s = new Circle();\ns.draw(); // Calls Circle's implementation\n```",
      cat: null,
      sources: ['rules.txt: conceptual explanations', 'Lecture: OOP Pillars'],
      general: false
    };
  }

  if (q.includes('mark') || q.includes('credit') || q.includes('scheme')) {
    return {
      type: 'ans',
      text: "The course is **OOP (Java)** with **3+1 Credit Hours**:\n\n- **Theory (3 Credit Hours, Total 100):**\n  - Midterm Exam: **30 marks**\n  - Final Exam: **50 marks**\n  - Sessional: **20 marks** (Assignments 5, Semester Project 10, Quizzes 5)\n\n- **Practical (1 Credit Hour, Total 50):**\n  - Practical Exam: **25 marks** (15 + 10)\n  - Project Viva: **10 marks**\n  - Student Portfolio: **15 marks**\n  - Open-Ended Labs (I & II): **15 marks** (7.5 each)",
      cat: null,
      sources: ['Introduction lecture, slide 4'],
      general: false
    };
  }

  // Default answer
  return {
    type: 'ans',
    text: "Here is the explanation based on the lecture materials:\n\nObject-Oriented Programming (OOP) in Java structures software around data objects rather than functions. It is built on four core pillars: **Encapsulation**, **Inheritance**, **Polymorphism**, and **Abstraction**.\n\nRemember: Java compiles source files into platform-independent bytecode, which is executed by the **Java Virtual Machine (JVM)** across all operating systems.",
    cat: null,
    sources: ['Introduction lecture, slides 69-89', 'Core OOP concept'],
    general: false
  };
}

export const mockHealthResponse: HealthResponse = {
  ok: true,
  model: 'qwen2.5:3b (Mock Adapter)',
  chunks: 26
};

export const mockReviewsResponse: ReviewsListResponse = {
  items: [
    {
      q: 'What is the difference between aggregation and composition?',
      answer: 'Aggregation is a weak has-a relationship...',
      type: 'ans',
      mark: 'agree',
      t: Date.now() - 3600000 * 2
    },
    {
      q: 'Can you give me the midterm questions for next week?',
      answer: "I can't share or solve actual exam questions...",
      type: 'esc',
      mark: 'should_escalate',
      t: Date.now() - 3600000 * 8
    }
  ],
  agree: 28,
  disagree: 2,
  should_escalate: 4
};
