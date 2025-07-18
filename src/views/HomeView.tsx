import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="bg-white dark:bg-gray-700 py-16 min-h-screen transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 lg:px-0">
          <div className="lg:w-2/3 mx-auto space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white text-center">
              Todas tus <span className="text-lime-500 dark:text-black">Redes Sociales</span> en un enlace
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-lg lg:text-xl leading-relaxed text-center">
              Únete a más de 200 mil developers compartiendo sus redes sociales. Comparte tu perfil de TikTok, Facebook, Instagram, YouTube, GitHub y mucho más desde un solo lugar.
            </p>

            <div className="max-w-xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
