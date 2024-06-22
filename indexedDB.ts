import Dexie from 'dexie'
import { INote } from './src/types/types'

class NotesDatabase extends Dexie {
	notes: Dexie.Table<INote, string>

	constructor() {
		super('NotesDatabase')
		this.version(1).stores({
			notes: '++id, headerNote,textNote ,time, fullDate, date, userId'
		})
		this.notes = this.table('notes')
	}
}

const indexedDB = new NotesDatabase()

export default indexedDB
