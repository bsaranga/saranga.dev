import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="max-w-sm mx-auto mt-20 bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6">
        <Image alt="Saranga B" width={200} height={200} src={'/profile_pic.jpg'} className="rounded-full"/>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Saranga Buwaneka</h1>
        <h2 className="text-lg text-blue-700 mb-2">Seasoned Full Stack Developer</h2>
        <p className="text-gray-700 text-center mb-2">
          Specializing in .NET, TDD, and Clean Code.
        </p>
        <ul className="text-gray-600 text-sm list-disc list-inside text-left">
          <li>Test-Driven Development</li>
          <li>Clean, maintainable code</li>
          <li>Continuous learning</li>
          <li>Collaboration & transparency</li>
          <li>Delivering business value</li>
        </ul>
      </div>
    </div>
  );
}
