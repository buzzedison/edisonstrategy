import Image from "next/image"

export default function BlogHead({children}){
    return (
        <div className="container mx-auto">
        <header className="flex flex-col items-center py-8">
          <h1 className="text-4xl font-bold  w-3/4 text-center pt-2 md:pt-10">Get the latest insights and strategies on startup growth, AI, and future trends.</h1>
        </header>
        <main className="grid grid-cols-3 gap-4">
          {children}
        </main>
      </div>
    )
}