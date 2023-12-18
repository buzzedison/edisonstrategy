import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <>
      <Head>
        <title>Inversion.The Crucial Thinking Skill Nobody Ever Taught You</title>
        <meta name="description" content="Unlock your creativity with Inversion thinking" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg max-w-2xl p-8 m-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Inversion. The Crucial Thinking Skill Nobody Ever Taught You
          </h1>
          <p className="text-gray-600 text-lg text-center">
            Discover the art of inversion with Edison Ade.
          </p>
          <div className="flex justify-center mt-4">
            <Image width={600} height={400} className="w-full h-auto rounded-lg" src="/image/inversion.png" alt="Book Cover" />
          </div>
          <div className="mt-6">
            <p className="text-gray-600">
              Dive into the world of inversion thinking that powered the minds of Darwin, Einstein, and Disney.
            </p>
            <p className="mt-4 text-gray-600">
              Explore case studies, fascinating stories, and step-by-step techniques to harness the power of inversion.
            </p>
          </div>
          <div className="text-center mt-8">
            <Link href="https://buzzedison.gumroad.com/l/inversion" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Get the Book for Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
