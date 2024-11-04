import { createGame } from '@/actions/create-game';
import Image from 'next/image'
import { Coming_Soon } from 'next/font/google'
import {
    Carousel,
    CarouselItem,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

const comingSoon = Coming_Soon({ weight: '400', subsets: ['latin'] })

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <div className="flex-row flex w-full gap-20">
                    <Card className="dark max-w-xs">
                        <CardTitle
                            className={`text-xl mt-5 font-semibold text-center ${comingSoon.className}`}
                        >
                            Crie o seu jogo
                        </CardTitle>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                            <form
                                className="flex flex-col w-full p-2"
                                action={createGame}
                            >
                                <label className="text-xl font-semibold text-center mb-6">
                                    Escreva um nickname e cria a sua sala
                                </label>
                                <input
                                    className="text-black mb-3 p-1 rounded-lg"
                                    type="text"
                                    name="name"
                                    required
                                />
                                <button className="font-semibold" type="submit">
                                    Create Game
                                </button>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="flex flex-col justify-center">
                        <Carousel className="w-full max-w-xs dark">
                            <CarouselContent>
                                <CarouselItem>
                                    <div className="p-1">
                                        <Card>
                                            <CardTitle
                                                className={`text-xl mt-5 font-semibold text-center ${comingSoon.className}`}
                                            >
                                                Como jogar
                                            </CardTitle>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span
                                                    className={`text-2xl font-semibold ${comingSoon.className}`}
                                                >
                                                    Crie uma sala e compartilhe
                                                    com seus amigos o link que
                                                    será gerado
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                                <CarouselItem>
                                    <div className="p-1">
                                        <Card>
                                            <CardTitle
                                                className={`text-xl mt-5 font-semibold text-center ${comingSoon.className}`}
                                            >
                                                Como jogar
                                            </CardTitle>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span
                                                    className={`text-2xl font-semibold ${comingSoon.className}`}
                                                >
                                                    Quando estiver pronto, é só
                                                    começar o jogo
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                                <CarouselItem>
                                    <div className="p-1">
                                        <Card>
                                            <CardTitle
                                                className={`text-xl mt-5 font-semibold text-center ${comingSoon.className}`}
                                            >
                                                Como jogar
                                            </CardTitle>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span
                                                    className={`text-2xl font-semibold ${comingSoon.className}`}
                                                >
                                                    Na primeira rodada escolha o
                                                    nome da sua tirinha e comece
                                                    o desenho do primeiro
                                                    quadrinho
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                                <CarouselItem>
                                    <div className="p-1">
                                        <Card>
                                            <CardTitle
                                                className={`text-xl mt-5 font-semibold text-center ${comingSoon.className}`}
                                            >
                                                Como jogar
                                            </CardTitle>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span
                                                    className={`text-2xl font-semibold ${comingSoon.className}`}
                                                >
                                                    Na rodada seguinte, outra
                                                    pessoa vai colocar os balões
                                                    de fala no seu quadrinho e
                                                    assim por diante
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    )
}
