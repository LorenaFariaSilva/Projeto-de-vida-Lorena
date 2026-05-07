const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {

        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }

        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    }
}

const contadores = document.querySelectorAll(".contador");

// Função para calcular a data do Natal do ano atual
function getProximoNatal() {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    // Natal é 25 de dezembro (mês 11, pois janeiro é 0)
    let natal = new Date(anoAtual, 11, 25, 23, 59, 59);
    
    // Se o Natal já passou este ano, usa o Natal do próximo ano
    if (hoje > natal) {
        natal = new Date(anoAtual + 1, 11, 25, 23, 59, 59);
    }
    
    return natal;
}

// Todos os objetivos usam a mesma data (Natal)
const dataNatal = getProximoNatal();
const tempos = [dataNatal, dataNatal, dataNatal, dataNatal];

function calculaTempo(tempoObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;
    
    if (tempoFinal <= 0) {
        return [0, 0, 0, 0];
    }
    
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    
    return [dias, horas, minutos, segundos];
}

function atualizaCronometro() {
    // Atualiza a data do Natal dinamicamente (caso passe da meia-noite do dia 25)
    const dataNatalAtualizada = getProximoNatal();
    tempos[0] = dataNatalAtualizada;
    tempos[1] = dataNatalAtualizada;
    tempos[2] = dataNatalAtualizada;
    tempos[3] = dataNatalAtualizada;
    
    for (let i = 0; i < contadores.length; i++) {
        const tempo = calculaTempo(tempos[i]);
        
        const diasElement = document.getElementById("dias" + i);
        const horasElement = document.getElementById("horas" + i);
        const minElement = document.getElementById("min" + i);
        const segElement = document.getElementById("seg" + i);
        
        if (diasElement) diasElement.textContent = tempo[0];
        if (horasElement) horasElement.textContent = tempo[1];
        if (minElement) minElement.textContent = tempo[2];
        if (segElement) segElement.textContent = tempo[3];
    }
}

function comecaCronometro() {
    atualizaCronometro();
    setInterval(atualizaCronometro, 1000);
}

comecaCronometro();