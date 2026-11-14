// Atalhos para escrever roteiros com menos repetição. Não é uma aula (o nome começa com "_").

// cena('o que a narradora diz', { tipo: ... })
// O terceiro argumento, opcional, é o texto que a voz lê quando ele precisa ser diferente do que aparece escrito.
export const cena = (fala, tela, voz) => (voz ? { fala, voz, tela } : { fala, tela });

// Uma pergunta ocupa duas cenas seguidas: a primeira sem a resposta, a segunda com ela marcada.
export function pergunta({ enunciado, alternativas, correta, comentario, falaPergunta, falaResposta }) {
  const tela = { tipo: 'questao', enunciado, alternativas, correta };
  return [
    cena(falaPergunta, { ...tela, gabarito: false }),
    cena(falaResposta, { ...tela, gabarito: true, comentario }),
  ];
}
