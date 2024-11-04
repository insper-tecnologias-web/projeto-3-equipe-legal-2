import { createGame } from "@/actions/create-game";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center h-[90vh] gap-8">
      <Image src="/logo.svg" alt="Logo" width={560} height={240} className="mt-10" />
      <main className="flex gap-[10px]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Crie o seu jogo</h1>
          <div className="w-[450px] h-[450px] border-4 border-zinc-900 relative">
            <Image src={"/rick.svg"} alt="Rick" width={435} height={300} className="absolute -z-10 bottom-0" />
            <form className="flex flex-col h-full justify-center items-center p-2" action={createGame}>
              <label className="font-semibold text-center text-wrap text-3xl w-4/5 mb-4">
                Escreva um nickname e crie a sua sala
              </label>
              <input
                className="text-black mb-3 w-3/5 p-1 rounded-lg border-2 border-zinc-900"
                type="text"
                name="name"
                required
              />
              <button className="font-semibold text-xl hover:underline" type="submit">
                Criar sala
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Como jogar</h1>
          <div className="flex flex-wrap w-[450px] gap-[10px] text-center text-xl relative">
            <Image
              src={"/rick2.svg"}
              alt="Rick"
              width={43}
              height={100}
              className="absolute -z-10 -top-[70px] right-4"
            />
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Crie uma sala e compartilhe com seus amigos o link que será gerado
            </div>
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Quando estiver pronto, é só começar o jogo
            </div>
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Na primeira rodada, escolha o nome da sua tirinha e comece o desenho do primeiro quadrinho
            </div>
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Na rodada seguinte, outra pessoa vai colocar os balões de fala no seu quadrinho e assim por diante :D
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
