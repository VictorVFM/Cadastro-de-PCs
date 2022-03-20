'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

    const closeModal = () => {
        clearFields()
        document.getElementById('modal').classList.remove('active')       
    }


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_computer')) ?? []
const setLocalStorage = (dbComputer) => localStorage.setItem("db_computer", JSON.stringify(dbComputer))

//CRUD- Create read update delete
const deleteComputer = (index) =>{
    const dbComputer = readComputer()
    dbComputer.splice(index,1)
    setLocalStorage(dbComputer)
}


const updateComputer = (index,computer) => {
    const dbComputer = readComputer()
    dbComputer[index] = computer
    setLocalStorage(dbComputer)

}

const readComputer = () => getLocalStorage()


const createComputer = (computer) => {
    const dbComputer = getLocalStorage()
    dbComputer.push (computer)
    setLocalStorage(dbComputer)
}

const isValidFields = () =>{
  return document.getElementById('form').reportValidity()
}

//Intereação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('patrimonio').dataset.index = 'new'
}

const saveComputer = () => {
    if(isValidFields()){
        const computer = {
            localizacao: document.getElementById('local').value,
            andar: document.getElementById('andar').value,
            setor: document.getElementById('setor').value,
            sala: document.getElementById('sala').value,
            ip: document.getElementById('ip').value,
            anydesk: document.getElementById('anydesk').value,
            patrimonio: document.getElementById('patrimonio').value,
            ramal: document.getElementById('ramal').value
        }
        const index = document.getElementById('local').dataset.index
        if(index == 'new'){
            createComputer(computer)
            updateTable()
            closeModal()

        }else{
            updateComputer(index,computer)
            updateTable()
            closeModal()
        }
        
        

    }
}

const createRow = (computer, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `    
    <td>${computer.localizacao}</td>
    <td>${computer.andar}</td>
    <td>${computer.setor}</td>
    <td>${computer.sala}</td>
    <td>${computer.ip}</td>
    <td>${computer.anydesk}</td>
    <td>${computer.patrimonio}</td>
    <td>${computer.ramal}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
     </td>
    `
    document.querySelector('#tableComputer>tbody').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tableComputer>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbComputer = readComputer()
    clearTable()
    dbComputer.forEach(createRow)
}

const fillFields = (computer) =>{
    document.getElementById('local').value = computer.localizacao
    document.getElementById('andar').value = computer.andar
    document.getElementById('setor').value = computer.setor
    document.getElementById('sala').value = computer.sala
    document.getElementById('ip').value = computer.ip
    document.getElementById('anydesk').value = computer.anydesk
    document.getElementById('patrimonio').value = computer.patrimonio
    document.getElementById('ramal').value = computer.ramal
    document.getElementById('local').dataset.index = computer.index
}

const editComputer = (index) => {
    const computer = readComputer()[index]
    computer.index= index
    fillFields(computer)
    openModal()
}

const editDelete = (event) => {
    if(event.target.type == 'button'){
        
        const [action,index] = event.target.id.split('-')

        if(action == 'edit'){
            editComputer(index)
        }else{
            const computer = readComputer()[index]
            const response = confirm(`Deseja realmente excluir a maquina ${computer.patrimonio}`)
            if(response){
            deleteComputer(index)
            updateTable()
            }   
        }
    }
}

updateTable()

    //EVENTOS
document.getElementById('cadastrarMaquina')
        .addEventListener('click', openModal)

document.getElementById('modalClose')
        .addEventListener('click', closeModal)

document.getElementById('salvar')
        .addEventListener('click',saveComputer)

document.querySelector('#tableComputer>tbody')
        .addEventListener('click', editDelete)