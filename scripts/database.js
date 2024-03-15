import { Profile } from './profile.js'

export class Database {
  data = []

  saveDatabase() {
    localStorage.setItem('@profiles', JSON.stringify(this.data))
  }

  loadDatabase() {
    const json = JSON.parse(localStorage.getItem('@profiles')) || []
    json.forEach(({ name, login, public_repos, followers }) => {
      const profile = new Profile()
      profile.name = name
      profile.login = login
      profile.public_repos = public_repos
      profile.followers = followers
      this.data = [...this.data, profile]
    })
  }

  updateData(newDatabase) {
    this.data = newDatabase
  }
}
