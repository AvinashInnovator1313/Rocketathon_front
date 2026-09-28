# Mr. Muhammad Saleem - course knowledge (from his lecture slides)

## marks
Source: Introduction lecture, slide 4

OOP (Java) is a 3+1 course.
Theory (3 credit hours), total 100: Midterm 30, Final exam 50, Sessional 20 (Assignments 5, Project 10, Quiz 5).
Practical (1 credit hour), total 50: Practical exam 15, Project viva 10, Practical exam 10, Portfolio 15, Open Ended Lab-I 7.5, Open Ended Lab-II 7.5.

## agenda
Source: Introduction lecture, slides 2, 6, 7

Official course contents: object-oriented design and its history and advantages, OOP concepts, classes, objects, data encapsulation, constructors, access modifiers, static members, overloading, identifying classes and relationships, composition, aggregation, inheritance, polymorphism, abstract classes and interfaces, generic programming, object streams and serialization, and exception handling.

Mr. Saleem's plan has two parts. Programming Fundamentals: Java, JDK/JRE/JVM, installation, IDE, variables, data types, operators, loops, arrays, math functions, string manipulation. Object Oriented Programming: classes, methods, objects, constructors, access modifiers, this keyword, static keyword, association, aggregation, inheritance, IS-A and HAS-A, super keyword, encapsulation, accessors and mutators, abstraction, polymorphism.

## books
Source: Association lecture, last slide; Introduction lecture, slide 2

The slides list 'Recommended Books' as an agenda item, but no titles appear in the material I have, so I won't guess. The closing slide of the Association lecture points students to the Java tutorial at tpointtech.com/java-tutorial. For the book titles, ask Mr. Saleem.

## whojava
Source: Introduction lecture, slide 5

Anyone can learn this course, including complete beginners with no programming experience, computer science students, self-learners, and people moving from C/C++ to Java. It is for anyone who wants to build their own Java programs and become a stronger programmer.

## assoc_vs
Source: Association lecture, slides 18-19

Association: a general relationship between two classes, independent lifecycles, no ownership, weak. Example: Teacher and Student.
Aggregation: a special form of association, has-a, independent lifecycles, shared ownership, moderate. Example: Library and Books (Library has List<Book>).
Composition: a stronger form, part-of, dependent lifecycles, exclusive ownership, strong. Example: Car and Engine. Cardinality: association and aggregation can be one-to-one, one-to-many, many-to-one, many-to-many; composition is one-to-one or one-to-many.

## aggr
Source: Association lecture, slides 10-12

Aggregation is a has-a relationship with weak ownership. The contained object can exist independently of the container, so both can survive individually and ending one does not affect the other. It is a special form of association and is unidirectional. Slide examples: Wallet has Money (but Money does not need a Wallet), and College has Students and Teachers.

## comp
Source: Association lecture, slides 13-17

Composition is a strong part-of relationship and a restricted form of aggregation. The part cannot exist without the whole, and their lifespans are the same: if one dies, so does the other. Example from the slides: Human and Heart, since a Heart class has no sense without a Human. In code, the University creates its Department objects inside its own constructor.

## assoc
Source: Association lecture, slides 2-5, 7-9

Association describes a relationship between two independent classes. It can be viewed as 'uses-a': one object uses or interacts with another. It can be unidirectional (one class knows the other, e.g. Student has a LibraryCard, but the card need not know the Student) or bidirectional (both know each other, e.g. Teacher and Classroom). Forms: one-to-one, one-to-many, many-to-one, many-to-many. Types of association are IS-A (inheritance) and HAS-A (aggregation and composition). Exploring the 1-1, 1-M, M-1 and M-M relationships is a reading assignment from the lecture.

## multi
Source: Association lecture, slides 29-33

Java does not support multiple inheritance through classes, to reduce complexity. If class C extended both A and B and both had the same method, calling it on a C object would be ambiguous. Java gives a compile-time error instead of a runtime problem, whether or not the methods clash. Multiple and hybrid inheritance are supported only through interfaces, which are taught later.

## inhtypes
Source: Association lecture, slides 25-29

On the basis of classes Java has three types: single (one class inherits another, e.g. Dog extends Animal), multilevel (a chain, e.g. BabyDog extends Dog extends Animal), and hierarchical (two or more classes inherit one class, e.g. Dog and Cat extend Animal). Multiple and hybrid inheritance work only through interfaces.

## inh
Source: Association lecture, slides 21-24

Inheritance is a mechanism where one class acquires the properties and behaviors of a parent class. You build new classes on existing ones, reuse the parent's fields and methods, and add new ones. Terms: subclass (child, derived or extended class), superclass (parent or base class), reusability. The 'extends' keyword makes the new class derive from an existing one, and it represents the IS-A (parent-child) relationship. Slide analogy: a son inherits the father's business and does not start from scratch. Example: Programmer extends Employee can use Employee's salary and adds its own bonus.

## cond
Source: Conditional Statements lecture, slides 2-19

Java runs code top to bottom, and control flow statements change that order. There are three kinds: decision making (if, switch), loops (do-while, while, for, for-each), and jump statements (break, continue).

if runs a block only when the condition is true. else runs when it is false. else if adds a new condition when the first is false. The ternary operator is a short if-else in one line: variable = (condition) ? expressionTrue : expressionFalse. switch evaluates an expression once, compares it with each case, and runs the matching block; break leaves the switch so no more cases are tested; default runs when no case matches. Comparison operators: <, <=, >, >=, ==, !=.

## proglang
Source: Introduction lecture, slides 22-43

A programming language is an artificial language for giving instructions to a computer. Low-level languages are closer to the machine and faster (machine language of 0s and 1s, and assembly, which uses words like ADD, MOV and needs an assembler). High-level languages are closer to humans and easier but slower (Java, C++, Python, C#). Middle-level languages have features of both, e.g. C.

## compiler
Source: Introduction lecture, slides 44-55

A language translator converts source code (human-readable) into object code (machine code, the only thing the computer understands). Types: assembler, compiler, interpreter. A compiler converts the whole program at once, is faster, uses more memory, and shows errors after checking the whole program (C, C++, Java). An interpreter converts line by line, is slower, uses less memory, and shows errors per instruction (Python, Ruby, GW-BASIC).

## bug
Source: Introduction lecture, slides 56-60

A bug is an error or defect that makes a program give an incorrect or unexpected result, and most come from programmer mistakes in the source code. The term was used by Grace Hopper in 1946 after a moth trapped in a relay of the Mark II computer caused a short circuit. Debugging is finding and fixing bugs by examining the source code.

## prog
Source: Introduction lecture, slides 10-21

Programming is giving instructions to a computer to do a meaningful task. An instruction is a single command; a program is a set of instructions, such as the steps to average three numbers. A computer only obeys what it is taught, so we teach it in detail. Programming is more about problem solving than writing code, and it builds analytical thinking.

## whojava2
Source: Introduction lecture, slides 62, 69-70

Java was developed by James Gosling and his team (the Green Team) at Sun Microsystems, now a subsidiary of Oracle, starting in the early 1990s and released in 1995. It was first named Oak, after the oak tree as a symbol of strength, then renamed Java because Oak was already a trademark.

## features
Source: Introduction lecture, slides 69, 72-77

Java features (the 'buzzwords'): simple, object-oriented, platform independent (write once, run anywhere), secured (no explicit pointers, runs in a virtual machine sandbox), robust (strong memory management, garbage collection, exception handling, type checking), architecture neutral (int is 4 bytes on both 32 and 64-bit), and portable (carry the bytecode to any platform). Also multithreaded, high performance, interpreted and dynamic.

## jvm
Source: Introduction lecture, slides 78-89

JVM (Java Virtual Machine) is an abstract machine that loads, verifies and executes bytecode and provides the runtime environment. JRE (Runtime Environment) is the physical implementation of the JVM plus libraries needed to run programs. JDK (Development Kit) = JRE + development tools such as javac (compiler), java (launcher), jar and Javadoc. Flow: source (.java) is compiled to bytecode (.class), then the JVM runs it; the JIT compiler translates bytecode to machine code at run time for a large speed-up.

## platforms
Source: Introduction lecture, slides 63-64

A platform is any hardware or software environment where a program runs. Java has four editions: Java SE (Standard Edition) for desktop applications, Java EE (Enterprise Edition) for server-side applications, Java ME (Micro Edition) for mobile devices, and JavaFX for distributed applications. Exploring Java platforms is a reading assignment from the lecture. The API (library) is predefined Java code you can reuse so you don't write everything from scratch.

## contact
Source: Lecture slides footer; rules.txt: schedule

Email: m.saleem@duet.edu.pk (the address on his slides). Mr. Saleem teaches 18 to 20 classroom hours a week and also handles counseling and FYDP mentorship, so his free window is only about 3 to 4 hours weekly. For anything personal (letters, medical reviews, FYDP guidance) visit during his counseling/office hours.

## who
Source: Lecture slides: About me; rules.txt: persona

Mr. Muhammad Saleem is a Lecturer in Computer Science at Dawood University of Engineering & Technology. Qualifications: BS Computer Science (University of Sindh, Jamshoro), MS Computer Science (Sukkur IBA University), and a Masters in Education (M.Ed). He teaches Programming Fundamentals, OOP, Data Structures & Algorithms, Theory of Automata, and Design & Analysis of Algorithms.

## whojava
Source: Lecture slides: Agenda

The introduction lecture has a 'Who can learn this course' section, so it is aimed at students starting object-oriented programming. Prior comfort with basic programming (Programming Fundamentals) helps. For exact prerequisites, check the course outline.

## java
Source: Lecture: Recap, What is Java?

Java is a general-purpose, object-oriented programming language. You write code once, compile it to bytecode, and the Java Virtual Machine (JVM) runs that bytecode on any platform that has one. That 'write once, run anywhere' idea is a core reason it is taught.

## whyjava
Source: Lecture: Recap, Why Java?

Common reasons: it is platform independent (bytecode + JVM), fully supports object-oriented design, has automatic memory management (garbage collection), a huge standard library, strong tooling, and wide industry use.

## apps
Source: Lecture: Recap, Applications of Java

Java is used for Android apps, enterprise and banking software, web back-ends, desktop applications, big data tools and embedded systems.

## poly
Source: rules.txt: conceptual explanations

Analogy: a person is a student in class, a son or daughter at home, and a customer in a shop. Same person, different behavior depending on context. In Java, one interface or method name takes many forms: method overloading (same name, different parameters, resolved at compile time) and method overriding (a subclass gives its own version, resolved at run time). For example, a Shape reference can call area() and each object (Circle, Rectangle) responds in its own way.

## abs
Source: rules.txt: Abstract Class vs Interface

Abstract class: a partial blueprint. It can hold fields, constructors, concrete and abstract methods, and a class can extend only one. Use it for an 'is-a' relationship with shared code (Animal). Interface: a pure contract of what a class can do; a class can implement many (Flyable, Swimmable). Java 8+ allows default methods but interfaces still have no instance state. Rule of thumb: shared identity and code means abstract class, shared capability means interface.

## enc
Source: Core OOP concept

Encapsulation bundles data and the methods that work on it inside a class and hides internals using private fields with public getters/setters. Analogy: an ATM. You press buttons, you never touch the cash vault directly. It protects data from invalid changes.

## absr
Source: Core OOP concept

Abstraction shows what an object does and hides how it does it. Analogy: driving a car with a steering wheel and pedals without knowing the engine internals. In Java you achieve it with abstract classes and interfaces.

## oop
Source: Core OOP concept

OOP models software as objects that combine data (fields) and behavior (methods). A class is the blueprint; an object is a real instance made from it. The four pillars are encapsulation, inheritance, polymorphism and abstraction.

## tools
Source: rules.txt: tool guidelines

An IDE bundles a code editor, compiler and debugger so development is faster. The lecture names Notepad, VS Code, NetBeans, Eclipse and IntelliJ IDEA. For Java assignments use IntelliJ IDEA (Community), Eclipse, Apache NetBeans, or VS Code with the Java extension. For GUI work: Swing is simple and built in, JavaFX is more modern, and NetBeans has a drag-and-drop GUI builder that is friendly for beginners. Install a current JDK first.

## deadline
Source: rules.txt: general course info

I only share official deadlines that are publicly announced, and I don't have any in my data right now. Please check the official course announcements, or email m.saleem@duet.edu.pk to confirm.

## hello
Source: Persona

Assalam o Alaikum! I'm the AI stand-in for Mr. Muhammad Saleem. I can explain OOP and Java concepts, share marks distribution and course information, and recommend tools. For grading, letters, exams or anything needing his personal authority, I'll send you to him.
