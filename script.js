async function carregarLista(nomeArquivo) {
    try {
        const resposta = await fetch(nomeArquivo);
        if (!resposta.ok) throw new Error("Arquivo não encontrado");
        const texto = await resposta.text();
        return texto.split('\n').map(item => item.trim()).filter(item => item !== "");
    } catch (e) {
        console.error("Erro ao carregar:", nomeArquivo);
        return ["Erro no arquivo"];
    }
}

async function gerarTudo() {
    // Referências aos arquivos SEM acento
    const listas = [
        { arquivo: 'Especie.txt', id: 'res-especie' },
        { arquivo: 'Objeto.txt', id: 'res-objeto' },
        { arquivo: 'Profissao.txt', id: 'res-profissao' },
        { arquivo: 'Roupa.txt', id: 'res-roupa' },
        { arquivo: 'Persona.txt', id: 'res-persona' }
    ];

    for (const item of listas) {
        const dados = await carregarLista(item.arquivo);
        const sorteado = dados[Math.floor(Math.random() * dados.length)];
        document.getElementById(item.id).innerText = sorteado || "Vazio";
    }
}

function copiar(idElemento) {
    const texto = document.getElementById(idElemento).innerText;
    if (texto === "---" || texto === "Erro no arquivo") return;

    navigator.clipboard.writeText(texto).then(() => {
        // Feedback visual simples
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "OK!";
        setTimeout(() => btn.innerText = originalText, 1000);
    });
}
