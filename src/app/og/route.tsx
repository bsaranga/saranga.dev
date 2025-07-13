/*eslint-disable @next/next/no-img-element*/
import { ImageResponse } from 'next/og'
import { getBlogPosts } from '../blog/utils'
import { readFile } from 'fs/promises';
import { join } from 'path';

const DEBUG = false;

export async function GET(request: Request) {
  const inter = await readFile(join(process.cwd(), 'public', 'fonts', 'Inter_24pt-SemiBold.ttf'));
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug') || 'default-slug'
  const isRoot = url.pathname === '/og' && slug === 'default-slug';
  
  if (isRoot) {
    return new ImageResponse(<div tw='flex w-full h-full bg-black'>
      <img style={{
        height: '630px',
      }} src={'http://localhost:3000/profile_pic.jpg'} alt='profile_image'/>
      <div tw='text-white flex items-center justify-center flex-col flex-1 px-12'>
        <div tw='text-4xl text-justify'>saranga.dev is a blog that explores the craft of software engineering through deep dives into computer science concepts, the Microsoft .NET ecosystem, cutting-edge developer tools, and the evolving impact of generative AI—designed for engineers who think beyond the code.</div>
      </div>
    </div>, {
      width: 1200,
      height: 630,
      fonts: [{
        name: 'Inter',
        data: inter,
        style: 'normal',
      }],
    })
  } else {
    const { metadata } = (await getBlogPosts()).filter((post) => post.slug === slug)[0];
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
            <img style={{
              position:'absolute',
              opacity: 0.5,
            }} src={DEBUG ? `${url.protocol}//${url.host}${metadata.image}` : `https://saranga.dev${metadata.image}`} alt={metadata.altImage} />
          <div style={{
            display:'flex',
            position: 'absolute',
            padding: '0px 40px 0px 40px'
          }}>
            <h2
                style={{
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  fontSize: '2.8rem',
                  color: 'white',
                  lineHeight: '3.2rem',
                  textAlign: 'center',
                }}
              >
              {metadata.title}
            </h2>
          </div>
          <div
            style={{
              padding: '5px 20px 5px 20px',
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontFamily: 'sans-serif',
              fontSize: '1.2rem',
              color: 'white',
              backgroundColor: 'rgb(52 132 162)',
            }}
          >saranga.dev</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
