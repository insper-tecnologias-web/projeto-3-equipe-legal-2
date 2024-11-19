import { Form } from '@/components/form';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center h-[90vh] gap-8">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={560}
        height={240}
        className="mt-10"
      />
      <main className="flex gap-[10px]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Crie o seu jogo</h1>
          <div className="w-[450px] h-[450px] border-4 border-zinc-900 relative">
            <Image
              src={'/balao.svg'}
              alt="Balão de fala"
              width={400}
              height={300}
              className="absolute -z-10 bottom-[72px] left-8"
              unoptimized
            />
            <Image
              src={'/palito_falando.gif'}
              alt="Rick"
              width={70}
              height={150}
              className="absolute -z-10 -bottom-1"
              unoptimized
            />
            <Form />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Como jogar</h1>
          <div className="flex flex-wrap w-[450px] gap-[10px] text-center text-xl relative">
            <Image
              src={'/palito_sentado.gif'}
              alt="Rick"
              width={43}
              height={100}
              className="absolute -z-10 -top-[67px] right-4"
              unoptimized
            />
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Crie uma sala e compartilhe com seus amigos o link que será gerado
            </div>
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Quando estiver pronto, é só começar o jogo
            </div>
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Na primeira rodada, escolha o nome da sua tirinha e depois comece
              o desenho do primeiro quadrinho
            </div>
            <div className="w-[220px] h-[220px] border-4 border-zinc-900 flex items-center justify-center p-4">
              Na rodada seguinte, outra pessoa vai continuar a sua tirinha e
              você vai continuar a tirinha de alguém
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
