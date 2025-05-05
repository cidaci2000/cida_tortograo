// Configurações
const CONFIG = {
    atualizacaoAuto: true,       // Atualização automática
    intervaloAtualizacao: 3600000, // 1 hora em milissegundos
    usarDadosReais: false         // Alternar entre API real e simulada
  };

  // Dados simulados (fallback)
  const dadosSimulados = {
    soja: { preco: 125.75, fonte: "SIMULADO", unidade: "sc/60kg" },
    milho: { preco: 68.90, fonte: "SIMULADO", unidade: "sc/60kg" },
    trigo: { preco: 82.30, fonte: "SIMULADO", unidade: "sc/60kg" },
    feijao: { preco: 52.30, fonte: "SIMULADO", unidade: "sc/60kg" }
  };

  // Formata números com 2 casas decimais e tratamento de erro
  function formatarPreco(valor) {
    if (isNaN(parseFloat(valor))) return "0.00";
    return parseFloat(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Simula chamada à API (substitua por chamada real)
  async function buscarDadosAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (CONFIG.usarDadosReais) {
          // Aqui você implementaria a chamada real à API
          // Exemplo com fetch():
          // return fetch('sua_api_aqui')
        } else {
          // Retorna dados simulados com pequenas variações
          resolve({
            soja: { 
              preco: (dadosSimulados.soja.preco + (Math.random() * 2 - 1)).toFixed(2),
              fonte: "CEPEA",
              unidade: "sc/60kg"
            },
            milho: { 
              preco: (dadosSimulados.milho.preco + (Math.random() * 2 - 1)).toFixed(2),
              fonte: "CEPEA", 
              unidade: "sc/60kg"
            },
            trigo: { 
              preco: (dadosSimulados.trigo.preco + (Math.random() * 2 - 1)).toFixed(2),
              fonte: "CONAB",
              unidade: "sc/60kg"
            },
            feijao: { 
                preco: (dadosSimulados.feijao.preco + (Math.random() * 2 - 1)).toFixed(2),
                fonte: "CONAB",
                unidade: "sc/60kg"
            }
          });
        }
      }, 1500); // Simula delay de rede
    });
  }

  // Atualiza a interface com os dados
  function atualizarInterface(dados) {
    const formatarMoeda = (valor) => `R$ ${formatarPreco(valor)}`;
    
    // Soja
    document.getElementById('preco-soja').textContent = formatarMoeda(dados.soja.preco);
    document.getElementById('preco-soja').className = 'price-value';
    document.getElementById('fonte-soja').textContent = `Fonte: ${dados.soja.fonte} | ${dados.soja.unidade}`;
    
    // Milho
    document.getElementById('preco-milho').textContent = formatarMoeda(dados.milho.preco);
    document.getElementById('preco-milho').className = 'price-value';
    document.getElementById('fonte-milho').textContent = `Fonte: ${dados.milho.fonte} | ${dados.milho.unidade}`;
    
    // Trigo
    document.getElementById('preco-trigo').textContent = formatarMoeda(dados.trigo.preco);
    document.getElementById('preco-trigo').className = 'price-value';
    document.getElementById('fonte-trigo').textContent = `Fonte: ${dados.trigo.fonte} | ${dados.trigo.unidade}`;

     // feijao
     document.getElementById('preco-feijao').textContent = formatarMoeda(dados.feijao.preco);
     document.getElementById('preco-feijao').className = 'price-value';
     document.getElementById('fonte-feijao').textContent = `Fonte: ${dados.feijao.fonte} | ${dados.feijao.unidade}`;
    
    // Atualização
    document.getElementById('atualizacao').textContent = 
      `🔄 Última atualização: ${new Date().toLocaleString('pt-BR')}`;
  }

  // Função principal
  async function atualizarCotacoes() {
    try {
      const dados = await buscarDadosAPI();
      atualizarInterface(dados);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      document.getElementById('atualizacao').className = 'update-info error';
      document.getElementById('atualizacao').textContent = 
        '⚠️ Erro ao atualizar. Exibindo dados simulados.';
      atualizarInterface(dadosSimulados);
    }
  }

  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    atualizarCotacoes();
    if (CONFIG.atualizacaoAuto) {
      setInterval(atualizarCotacoes, CONFIG.intervaloAtualizacao);
    }
  });

  // Botão de atualização manual (opcional)
  const btnAtualizar = document.createElement('button');
  btnAtualizar.textContent = 'Atualizar Agora';
  btnAtualizar.style.display = 'block';
  btnAtualizar.style.margin = '5px auto';
  btnAtualizar.style.padding = '5px 10px';
  btnAtualizar.style.backgroundColor = '#3498db';
  btnAtualizar.style.color = 'white';
  btnAtualizar.style.border = 'none';
  btnAtualizar.style.borderRadius = '2px';
  btnAtualizar.style.cursor = 'pointer';
  btnAtualizar.addEventListener('click', () => {
    document.getElementById('atualizacao').textContent = '⌛ Atualizando...';
    atualizarCotacoes();
  });
  document.body.appendChild(btnAtualizar);
 