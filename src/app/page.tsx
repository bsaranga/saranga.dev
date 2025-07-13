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
          {
`👋 Hey, I’m Saranga, a full-stack developer with a strong command of the Microsoft ecosystem, especially .NET Core and C#. 
I’m language-agnostic at heart and comfortable working across various languages, tools, and environments, I've got experience in Python, 
JavaScript, TypeScript, C, Rust, and Unix-based environments. What matters to me most is writing clean, reliable, and maintainable code. 
I approach software engineering with a deep respect for fundamentals: data-structures, algorithms, memory management, clean architecture, 
separation of concerns, and test-driven development, applied pragmatically, not dogmatically. Over the past few years, I’ve worked across 
several technology stacks. I’ve refactored legacy codebases, built distributed systems, automated testing and deployment pipelines, and 
strengthened codebases with scalable patterns and meaningful tests. My goal isn’t just to get things working, it’s to make sure they stay 
working, with clarity and confidence.`
}
<br/>
<br/>
{
`This blog is where I share what I learn; be it deep dives into .NET or system design, or thoughts on clean code I believe that
sharing knowledge is a powerful way to reinforce my own understanding and help others in the community.
You can check my curated learning resources`
} <a href="https://saranga.dev/lrhof" className="text-blue-500 hover:underline">here at LRHOF.</a>
        </p>
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
