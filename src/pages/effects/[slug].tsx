import EffectPage from '@/components/EffectPage';
import { effects } from '@/lib/effects';

export async function getStaticPaths() {
    return {
        paths: effects.map((e) => ({ params: { slug: e.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    return { props: { slug: params.slug } };
}

export default function Page({ slug }: { slug: string }) {
    return <EffectPage slug={slug} locale="en" />;
}