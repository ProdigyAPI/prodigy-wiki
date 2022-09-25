import React, { useEffect, useRef } from "react"
import type { FC } from "react"

interface GoogleAdsenseAdProps {
    adSlot: string
    adFormat?: string
}

const GoogleAdsenseAd: FC<GoogleAdsenseAdProps> = ({ adSlot, adFormat = "autorelaxed" }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // @ts-expect-error
        // eslint-disable-next-line
        (adsbygoogle = window.adsbygoogle || []).push({});
        if (ref.current != null) {
            ref.current.className = "adsbygoogle"
        }
    }, [])

    return (
        <>
            <ins data-ad-format={adFormat}
                data-ad-client="ca-pub-8981394123170949"
                data-ad-slot={adSlot}
                style={{ display: "block" }}
                ref={ref}
            />
        </>
    )
}
export default GoogleAdsenseAd
