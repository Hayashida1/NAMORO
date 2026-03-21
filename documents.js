function atualizarContador() {
    const dataInicio = new Date("2025-03-22T18:15:00");
    const agora = new Date();
    
    // Diferença total em milissegundos
    let diffMs = agora - dataInicio;


    if (diffMs < 0) return; // Evita contagem negativa antes da data


    // 1. Cálculo de Anos
    // Comparamos o calendário: se hoje ainda não é 22/03 às 18:15, o ano não fechou.
    let anos = agora.getFullYear() - dataInicio.getFullYear();
    const dataAniversarioEsteAno = new Date(dataInicio);
    dataAniversarioEsteAno.setFullYear(dataInicio.getFullYear() + anos);


    if (agora < dataAniversarioEsteAno) {
        anos--;
    }


    // 2. Cálculo de Dias Totais Restantes
    // Pegamos a data do último "aniversário" (ex: 22/03/2025) e vemos quantos dias 
    // se passaram até hoje. Isso ignora a confusão de meses e foca apenas em dias brutos.
    const ultimoAniversario = new Date(dataInicio);
    ultimoAniversario.setFullYear(dataInicio.getFullYear() + anos);
    
    const diffRestanteMs = agora - ultimoAniversario;
    
    const dias = Math.floor(diffRestanteMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffRestanteMs / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diffRestanteMs / (1000 * 60)) % 60);
    const segundos = Math.floor((diffRestanteMs / 1000) % 60);


    // Injeção no HTML
    document.getElementById('anos').innerText = anos;
    document.getElementById('dias').innerText = dias;
    document.getElementById('horas').innerText = horas.toString().padStart(2, '0');
    document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
}


setInterval(atualizarContador, 1000);
atualizarContador();

function revelarSite() {
    const tela = document.getElementById('tela-entrada');
    const site = document.getElementById('site-completo');

    // Remove a tela preta
    tela.classList.add('fade-out');

    // Torna o site visível
    site.style.visibility = 'visible';
    site.style.opacity = '1';
    setTimeout(() => {
        tela.remove();
    }, 1000); // 1000ms = 1 segundo (o mesmo tempo da transição no CSS)
}



let indiceAtual = 0; // Começa na primeira foto (índice 0)
const fotos = document.querySelectorAll('.foto-slide'); // Pega todas as fotos

function proximaFoto() {
    // 1. Remove a classe 'ativa' da foto atual
    fotos[indiceAtual].classList.remove('ativa');

    // 2. Avança o índice. Se chegar no fim, volta para 0.
    indiceAtual = (indiceAtual + 1) % fotos.length;

    // 3. Adiciona a classe 'ativa' na nova foto
    fotos[indiceAtual].classList.add('ativa');
}

// Inicia o carrossel automático: troca a cada 4 segundos (4000 milissegundos)
setInterval(proximaFoto, 4000);



function criarNeveDeCoracoes() {
    const container = document.body; // Vamos adicionar direto no body
    const totalCoracoes = 50; // Quantidade de corações na tela ao mesmo tempo

    for (let i = 0; i < totalCoracoes; i++) {
        setTimeout(() => {
            const coracao = document.createElement('div');
            coracao.classList.add('coracao-neve');
            coracao.innerText = '❤'; // O caractere do coração

            // --- Gerando variações aleatórias ---
            
            // Posição horizontal (0% a 100% da largura da tela)
            coracao.style.left = Math.random() * 100 + 'vw';
            
            // Tamanho aleatório (entre 10px e 25px)
            coracao.style.fontSize = Math.random() * 15 + 10 + 'px';
            
            // Duração da queda aleatória (entre 3s e 8s) - para não caírem todos juntos
            coracao.style.animationDuration = Math.random() * 5 + 3 + 's';
            
            // Atraso aleatório para começarem em tempos diferentes
            coracao.style.animationDelay = Math.random() * 5 + 's';
            
            // Opacidade aleatória para dar profundidade
            coracao.style.opacity = Math.random() * 0.5 + 0.2;

            container.appendChild(coracao);

            // Opcional: Remover o elemento após a animação para não acumular no DOM
            // (Mas como é um loop infinito com animação CSS, não é estritamente necessário)
            
        }, i * 200); // Espaça a criação de cada coração para não travar o navegador
    }
}

// Inicia a neve assim que a página carrega
window.addEventListener('load', criarNeveDeCoracoes);


const musica = document.getElementById('minhaMusica');
const btn = document.getElementById('btn-play');

function controlarMusica() {
    if (musica.paused) {
        musica.play();

    } else {
        musica.pause();

    }
}