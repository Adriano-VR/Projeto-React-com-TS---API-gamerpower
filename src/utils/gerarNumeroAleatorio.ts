

export function gerarNumeroAleatorio(min: number, max: number): string {
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorio.toString();

}