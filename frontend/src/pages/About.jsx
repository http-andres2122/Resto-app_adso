export default function About() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
        {/* Contenedor principal */}
        <div className="w-full max-w-4xl px-6 py-12 bg-white shadow-lg rounded-lg">
          {/* Título */}
          <h1 className="text-5xl font-bold text-blue-600 text-center">
            Acerca de Nosotros
          </h1>
  
          {/* Descripción */}
          <p className="mt-4 text-xl text-gray-700 text-center">
            Somos una empresa dedicada a la creación de soluciones tecnológicas innovadoras para mejorar la experiencia de nuestros clientes. Con un enfoque en el desarrollo de software de calidad, buscamos siempre superar las expectativas del mercado.
          </p>
  
          {/* Sección de misión */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-blue-600">Nuestra Misión</h2>
            <p className="mt-2 text-lg text-gray-600">
              Nuestra misión es desarrollar software de alta calidad que facilite el trabajo y la vida de las personas, utilizando tecnologías modernas y un enfoque en la satisfacción del cliente.
            </p>
          </div>
  
          {/* Sección de visión */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-blue-600">Nuestra Visión</h2>
            <p className="mt-2 text-lg text-gray-600">
              Ser la principal opción para nuestros clientes en la creación de soluciones tecnológicas, destacándonos por nuestra innovación, compromiso y excelencia en el servicio.
            </p>
          </div>
  
          {/* Imagen o visual adicional */}
          <div className="mt-12 flex justify-center">
            <img 
              src="https://via.placeholder.com/400x300" 
              alt="Imagen de la empresa" 
              className="rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </div>
    );
  }
  