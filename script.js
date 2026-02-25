async function carregarLista(nomeArquivo) {
    const resposta = await fetch(nomeArquivo);
    const texto = await resposta.text();
    // Divide por linha e remove linhas vazias
    return texto.split('\n').map(item => item.trim()).filter(item => item !== "");
}

async function gerarTudo() {
    const display = document.getElementById('resultado');
    display.innerText = "Carregando...";

    try {
        // Carrega as 5 listas simultaneamente
        const [especies, objetos, personas, profissoes, roupas] = await Promise.all([
            carregarLista('Especie.txt'),
            carregarLista('Objeto.txt'),
            carregarLista('Persona.txt'),
            carregarLista('Profissao.txt'),
            carregarLista('Roupa.txt')
        ]);

        // Sorteia um item de cada (Índice aleatório: Math.random)
        const item1 = especies[Math.floor(Math.random() * especies.length)];
        const item2 = objetos[Math.floor(Math.random() * objetos.length)];
        const item3 = personas[Math.floor(Math.random() * personas.length)];
        const item4 = profissoes[Math.floor(Math.random() * profissoes.length)];
        const item5 = roupas[Math.floor(Math.random() * roupas.length)];

        // Exibe o resultado na tela
        display.innerHTML = `
            <strong>Especie:</strong> ${item1} <br>
            <strong>Objeto:</strong> ${item2} <br>
            <strong>Persona:</strong> ${item3} <br>
            <strong>Profissao:</strong> ${item4} <br>
            <strong>Roupa:</strong> ${item5}
        `;
    } catch (erro) {
        display.innerText = "Erro ao carregar arquivos. Verifique os nomes.";
        console.error(erro);
    }
}