import { AbsMacLanguage } from './dist/index.js'
import fs from 'fs/promises'

const file = await fs.readFile('./test/test')
const data = file.toString()

const cursor = AbsMacLanguage.parser.parse(data).cursor()

do {
	console.log(cursor.type.name)
	console.log(data.slice(cursor.from, cursor.to))
	console.log('\n\n')
} while(cursor.next())

// cursor.enter()

// cursor.childAfter()