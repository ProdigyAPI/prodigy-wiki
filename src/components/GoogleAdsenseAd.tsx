import React, { useEffect, useRef } from "react"
import type { FC } from "react"

interface GoogleAdsenseAdProps {
    adSlot: string
    adFormat?: string
}

const GoogleAdsenseAd: FC<GoogleAdsenseAdProps> = ({ adSlot, adFormat = "autorelaxed" }) => {
    const ref = useRef<HTMLModElement>(null)

    useEffect(() => {
        if (ref.current != null) {
            ref.current.className = "adsbygoogle"
            // @ts-expect-error
            if (window.adsbygoogle == null) window.adsbygoogle = []
            // @ts-expect-error
            window.adsbygoogle.push({})
        }
    }, [])

    return (
        <>
            <ins data-ad-format={adFormat}
                data-ad-client="ca-pub-8981394123170949"
                data-ad-slot={adSlot}
                style={{ display: "flex", justifyContent: "center" }}
                ref={ref}
            />
        </>
    )
}
export default GoogleAdsenseAd
