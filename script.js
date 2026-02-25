// Função para carregar o arquivo .txt e transformar em uma lista
async function carregarLista(nomeArquivo) {
    try {
        // Cache: 'no-store' ajuda a evitar que o navegador mostre dados antigos se você mudar o .txt
        const resposta = await fetch(nomeArquivo, { cache: "no-store" });
        if (!resposta.ok) throw new Error("Erro ao carregar arquivo");
        const texto = await resposta.text();
        return texto.split('\n').map(item => item.trim()).filter(item => item !== "");
    } catch (e) {
        console.error("Falha ao carregar:", nomeArquivo);
        return ["Erro de carregamento"];
    }
}

// Função principal disparada pelo botão
async function gerarTudo() {
    const btnGerar = document.getElementById('btn-gerar');
    btnGerar.innerText = "SORTEANDO...";
    btnGerar.disabled = true;

    // Configuração das listas
    const configs = [
        { arquivo: 'Especie.txt', id: 'res-especie' },
        { arquivo: 'Objeto.txt', id: 'res-objeto' },
        { arquivo: 'Profissao.txt', id: 'res-profissao' },
        { arquivo: 'Roupa.txt', id: 'res-roupa' },
        { arquivo: 'Persona.txt', id: 'res-persona' }
    ];

    // Executa o sorteio para cada card
    for (const item of configs) {
        const lista = await carregarLista(item.arquivo);
        const itemSorteado = lista[Math.floor(Math.random() * lista.length)];
        document.getElementById(item.id).innerText = itemSorteado || "Vazio";
    }

    btnGerar.innerText = "GERAR NOVO";
    btnGerar.disabled = false;
}

// Função para copiar o texto individualmente
function copiar(idElemento, botao) {
    const texto = document.getElementById(idElemento).innerText;
    
    if (texto === "---" || texto === "Erro de carregamento") return;

    navigator.clipboard.writeText(texto).then(() => {
        const textoOriginal = botao.innerText;
        botao.innerText = "Copiado!";
        botao.style.backgroundColor = "#2ecc71"; // Muda para verde temporariamente
        botao.style.color = "white";

        setTimeout(() => {
            botao.innerText = textoOriginal;
            botao.style.backgroundColor = ""; // Volta ao padrão do CSS
            botao.style.color = "";
        }, 1200);
    });
}
