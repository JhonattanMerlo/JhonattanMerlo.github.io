const clienteJson = [
    {id: 1, name: 'Raimunda da Silva', date: '01/06/2024', typeservice: 'Manicure', price: 199.99, cancelado: false},
    {id: 2, name: 'Daniele Moraes', date: '11/06/2024', typeservice: 'Corte de Cabelo', price: 150.99, cancelado: false},
    {id: 3, name: 'Paulo Matos', date: '15/06/2024', typeservice: 'Barba', price: 32.99, cancelado: false},
    {id: 4, name: 'Karolina Borges', date: '21/06/2024', typeservice: 'Coloração', price: 79.99, cancelado: false},
    {id: 5, name: 'Jurema Noraldino', date: '22/06/2024', typeservice: 'Pedicure', price: 100.00, cancelado: false},
    {id: 6, name: 'Roberta Reis', date: '24/06/2024', typeservice: 'Maquiagem', price: 82.99, cancelado: false},
    {id: 7, name: 'Emely Cunha', date: '25/06/2024', typeservice: 'Manicure', price: 199.99, cancelado: false},
    {id: 8, name: 'Sérgio Godoy', date: '30/06/2024', typeservice: 'Tratamentos Faciais', price: 250.00, cancelado: false}
];

//popup
const popup = document.getElementById('popup');
const fecharPopup = document.getElementById('fecharPopup');
const enviarCancel = document.getElementById('EnviarCancel');
const inputMotivo = document.querySelector('input[type="text"]');
let agendamentoCancelado = null; 

//atualizar a tabela
function atualizarTabela() {
    const tabela = document.querySelector('.cliente-area');
    tabela.innerHTML = `
        <tr>
            <th>Data</th>
            <th>Nome</th>
            <th>Tipo de serviço</th>
            <th>Valor</th>
            <th>Cancelamento</th>
        </tr>
    `;

    clienteJson.forEach((cliente, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('models');

        // Preencher os dados
        tr.innerHTML = `
            <td class="datacorte">${cliente.date}</td>
            <td class="nomecliente">${cliente.name}</td>
            <td class="tiposerv">${cliente.typeservice}</td>
            <td class="preco">R$ ${cliente.price.toFixed(2)}</td>
            <td>
                ${cliente.cancelado ? 
                    `<span style="color: red;">Cancelado</span>` : 
                    `<button class="abrirPopup">Cancela</button>`
                }
            </td>
        `;

        tabela.appendChild(tr);
    });

    document.querySelectorAll('.abrirPopup').forEach((botao, index) => {
        botao.addEventListener('click', () => {
            
            agendamentoCancelado = clienteJson[index];

            
            popup.style.display = 'flex';
        });
    });
}

//atualizar o resumo
function atualizarResumo() {
    const totalAgendamentos = clienteJson.length;
    const totalCancelamentos = clienteJson.filter(cliente => cliente.cancelado).length;
    const totalValor = clienteJson.reduce((total, cliente) => cliente.cancelado ? total : total + cliente.price, 0).toFixed(2);

    document.getElementById('totalAgendamentos').textContent = totalAgendamentos;
    document.getElementById('totalCancelamentos').textContent = totalCancelamentos;
    document.getElementById('totalValor').textContent = `R$ ${totalValor}`;
}

//fechar o popup
fecharPopup.addEventListener('click', () => {
    popup.style.display = 'none';
});


enviarCancel.addEventListener('click', () => {
    const motivo = inputMotivo.value;

    if (motivo.trim() === '') {
        alert('Por favor, informe o motivo do cancelamento.');
        return;
    }

    
    if (agendamentoCancelado) {
        agendamentoCancelado.cancelado = true;
        agendamentoCancelado.motivoCancelamento = motivo;
    }

    
    popup.style.display = 'none';
    inputMotivo.value = '';

    
    atualizarTabela();
    atualizarResumo();
});


document.addEventListener('DOMContentLoaded', () => {
    atualizarTabela();
    atualizarResumo();
});


