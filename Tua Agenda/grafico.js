
function atualizarGraficos() {
    const tiposDeServico = clienteJson.reduce((acc, cliente) => {
        acc[cliente.typeservice] = acc[cliente.typeservice] ? acc[cliente.typeservice] + 1 : 1;
        return acc;
    }, {});

    const agendamentosChart = new Chart(document.getElementById('agendamentosChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(tiposDeServico),
            datasets: [{
                label: 'Quantidade de Agendamentos por Tipo de Serviço',
                data: Object.values(tiposDeServico),
                backgroundColor: '#4CAF50',
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const valoresServicos = clienteJson.reduce((acc, cliente) => {
        acc[cliente.typeservice] = acc[cliente.typeservice] ? acc[cliente.typeservice] + cliente.price : cliente.price;
        return acc;
    }, {});

    const servicosChart = new Chart(document.getElementById('servicosChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(valoresServicos),
            datasets: [{
                label: 'Valor Total por Tipo de Serviço',
                data: Object.values(valoresServicos),
                backgroundColor: ['#FF5733', '#FFBD33', '#FF8333', '#33FF57', '#33FFBD', '#33A0FF'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', atualizarGraficos);