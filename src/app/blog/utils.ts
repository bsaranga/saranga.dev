import { promises as fs } from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import { MDXComponents } from 'next-mdx-remote-client'
import { ComponentType } from 'react'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

async function getMDXFiles(dir: string) {
  return (await fs.readdir(dir)).filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath: string) {
  const rawContent = await fs.readFile(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

async function getMDXData(dir: string) {
  const mdxFiles = await getMDXFiles(dir)
  return await Promise.all(mdxFiles.map(async (file) => {
    const { metadata, content } = await readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  }))
}

export async function getBlogPosts() {
  return await getMDXData(path.join(process.cwd(), 'src', 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}

export async function getComponentMap(componentNames: string[]) {
  
  const components: { [key: string]: ComponentType<MDXComponents> } = {};

  for (const component of componentNames) {
    components[component] = dynamic<MDXComponents>(() => import(`@/app/components/${component.toLocaleLowerCase()}`).then((mod) => {
      return mod.default || mod
    }))
  }

  return components;
}