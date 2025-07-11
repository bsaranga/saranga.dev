/*eslint-disable @next/next/no-img-element*/
import { ImageResponse } from 'next/og'
export async function GET(request: Request) {
  const url = new URL(request.url)
  console.log(url.protocol)
  const title = url.searchParams.get('title') || 'Saranga.dev Blog'
  const slug = url.searchParams.get('slug') || 'default-slug'

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
          <img style={{
            position:'absolute',
            opacity: 0.5,
          }} src={`${url.protocol}//${url.host}/img/og/${slug}.png`} alt="" />
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
            {title}
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
