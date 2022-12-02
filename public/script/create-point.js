function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // Função anonima retornando valor
    .then( res => res.json())
    // Estados
    .then(states => {
        // Para cara estados, coloque um estado na variavel e entre no bloco de codigo
        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectdState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectdState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
//Para limpar o conteudo assim que trocar o estado
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    // True para bloquear o campo
    citySelect.disabled = true

    fetch(url)
    // Função anonima retornando valor
    .then( res => res.json())
    // Estados
    .then(cities => {
        // Para cara estados, coloque um estado na variavel e entre no bloco de codigo
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change",getCities)


// Items de coleta selecionados
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    //para cada um deles, vc irá fazer algo no item adicionando um ouvidor de eventos
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

// variavel para colocar os items selecionados no input hidden
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // Add or remove class
    itemLi.classList.toggle("selected")

    // Pegar apenas o Id do item
    const itemId = itemLi.dataset.id
    console.log('ITEM ID: ',itemId)

   

    // Verificar se há items selecionados, se sim
    // Pegar os itens

    const alreadySelected = selectedItems.findIndex( item => {
        // Se for verdadeiro o findIndex, ele vai colocar na variavel o valor q ele achou
        const itemFound = item == itemId
        return itemFound //se retornar true, vai retornar o item e vai colocar no alreadySelected
    })

    // Se já estiver selecionado,
    if(alreadySelected >= 0){
    // tirar da seleção.
    const filteredItems = selectedItems.filter(item =>{
        // quando retornar falso, esse item tem q ser removido do array/filtrado
        const itemIsDifferent = item != itemId //isso retorna false
        return itemIsDifferent
    })
    selectedItems = filteredItems
    }else{
    // se n estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
    }

    console.log('Selected Itens: ',selectedItems)
    // Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems

    
}