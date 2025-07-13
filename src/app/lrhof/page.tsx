import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function LRHOF() {
    const content = await fs.readFile(process.cwd() + "/src/app/lrhof/lrhof.mdx", "utf-8");
  return (
    <article className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white dark:prose-p:text-white dark:prose-a:text-blue-400 dark:prose-a:visited:text-purple-500 dark:prose-strong:text-white">
      <MDXRemote source={content} />
    </article>
  )
}