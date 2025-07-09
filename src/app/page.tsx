import Image from "next/image";
import { BlogPosts } from "./components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello! This is saranga.dev
      </h1>
      <div>
        <Image alt="Author Image" width={150} height={150} src={'/profile_pic.jpg'} className="float-right"/>
        <p className="mb-4">
          {`👋 Hey, I’m Saranga, a full-stack software engineer with a strong command of the Microsoft ecosystem, especially .NET Core and C#. But I don’t believe in being boxed in by tools or languages. I’m language-agnostic at heart and comfortable working across environments, from Unix-based systems to cross-platform tooling, with experience in Python, JavaScript, TypeScript, and beyond.

What matters to me most is writing clean, reliable, and maintainable code. I approach software engineering with a deep respect for fundamentals: clean architecture, separation of concerns, and test-driven development, applied pragmatically, not dogmatically.

Over the past few years, I’ve worked across the stack. I’ve refactored legacy codebases, built distributed systems, automated testing and deployment pipelines, and strengthened codebases with scalable patterns and meaningful tests. My goal isn’t just to get things working, it’s to make sure they stay working, with clarity and confidence.

This blog is where I share what I learn, build, and refine — from deep dives into .NET and system design, to thoughts on clean code, tooling, and how to think like a long-term engineer.

If you're into thoughtful, testable, and future-ready software, you're in the right place.`}
        </p>
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
