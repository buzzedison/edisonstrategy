import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
          <div className="mx-auto max-w-[92rem] border-b border-black/20 pb-14 lg:grid lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-24 lg:pb-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Start here</p>
              <h1 className="page-display mt-7 max-w-5xl">Bring the decision that keeps following you home.</h1>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="max-w-lg text-lg leading-8 text-black/60">You do not need a perfect brief. Tell me what is changing, what feels stuck, and why it matters now. We will find the real question together.</p>
              <a href="mailto:ask@buzzedison.com" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                ask@buzzedison.com <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[.38fr_.62fr] lg:gap-16">
            <aside className="border-t border-black/20 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">A useful first call</p>
              <div className="mt-8 space-y-7 text-sm leading-6 text-black/60">
                <p><span className="block font-semibold text-black">Bring one live decision.</span>The offer, hire, product, market, or operating problem you cannot afford to keep circling.</p>
                <p><span className="block font-semibold text-black">Expect an honest conversation.</span>If I am not the right person, I will tell you. If I can help, we will make the next step clear.</p>
                <p className="flex items-center gap-2 font-medium text-black"><Clock className="h-4 w-4" /> 30 minutes · Google Meet</p>
              </div>
            </aside>

            <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white p-2 sm:p-4 lg:rounded-[2rem]">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0cfx_8uXRMAd69sMhA26BXX7exBnW3KDFUtLtoJq9_Llw5b94mWxB7NOqmhaUxM135XnFTPz3L?gv=true"
                className="h-[720px] w-full border-0 bg-white"
                title="Book a conversation with Edison Ade"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#1c1c1c] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl text-2xl leading-9 tracking-[-0.03em] text-white/75 sm:text-3xl sm:leading-10">Not ready to book? Send the messy version by email. Clarity can start there.</p>
            <Link href="mailto:ask@buzzedison.com" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c]">Write to Edison <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
