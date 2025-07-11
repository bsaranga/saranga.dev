'use client'

import { LinkedinIcon, LinkedinShareButton } from "react-share";

export default function ShareWidget() {
    return (
        <LinkedinShareButton onClick={() => console.log('CLICKED')} url='https://saranga.dev/blog/codemonkey' title='Etc etc' summary='akaka' source='ksdfjskjhfk'>
            <LinkedinIcon size={20} />
        </LinkedinShareButton>
    )
}