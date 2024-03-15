import { Profile } from './profile.js'
import { database } from './main.js'

export class Display {
  input = document.querySelector('#input-search')
  button = document.querySelector('.search button')
  tableBody = document.querySelector('tbody')

  constructor() {
    this.button.addEventListener('click', () => this.addProfile())
  }

  cleanTable() {
    const tableRows = this.tableBody.querySelectorAll('tr')
    tableRows.forEach((row) => {
      row.remove()
    })
  }

  createTable() {
    database.data.forEach((profile) => {
      const tableRow = document.createElement('tr')
      tableRow.innerHTML = `
      <td class="user">
      <img src="https://github.com/${profile.login}.png" alt="Imagem de ${profile.name}" />
      <a href="https://github.com/${profile.login}" target="_blank">
        <p>${profile.name}</p>
        <span>${profile.login}</span>
      </a>
      </td>
      <td class="repositories">${profile.public_repos}</td>
      <td class="followers">${profile.followers}</td>
      <td><button class="remove">&times;</button></td>
      `
      this.tableBody.append(tableRow)
      tableRow.querySelector('button').addEventListener('click', () => {
        const isOk = confirm('Tem certeza que deseja remover este perfi da lista de favoritos?')
        if (isOk) profile.removeProfileOfDatabase()
        this.updateTableView()
      })
    })
  }

  updateTableView() {
    this.cleanTable()
    this.createTable()
  }

  async addProfile() {
    const inputIsEmpty = this.input.value == '' ? true : false

    if (inputIsEmpty) {
      alert('Você precisa escrever algum usuário do GitHub para poder adiciona-lo a lista de favoritos')
      return
    }

    const profile = new Profile()
    profile.login = this.input.value
    await profile.addProfileOnDatabase()

    this.input.value = ''
    this.updateTableView()
  }
}
