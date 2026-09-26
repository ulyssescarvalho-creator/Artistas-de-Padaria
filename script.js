const arquivoLivre = document.getElementById ("arquivoLivre");
const previewLivre = document.getElementById ("previewLivre");
const arquivoDiario = document.getElementById ("arquivoDiario");
const previewDiario = document.getElementById ("previewDiario");
const arquivoSemanal = document.getElementById ("arquivoSemanal");
const previewSemanal = document.getElementById ("previewSemanal");
const enviarLivre = document.getElementById ("enviarLivre");
const enviarDiario = document.getElementById ("enviarDiario");
const enviarSemanal = document.getElementById ("enviarSemanal");
const mensagemLivre = document.getElementById ("mensagemLivre");
const mensagemDiario = document.getElementById ("mensagemDiario");
const mensagemSemanal = document.getElementById ("mensagemSemanal");
const textoDesafioDiario = document.getElementById ("textoDesafioDiario");
const data = document.getElementById ("data");
const timer = document.getElementById ("timer");
const setaEsquerda = document.getElementById ("setaEsquerda");
const setaDireita = document.getElementById ("setaDireita");
const labelLivre = document.getElementById ("labelLivre");
const labelDiario = document.getElementById ("labelDiario");
const labelSemanal = document.getElementById ("labelSemanal");
const conteudoDesafios = document.getElementById("conteudoDesafios");
let animando = false;



const hoje = new Date();
const inicioHoje = new Date(hoje);
inicioHoje.setHours(0, 0, 0, 0);
const dataSelecionada = new Date(hoje);
dataSelecionada.setHours(0, 0, 0, 0);
const dia = hoje.getDate();
const diaFormatado = String(dia).padStart(2,"0");
const mes = hoje.getMonth() + 1;
const mesFormatado = String(mes).padStart(2,"0");
const ano = hoje.getFullYear();
const fim = new Date(hoje);
fim.setDate(fim.getDate() + 1);
fim.setHours(0, 0, 0, 0);

const agora = new Date();
const tempoRestante = fim.getTime() - agora.getTime();
let segundos = Math.floor(tempoRestante / 1000);
const limiteEsquerda = new Date(2026, 8, 20);

// ----------------------------------------------------------------------------

data.textContent = "DESAFIOS DE: " + diaFormatado + "/" + mesFormatado + "/" + ano;

function obterDataFormatada() {
    const dia = dataSelecionada.getDate();
    const diaFormatado = String(dia).padStart(2,"0");
    const mes = dataSelecionada.getMonth() + 1;
    const mesFormatado = String(mes).padStart(2,"0");
    const ano = dataSelecionada.getFullYear();

    const dataFormatada = diaFormatado + "/" + mesFormatado + "/" + ano; 
    
    return dataFormatada;
}

const desafiosDiarios = {
    "25/09/2026": "Desenhe algo relacionado ao mar.",
    "24/09/2026": "Desenhe algo relacionado a tecnologia.",
    "23/09/2026": "Desenhe um meio de transporte."
};

const desenhosEnviados = {

}

console.log(desafiosDiarios[obterDataFormatada()]);

function atualizarTimer(segundos) {
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const segundosRestantes = segundos % 60;
    const minutosRestantes = minutos % 60;
    
    const segundosFormatados = String(segundosRestantes).padStart(2, "0");
    const minutosFormatados = String(minutosRestantes).padStart(2, "0");
    const horasFormatadas = String(horas).padStart(2, "0");
    
    timer.textContent = "TEMPO RESTANTE: " + horasFormatadas + ":" + minutosFormatados + ":" + segundosFormatados;
}

function atualizarData(mudancaData) {

    dataSelecionada.setDate(dataSelecionada.getDate() + mudancaData);

    const dia = dataSelecionada.getDate();
    const diaFormatado = String(dia).padStart(2,"0");
    const mes = dataSelecionada.getMonth() + 1;
    const mesFormatado = String(mes).padStart(2,"0");
    const ano = dataSelecionada.getFullYear();

    data.textContent = "DESAFIOS DE: " + diaFormatado + "/" + mesFormatado + "/" + ano;

    mostrarDesenhoEnviado(previewLivre, "livre", enviarLivre, mensagemLivre, labelLivre);
    mostrarDesenhoEnviado(previewDiario, "diario", enviarDiario, mensagemDiario, labelDiario);
    mostrarDesenhoEnviado(previewSemanal, "semanal", enviarSemanal,mensagemSemanal, labelSemanal);
    
    atualizarSetaDireita();
    atualizarSetaEsquerda();
    atualizarDesafioDiario();

}

atualizarTimer(segundos);

const intervalo = setInterval(function(){
    segundos = segundos - 1;


    if (segundos <= 0) {
        clearInterval (intervalo);
        timer.textContent = "Desafio encerrado!";
    } else {
        atualizarTimer(segundos);
    }

}, 1000)

function atualizarSetaEsquerda() {
    if (dataSelecionada.getTime() === limiteEsquerda.getTime()){
        setaEsquerda.style.visibility = "hidden";
    } else {
        setaEsquerda.style.visibility = "visible";
    }
}

function atualizarSetaDireita() {
    if (dataSelecionada.getTime() >= inicioHoje.getTime()){
        setaDireita.style.visibility = "hidden";
    } else {
        setaDireita.style.visibility = "visible";
    }
}

function mostrarDesenhoEnviado(preview, tipo, botao, mensagem, label) {

    if (desenhosEnviados[obterDataFormatada()] && desenhosEnviados[obterDataFormatada()][tipo]) {

        const arquivo = desenhosEnviados[obterDataFormatada()][tipo];
        const imagemURL = URL.createObjectURL(arquivo);
        const imagem = document.createElement("img");
        imagem.src = imagemURL;
        botao.style.display = "none";
        mensagem.textContent = "Desenho Enviado!";
        label.textContent = "Trocar Desenho";

        

        if (preview.children.length > 0) {
            preview.children[0].remove();
        }
        preview.appendChild(imagem)
    } else {
            if (preview.children.length > 0) {
            preview.children[0].remove();
        }  
        
            botao.style.display = "inline-block"
            mensagem.textContent = "";
            label.textContent = "Escolher Desenho";

    }
}

function mostrarPreview(input, preview, botao, mensagem) {

    const arquivo = input.files[0];
    const imagemURL = URL.createObjectURL(arquivo);
    const imagem = document.createElement("img");
    imagem.src = imagemURL;

    if (preview.children.length > 0) {
        preview.children[0].remove();
    }

    mensagem.textContent = "";
    botao.style.display = "inline-block";
    preview.appendChild(imagem);
}

function enviarDesenho(input, mensagem, botao, tipo, preview, label) {

    if (input.files.length > 0){
        const arquivo = input.files[0];

        const dataDoDesenho = obterDataFormatada();
        if (!desenhosEnviados[dataDoDesenho]){
            desenhosEnviados[dataDoDesenho] = {};
        }
        desenhosEnviados[dataDoDesenho][tipo] = arquivo;
        mostrarDesenhoEnviado(preview, tipo, botao, mensagem, label);

    } else {
        mensagem.textContent = "Você não anexou nenhum desenho.";
    }

}

function atualizarDesafioDiario() {
    if (desafiosDiarios[obterDataFormatada()]) {
        textoDesafioDiario.textContent = desafiosDiarios[obterDataFormatada()];
    } else {
        textoDesafioDiario.textContent = "Nenhum desafio cadastrado para este dia.";
    }
}

//  ----------------------------------------------------------

arquivoLivre.addEventListener("change", function(){
    mostrarPreview(arquivoLivre, previewLivre, enviarLivre, mensagemLivre);
})

arquivoDiario.addEventListener("change", function(){
    mostrarPreview(arquivoDiario, previewDiario, enviarDiario, mensagemDiario);
})

arquivoSemanal.addEventListener("change", function(){
    mostrarPreview(arquivoSemanal, previewSemanal, enviarSemanal, mensagemSemanal);
})

//  ----------------------------------------------------------

enviarLivre.addEventListener("click", function(){
    enviarDesenho(arquivoLivre, mensagemLivre, enviarLivre, "livre", previewLivre, labelLivre);
})

enviarDiario.addEventListener("click", function(){
    enviarDesenho(arquivoDiario, mensagemDiario, enviarDiario, "diario", previewDiario,labelDiario);
})

enviarSemanal.addEventListener("click", function(){
    enviarDesenho(arquivoSemanal, mensagemSemanal, enviarSemanal, "semanal", previewSemanal, labelSemanal);
})

// ----------------------------------------------------------------------

setaEsquerda.addEventListener("click", function(){
    
    if (animando){
        return;
    }

    if (dataSelecionada > limiteEsquerda) {
        conteudoDesafios.style.transform = "translateX(-100%) scale(0.8)";
        animando = true

        setTimeout(function(){
            atualizarData(-1);
            conteudoDesafios.style.transition = "none";
            conteudoDesafios.style.transform = "translateX(100%) scale(0.8)";

            requestAnimationFrame(function() {
                conteudoDesafios.style.transition = "transform 0.5s ease";
                conteudoDesafios.style.transform = "translateX(0) scale(1)";

                setTimeout(function(){
                    animando = false;
                }, 500)
            });
        }, 500);
    }
})


setaDireita.addEventListener("click", function(){

    if (animando){
        return;
    }

    if(dataSelecionada < inicioHoje){
        conteudoDesafios.style.transform = "translateX(100%) scale(0.8)";
        animando = true

        setTimeout(function() {
            atualizarData(1);
            conteudoDesafios.style.transition= "none";
            conteudoDesafios.style.transform = "translateX(-100%) scale(0.8)";

            requestAnimationFrame(function() {
                conteudoDesafios.style.transition = "transform 0.5s ease";
                conteudoDesafios.style.transform = "translateX(0) scale(1)";
                
                setTimeout(function(){
                    animando = false;
                }, 500);
            });
        }, 500);
    }

})

// ---------------------------------------------------------------------------------------------

atualizarSetaDireita();
atualizarSetaEsquerda();
atualizarDesafioDiario();
