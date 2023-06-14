//funcoes auxiliares ou uteis

let modalKey = 0
//variavel para a quantidade de produtos
let quantProdutos = 1

let cart = []

// funcoes auxiliares
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)
const obrigado = document.querySelector('.compra_finalizada')

//abre a janela modal
const abrirModal = () => {
    seleciona('.ProdutoWindowArea').style.opacity = 0
    seleciona('.ProdutoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.ProdutoWindowArea').style.opacity = 1, 150)
}

//fecha a janela modal
const fecharModal = () => {
    seleciona('.ProdutoWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.ProdutoWindowArea').style.display = 'none', 500)
}

//botao que fecha a janela modal
const botoesFechar = () => {

    // BOTOES FECHAR MODAL
    selecionaTodos('.ProdutoInfo--cancelButton, .ProdutoInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

//FUNCAO QUE PUXA AS INFORMACOES DO PRODUTO E ADICIONA NA DIV
const preencheDadosProduto = (ProdutoItem, item,index ) => {
    ProdutoItem.setAttribute('data-key', index)
    ProdutoItem.querySelector('data-key', index)
    ProdutoItem.querySelector('.Produto-item--img img').src = item.img
    ProdutoItem.querySelector('.Produto-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    ProdutoItem.querySelector('.Produto-item--name').innerHTML = item.name
    
}

//FUNCAO QUE ADICIONA AS INFORMAÇOES DO PRODUTO NA JANELA MODAL
const preencheDadosModal = (item) => {
    seleciona('.ProdutoBig img').src = item.img
    seleciona('.ProdutoInfo h1').innerHTML = item.name
    seleciona('.ProdutoInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
}

//identificação dos produtos
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .Produto-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.Produto-item').getAttribute('data-key')
    console.log('Produto clicada ' + key)
    console.log(produtoJson[key])

    // garantir que a quantidade inicial de Produtos é 1
    quantProdutos = 1

    // Para manter a informação de qual produto foi clicada
    modalKey = key

    return key
}
const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.ProdutoInfo--qtmais').addEventListener('click', () => {
        quantProdutos++
        seleciona('.ProdutoInfo--qt').innerHTML = quantProdutos
    })

    seleciona('.ProdutoInfo--qtmenos').addEventListener('click', () => {
        if(quantProdutos > 1) {
            quantProdutos--
            seleciona('.ProdutoInfo--qt').innerHTML = quantProdutos	
        }
    })
}

//adicao das informacoes do produto no carrinho
const adicionaNoCarrinho= () => {
    seleciona('.ProdutoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar ao carrinho')

        console.log("Produto "+ modalKey)
        console.log("Quant. " + quantProdutos)

        //preco
        let price = seleciona('.ProdutoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
        console.log(price)
        
        //identificacao do produto
        let identificador = produtoJson[modalKey].id

        //verificacao para ver se tem aquele mesmo produto no carrinho
        let key = cart.findIndex((item) => item.identificador == identificador)
        console.log('esta é a key= '+ key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantProdutos
        } else {
            // adicionar objeto pizza no carrinho
            let Produto = {
                identificador,
                id: produtoJson[modalKey].id,
                qt: quantProdutos,
                price: produtoJson[modalKey].price 
            }
            cart.push(Produto)
            console.log(Produto)
            console.log('Sub total R$ ' + (Produto.qt * Produto.price).toFixed(2))
        }
        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

//abre o carrinho
const abrirCarrinho = () => {
   
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('main').style.display = 'flex' // mostrar barra superior
        
    }

}

//abre o carrinho apertando o botão do carrinho
const abrirbotao = () =>{
        seleciona('.menu-openner').addEventListener('click', () => {
            console.log('teste2')
        if(cart.length > 0){
            seleciona('.blank-menu').style.display = 'none'
            seleciona('.cart--area').style.display = 'flex'
            seleciona('aside').classList.add('show')
		    seleciona('aside').style.display = 'flex'
        }
        else{
            seleciona('.cart--area').style.display = 'none'
            seleciona('.blank-menu').style.display = 'flex'
            seleciona('aside').classList.add('show')
		    seleciona('aside').style.display = 'flex'
        }
        })
}

// fechar o carrinho com o botão X
const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () =>{
        seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
    })
}

//atualiza as informações da janela do carrinho
const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('.blank-menu').style.display = 'none'
        seleciona('.cart--area').style.display = 'flex'
		seleciona('aside').classList.add('show')

		// zerar o .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let ProdutoItem = produtoJson.find( (item) => item.id == cart[i].id )
			console.log(ProdutoItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			

			let ProdutoName = `${ProdutoItem.name}`

			// preencher as informacoes
			cartItem.querySelector('img').src = ProdutoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = ProdutoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		}
		 //calculo do desconto
         //0 pois os produtos nao possuem desconto
         desconto = subtotal * 0
         total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML =`R$ ${subtotal.toFixed(2)}`
		seleciona('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
		seleciona('.total span:last-child').innerHTML    = `R$ ${total.toFixed(2)}`

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

//ao apertar o botão FINALIZAR A COMPRA a janela do carrinho se fecha e abre a janela "OBRIGADO PELA SUA COMPRA"
const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
        seleciona('.menu-openner span').innerHTML = 0
        cart.length=0
        obrigado.style.display = 'flex' 
    })
}

//janela do OBRIGADO PELA SUA COMPRA
obrigado.addEventListener('click', (e)   =>{
    obrigado.style.display = 'none'
})

//Mapeia produtoJson para gerar a lista dos produtos 
produtoJson.map((item, index) =>{
    
    let ProdutoItem = document.querySelector('.models .Produto-item').cloneNode(true)
    seleciona('.Produto-area').append(ProdutoItem)
    //preenche os dados de cada produto
    preencheDadosProduto(ProdutoItem,item,index)

    //Produto Clicado
    ProdutoItem.addEventListener('click', (e)   =>{
        e.preventDefault()
        console.log('Clicou ')
        let chave = pegarKey(e)

        //abrir a janela modal
        abrirModal()
        //preenchimento dos dados
       preencheDadosModal(item)
        //define a quantidade inicial como 1
       seleciona('.ProdutoInfo--qt').innerHTML = quantProdutos
        
        
        
    })
    botoesFechar()
})
    
mudarQuantidade()
adicionaNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
abrirbotao()