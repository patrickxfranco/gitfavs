import { Display } from './display.js'
import { Database } from './database.js'

export const database = new Database()

const display = new Display()

database.loadDatabase()
display.updateTableView()
