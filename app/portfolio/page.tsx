import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { Metadata } from 'next';

const title = 'Selected Work: Products, Companies & Growth Systems';
const description = 'Explore companies, digital products, and operating systems Edison Ade has helped build across markets and sectors.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Edison Ade portfolio', 'startup growth', 'product strategy work', 'venture building'],
  alternates: { canonical: '/portfolio' },
  openGraph: { title, description, url: '/portfolio', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

interface PortfolioItem {
  _id: string;
  title: string;
  slug?: { current?: string };
  client?: string;
  excerpt?: string;
  mainImage?: any;
  categories?: Array<{ _id: string; title: string }>;
  projectDate?: string;
  featured?: boolean;
}

async function getProjects(): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(groq`*[_type == "portfolio"] | order(featured desc, projectDate desc) {
      _id, title, slug, client, excerpt, mainImage,
      "categories": categories[]->{ _id, title }, projectDate, featured
    }`);
  } catch (error) {
    console.error('Unable to load portfolio projects:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="mx-auto max-w-[92rem] border-b border-black/20 pb-16 lg:grid lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-24 lg:pb-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Selected work</p>
              <h1 className="page-display mt-7 max-w-5xl">The work is the argument.</h1>
            </div>
            <p className="mt-10 max-w-lg text-lg leading-8 text-black/60 lg:mt-0">Companies, products, and systems I have helped shape. Each began with a live business problem—not a brief written to make the work look tidy.</p>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto max-w-[92rem]">
            {projects.length === 0 ? (
              <div className="border-y border-black/20 py-20">
                <p className="max-w-2xl text-2xl leading-9 tracking-[-0.03em] text-black/60">The case-study archive is being edited. In the meantime, ask about CrowdPen, Bloop Global, Enterprise Village, FundDesk, or TaskWit.</p>
                <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-4">Ask about the work <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            ) : (
              <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-24">
                {projects.map((project, index) => {
                  const href = project.slug?.current ? `/portfolio/${project.slug.current}` : '/contact';
                  const year = project.projectDate ? new Date(project.projectDate).getFullYear() : null;
                  return (
                    <Link key={project._id} href={href} className={`group block ${index % 2 ? 'md:translate-y-24' : ''}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#1c1c1c]/8 lg:rounded-[1.75rem]">
                        {project.mainImage && (
                          <Image src={urlFor(project.mainImage).url()} alt={project.title} fill sizes="(min-width: 768px) 48vw, 100vw" className="object-cover grayscale-[15%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0" />
                        )}
                        {project.featured && <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">Featured</span>}
                      </div>
                      <div className="mt-6 grid grid-cols-[1fr_auto] gap-5 border-t border-black/20 pt-5">
                        <div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-black/42">
                            {year && <span>{year}</span>}
                            {project.client && <span>{project.client}</span>}
                            {project.categories?.slice(0, 2).map((category) => <span key={category._id}>{category.title}</span>)}
                          </div>
                          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{project.title}</h2>
                          {project.excerpt && <p className="mt-3 max-w-xl text-sm leading-6 text-black/58 sm:text-base sm:leading-7">{project.excerpt}</p>}
                        </div>
                        <ArrowUpRight className="mt-1 h-5 w-5 text-black/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-10 border-t border-black/20 pt-12 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="closing-display max-w-4xl">Have a problem worth building around?</h2>
            <Link href="/contact" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#1c1c1c] px-7 py-4 text-sm font-semibold text-white">Let&apos;s examine it <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
