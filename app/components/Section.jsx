import Image from 'next/image';

export default function Section({ image, title, text }) {
  return (
    <div className="flex flex-col items-center p-4">
      <Image src={image} alt={title} width={300} height={200} />
      <h2 className="text-2xl font-bold text-blue-500 mt-4">{title}</h2>
      <p className="text-gray-700 mt-2">{text}</p>
    </div>

  )
}