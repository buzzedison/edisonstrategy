import { Clock } from 'lucide-react';
import type { Metadata } from 'next';
import ApplicationForm from './ApplicationForm';

const title = 'Bring the Problem: Apply to Work With Edison Ade';
const description = 'Share the business constraint, the decision you are facing, and what must change in the next 90 days. Qualified founders can book a focused fit call.';

export const metadata: Metadata = {
  title, description, alternates: { canonical: '/contact' },
  openGraph: { title, description, url: '/contact', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const validServices = ['accelerator-sprint', 'mvp-builder', 'strategy-partner', 'not-sure'];

export default function ContactPage({ searchParams }: { searchParams?: { service?: string } }) {
  const requestedService = searchParams?.service || 'not-sure';
  const defaultService = validServices.includes(requestedService) ? requestedService : 'not-sure';

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
          <div className="mx-auto max-w-[92rem] border-b border-black/20 pb-14 lg:grid lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-24 lg:pb-20">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Start here</p><h1 className="page-display mt-7 max-w-5xl">Bring me the problem.</h1></div>
            <p className="mt-10 max-w-lg text-lg leading-8 text-black/60 lg:mt-0">You do not need a polished brief. Give me the honest context: what is working, what feels stuck, and which decision can no longer wait.</p>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[.32fr_.68fr] lg:gap-16">
            <aside className="border-t border-black/20 pt-7 lg:sticky lg:top-28 lg:h-fit">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">What happens next</p>
              <div className="mt-8 space-y-7 text-sm leading-6 text-black/60">
                <p><span className="block font-semibold text-black">1. Share the real situation.</span>The detail helps me understand the constraint before we spend time on a call.</p>
                <p><span className="block font-semibold text-black">2. The form recommends a next step.</span>Strong-fit applications can book immediately. Earlier-stage founders receive a useful diagnostic.</p>
                <p><span className="block font-semibold text-black">3. Test the fit.</span>The call is for deciding whether we should work together—not for performing a sales ritual.</p>
                <p className="flex items-center gap-2 font-medium text-black"><Clock className="h-4 w-4" /> Fit call · 30 minutes · Google Meet</p>
              </div>
            </aside>
            <ApplicationForm defaultService={defaultService} />
          </div>
        </section>
      </main>
    </div>
  );
}
