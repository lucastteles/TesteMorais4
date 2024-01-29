var precosPorFornecedor = {
    'Light': 1.09,
    'Eletropaulo': 0.58,
    'Elektro':0.87,
    '(CPFL-Piratininga)': 0.72,
    '(CPFL-Paulista)':0.87,
    'Bandeirante Energia S/A.': 0.72,
    'Companhia de Eletricidade do Estado da Bahia(Coelba)': 0.90,
    'CEB Distribuição S/A': 0.72,
    'Espírito Santo Centrais Elétricas S/A.': 0.72,
    'Empresa Luz e Força Santa Maria S/A.': 0.87,
    'Celg Distribuição S.A.': 0.77,
    'Cemig': 0.94,
    'Copel': 0.92,
    'Celesc':0.72,
    'Companhia Energética do Rio Grande do Norte': 0.90,
    'Companhia de Energia Elétrica do Estado do Tocantins':1.01,
};

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('graficoEconomiaTotal').getContext('2d');

    let anos = [];
    let economiaPorAno = [];

    for (let i = 0; i <= 30; i += 5) {
        anos.push(i);
        economiaPorAno.push(0);
    }

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: anos,
            datasets: [{
                label: 'Economia Total por Ano',
                data: economiaPorAno,
                backgroundColor: '#ba8812',
                borderColor: '#cfae4b',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ccc' 
                    }
                },
                x: {
                    ticks: {
                        color: '#ccc'
                    }
                }
            },
            plugins: {
            legend: {
                labels: {
                    color: '#ccc' 
                }
            }
        }

        }
    });

    document.getElementById('calculatorForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const valorConta = parseFloat(document.getElementById('valorConta').value);
        const cidade = document.getElementById('cidade').value;
        const fornecedor = document.getElementById('fornecedor').value;

        const precoFornecedor = precosPorFornecedor[fornecedor];

        const resultado = (valorConta / precoFornecedor) / 117 * 3800;

        const resultadoComAcrescimo = resultado * 1.3752;

        const valorArredondado = Math.round(resultadoComAcrescimo);

        const calculoplayback = resultado / valorConta;
        const payback = (calculoplayback / 12);

        const economiaAnual = payback * valorConta;
        const economiaTotal = economiaAnual * 360 * 1.15;

        const formatarMoeda = (valor) => {
            return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }

        const resultadoFormatado = formatarMoeda(resultado);
        const valorArredondadoFormatado = formatarMoeda(valorArredondado);
        const paybackFormatado = payback.toFixed(2).replace('.', ',');
        const economiaTotalFormatada = formatarMoeda(economiaTotal);

        document.getElementById('resultado').innerHTML = `
            <div class=investimento>
                <h1 class="resultado-titulo">.</h1>

                <div class="resultado-conta">
                    <p>Estimativa de investimento:</p>
                    <p>De <span class="valor-estimado">${resultadoFormatado}</span> - 
                    <span class="valor-arredondado">${valorArredondadoFormatado}</span>.</p>
                </div>

                <div class="resultado-conta">
                    <p>Payback estimado é de:</p>
                    <p><span class="payback">${paybackFormatado}</span> anos.</p> 
                </div>

                <div class="resultado-conta">
                    <p>A economia total em 30 anos será de:</p>
                    <p><span class="economia-total">${economiaTotalFormatada}</span>.</p>
                </div>
            </div>
           
        `;

        for (let i = 0; i <= 30; i += 5) {
            economiaPorAno[i / 5] = economiaTotal * i / 30;
        }

        chart.data.datasets[0].data = economiaPorAno;
        chart.update();

      
        document.getElementById('graficoContainer').style.display = 'block';

        
    });
});