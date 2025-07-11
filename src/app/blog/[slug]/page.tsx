import * as acorn from 'acorn'
import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts, getComponentMap } from '../utils'
import { baseUrl } from '../../sitemap'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { mdxJsx } from 'micromark-extension-mdx-jsx'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxJsxFromMarkdown } from 'mdast-util-mdx-jsx'

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => {
    return {
      slug: post.slug,
    }
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;
  const post = (await getBlogPosts()).find((post) => post.slug === slug)
  
  if (!post) {
    return
  }

  const { title, publishedAt: publishedTime, summary: description, } = post.metadata
  const ogImage = `${baseUrl}/og?slug=${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;
  
  const post = (await getBlogPosts()).find((post) => post.slug === slug);

  if (!post) {
    notFound()
  }

  const customComponents = fromMarkdown(post.content, {
    extensions: [mdxJsx({acorn, addResult: true})],
    mdastExtensions: [mdxJsxFromMarkdown()],
  }).children.filter((node) => node.type === 'mdxJsxFlowElement').map((node) => (node.name));

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: `/og?slug=${encodeURIComponent(post.slug)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Saranga B | Site',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white dark:prose-p:text-white dark:prose-a:text-blue-400 dark:prose-a:visited:text-purple-500">
        <MDXRemote source={post.content} components={await getComponentMap(customComponents as string[])} />
      </article>
    </section>
  )
}