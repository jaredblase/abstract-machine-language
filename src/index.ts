import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, foldNodeProp, foldInside } from "@codemirror/language"
import { completeFromList } from "@codemirror/autocomplete"
import { styleTags, tags as t } from "@lezer/highlight"

export const AbsMacLanguage = LRLanguage.define({
	parser: parser.configure({
		props: [
			foldNodeProp.add({
				DataSection: foldInside,
				LogicSection: foldInside
			}),
			styleTags({
				Symbol: t.number,
				Identifier: t.variableName,
				LineComment: t.lineComment,
				StorageType: t.bool,
				FSACommand: t.className,
				PDACommand: t.className,
				TMCommand: t.className,
				".DATA": t.string,
				".LOGIC": t.string,
			})
		]
	}),
	languageData: {
		commentTokens: { line: ";;" }
	}
})

export const AbsMacCompletion = AbsMacLanguage.data.of({
	autocomplete: completeFromList([
		{ label: '.DATA', type: 'text' },
		{ label: '.LOGIC', type: 'text' },
		{ label: 'STACK', type: 'type' },
		{ label: 'QUEUE', type: 'type' },
		{ label: 'TAPE', type: 'type' },
		{ label: '2D_TAPE', type: 'type' },
		{ label: 'SCAN', type: 'keyword' },
		{ label: 'PRINT', type: 'keyword' },
		{ label: 'SCAN RIGHT', type: 'keyword' },
		{ label: 'SCAN LEFT', type: 'keyword' },
		{ label: 'READ', type: 'keyword' },
		{ label: 'WRITE', type: 'keyword' },
		{ label: 'RIGHT', type: 'keyword' },
		{ label: 'LEFT', type: 'keyword' },
		{ label: 'UP', type: 'keyword' },
		{ label: 'DOWN', type: 'keyword' },
		{ label: 'accept', type: 'keyword' },
		{ label: 'reject', type: 'keyword' },
	])
})

export function AbsMac() {
	return new LanguageSupport(AbsMacLanguage, [AbsMacCompletion])
}
