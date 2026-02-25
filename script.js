async function carregarLista(nomeArquivo) {
    try {
        const resposta = await fetch(nomeArquivo, { cache: "no-store" });
        if (!resposta.ok) throw new Error("Erro");
        const texto = await resposta.text();
        return texto.split('\n').map(item => item.trim()).filter(item => item !== "");
    } catch (e) {
        return ["Erro de arquivo"];
    }
}

async function gerarTudo() {
    const btnGerar = document.getElementById('btn-gerar');
    btnGerar.innerText = "SORTEANDO...";
    btnGerar.disabled = true;

    const configs = [
        { arquivo: 'Especie.txt', id: 'res-especie' },
        { arquivo: 'Objeto.txt', id: 'res-objeto' },
        { arquivo: 'Profissao.txt', id: 'res-profissao' },
        { arquivo: 'Roupa.txt', id: 'res-roupa' },
        { arquivo: 'Persona.txt', id: 'res-persona' }
    ];

    for (const item of configs) {
        const lista = await carregarLista(item.arquivo);
        const sorteado = lista[Math.floor(Math.random() * lista.length)];
        document.getElementById(item.id).innerText = sorteado || "Vazio";
    }

    btnGerar.innerText = "GERAR NOVO";
    btnGerar.disabled = false;
}

function copiar(idElemento, botao) {
    const texto = document.getElementById(idElemento).innerText;
    if (texto === "---" || texto === "Erro de arquivo") return;

    navigator.clipboard.writeText(texto).then(() => {
        const original = botao.innerText;
        botao.innerText = "Copiado!";
        setTimeout(() => botao.innerText = original, 1200);
    });
}

function buscarPinterest(idElemento) {
    const texto = document.getElementById(idElemento).innerText;
    if (texto === "---" || texto === "Erro de arquivo") return;

    const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}
