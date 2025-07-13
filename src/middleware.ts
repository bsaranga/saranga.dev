import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectMap: Record<string, string> = {
  "/from-code-monkey-to-product-engineer-the-evolution-of-software-engineering-in-the-age-of-llms-3c79a508464d": "/blog/codemonkey",
}

export default function middleware(request: NextRequest) {
    
    if(Object.keys(redirectMap).includes(request.nextUrl.pathname)) {
      console.log(`Redirecting ${request.nextUrl.pathname} to ${redirectMap[request.nextUrl.pathname]}`);
      const newPath = redirectMap[request.nextUrl.pathname];
      return NextResponse.redirect(new URL(newPath, request.url));
    }

    return NextResponse.next();
}