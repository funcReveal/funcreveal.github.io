import { effects } from "@/lib/effects";
import { useEffect } from "react";

interface fetchProps {
    setAllViews: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const VIEW_TRACK_PREFIX = "funcReveal_viewed_";
const DEFAULT_COOLDOWN = 30 * 60 * 1000; // 30 minutes

export const useFetchAllViews = ({ setAllViews }: fetchProps) => {
    useEffect(() => {
        const fetchViews = async () => {
            const cached = sessionStorage.getItem('funcReveal_allViews')
            const cachedTime = sessionStorage.getItem('funcReveal_allViews_time')
            const now = Date.now()

            if (cached && cachedTime && now - parseInt(cachedTime) < DEFAULT_COOLDOWN) {
                setAllViews(JSON.parse(cached))
                return
            }

            try {
                const slugs = effects.map((e) => e.slug).join(',')
                const res = await fetch(
                    `https://view-counter.funcreveal.workers.dev/?slugs=${slugs}&queryOnly=1`
                )
                const data = await res.json()

                setAllViews(data.views || {})
                sessionStorage.setItem('funcReveal_allViews', JSON.stringify(data.views || {}))
                sessionStorage.setItem('funcReveal_allViews_time', now.toString())
            } catch (err) {
                console.error('Failed to fetch all views', err)
            }
        }

        fetchViews()
    }, [setAllViews])
};

export const useTrackView = (slug: string, cooldown: number = DEFAULT_COOLDOWN) => {
    useEffect(() => {
        if (!slug) return;

        const key = `${VIEW_TRACK_PREFIX}${slug}`;
        const now = Date.now();
        const lastViewed = sessionStorage.getItem(key);

        if (lastViewed && now - parseInt(lastViewed) < cooldown) {
            return;
        }

        const url = `https://view-counter.funcreveal.workers.dev/?slug=${slug}`;
        navigator.sendBeacon(url);

        sessionStorage.setItem(key, now.toString());
    }, [slug, cooldown]);
};
