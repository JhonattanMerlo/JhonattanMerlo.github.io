//Visualizaçao de senha
function toggleSenhaVisibility() {
    var senhaInput = document.getElementById('senha');
    var toggleIcon = document.getElementById('togglePassword');

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        toggleIcon.textContent = "👁️";
    } else {
        senhaInput.type = "password";
        toggleIcon.textContent = "👁️";
    }
}



function fazerLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;


    // Verificação de email e senha
    if (email === 'admin@agenda.com' && senha === '123456') {
        window.location.href = 'central_usuario.html';
        return false; 
    } 
    else {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = 'E-mail ou senha incorretos.';
        return false; 
    }
}

clienteJson.map((item, index) => {
    
    let clienteItem = document.querySelector('.models').cloneNode(true)
    clienteItem.style.display = "";
   
    document.querySelector('.cliente-area').append(clienteItem)

    //preencher os dados
    clienteItem.querySelector('.datacorte').innerHTML = item.date
    clienteItem.querySelector('.nomecliente').innerHTML = item.name
    clienteItem.querySelector('.tiposerv').innerHTML = item.typeservice
    clienteItem.querySelector('.preco').innerHTML = `R$ ${item.price.toFixed(2)}`

});