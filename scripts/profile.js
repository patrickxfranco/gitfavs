import { database } from './main.js'

export class Profile {
  name = undefined
  login = undefined
  public_repos = undefined
  followers = undefined

  async searchOnGitHub() {
    const githubUrl = `https://api.github.com/users/${this.login}`
    return fetch(githubUrl)
      .then((data) => data.json())
      .then(({ name, public_repos, followers }) => ({
        name,
        public_repos,
        followers,
      }))
  }

  async addProfileOnDatabase() {
    let profileExists = database.data.find((databaseProfile) => {
      return databaseProfile.login === this.login
    })

    profileExists = typeof profileExists !== 'undefined' ? true : false

    if (profileExists) {
      alert('Este perfil já está nos seus favoritos')
      return
    }

    const apiResponse = await this.searchOnGitHub()

    this.name = apiResponse.name
    this.followers = apiResponse.followers
    this.public_repos = apiResponse.public_repos

    const newDatabaseContent = [this, ...database.data]
    database.updateData(newDatabaseContent)
    database.saveDatabase()
  }

  removeProfileOfDatabase() {
    const filteredDatabase = database.data.filter((profile) => {
      return profile.login !== this.login
    })
    database.updateData(filteredDatabase)
    database.saveDatabase()
  }
}
