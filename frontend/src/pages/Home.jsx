export default function Home() {
  console.log("Home");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">Bienvenido a la Página Principal</h1>
      <p className="mt-4 text-lg text-gray-600">Explora las funcionalidades de nuestra aplicación.</p>
    </div>
  );
}
