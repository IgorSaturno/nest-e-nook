import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="border-t p-10">
      <div className="lg:flex lg:flex-row sm:flex sm:flex-col justify-center">
        <div className="flex flex-col gap-2  pb-5 lg:mr-[230px] sm:mr-0">
          <h1 className="font-medium text-lg lg:text-xl">Atendimento</h1>

          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Atendimento pelo WhatsApp
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Perguntas frequentes
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Denuncias
          </Link>
        </div>
        <div className="flex flex-col gap-2 pb-5 lg:mr-[230px] sm:mr-0">
          <h1 className="font-medium text-lg lg:text-xl">Como trabalhamos</h1>

          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Termos e condições de uso do site
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Troca e devolução
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Regulamentos
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Mapa do site
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Relatório de Transparência e Igualdade Salarial
          </Link>
        </div>
        <div className="flex flex-col pb-5 gap-2">
          <h1 className="font-medium text-lg lg:text-xl">Institucional</h1>

          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            A Nest&Nook
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Trabalhe conosco
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Sustentabilidade
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Lojas
          </Link>
          <Link
            to="/"
            className="hover:text-green-800 text-xs lg:text-lg md:text-sm"
          >
            Best Friday
          </Link>
        </div>
      </div>
      <div className="pt-7">
        <p className="text-center text-xs lg:text-lg md:text-sm">
          Nest&Nook - Loja de móveis e acessórios para casa e escritório.
          Decoração com design e exclusividade a preços acessíveis.
        </p>
      </div>
    </div>
  );
}
