// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

enum MainHTMLTag{
	Script = 'Script',
	Template = 'Template',
	Style = 'Style'
}

interface VueTag{
	id: MainHTMLTag;
	content: string;
	startIndex: number;
	endIndex?: number;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vue-component-extractor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vue-component-extractor.extractSelectedRangeToComponent', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from vue-component-extractor!');
		const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'vue') {
            const selection = editor.selection;

						const selectedRangeContent = editor.document.getText(selection);
						const fileContent = editor.document.getText();

						const newComponentStartClass = extractFirstHTMLTagClassProperty(selectedRangeContent);

						if (newComponentStartClass) {
							const newComponenteContent = getNewContent(fileContent, selectedRangeContent, newComponentStartClass);
							const newFilePath = getNewFilePath(newComponentStartClass, editor);

							if (!fs.existsSync(newFilePath)) {
								fs.writeFileSync(newFilePath, newComponenteContent);
								vscode.window.showInformationMessage(`New file created at: ${newFilePath}`);
							} else {
								vscode.window.showWarningMessage(`File ${newFilePath} already exists`);
							}
						}

					} else {
            vscode.window.showInformationMessage('Please open a file to use this command');
        }
	});

	

	context.subscriptions.push(disposable);
}

function extractFirstHTMLTagClassProperty(selectedText: string): string | undefined {
	// Regular expression to match the class property of the first HTML tag
	const regex = /<\w+\s+[^>]*class=['"]([^'"]*)['"][^>]*>/;
	const match = selectedText.match(regex);
	if (match) {
			// Extract the class property value from the match
			const classPropertyValue = match[1];
			// Assuming the class property value contains no spaces and is suitable for use as a file name
			return classPropertyValue;
	} else {
			return undefined;
	}
}

function kebabToPascalCase(text: string): string {
	return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function getNewContent(content: string, selectedRange: string, firstClassFromSelectedRange:string): string {
	const scriptTag = {id: MainHTMLTag.Script, startIndex: content.indexOf('<script'), content: `<script> </script> \n`};
	const templateTag = {id: MainHTMLTag.Template, startIndex: content.indexOf('<template'), content: `<template> \n ${selectedRange} \n </template> \n`};
	const styleTag = {id: MainHTMLTag.Style, startIndex: content.indexOf('<style'), endIndex: content.indexOf('</style'), content: `<style> </style> \n`};
	
	const selectedRangeStyleStartIndex = content.indexOf(`.${firstClassFromSelectedRange}`);

	let firstCurlyBraceFound = false;
	let numberOfCurlyBraces = 0;
	let selectedRangeStyleEndIndex = undefined;

		for (let i = selectedRangeStyleStartIndex; !(numberOfCurlyBraces === 0 && firstCurlyBraceFound) && i <= styleTag.endIndex; i++) {
			if(content.charAt(i) === '{'){
				numberOfCurlyBraces++;
				firstCurlyBraceFound = true;
			};
			if(content.charAt(i) === '}'){
				numberOfCurlyBraces--;
				if(firstCurlyBraceFound && numberOfCurlyBraces === 0){
					selectedRangeStyleEndIndex = i + 1;
				}
			};
		}
	

	if(selectedRangeStyleEndIndex){
		const selectedRangeStyleContent = content.substring(selectedRangeStyleStartIndex, selectedRangeStyleEndIndex);
		styleTag.content = `<style>\n${selectedRangeStyleContent}\n</style>\n`;
	}
	
	const vueTags: VueTag[] = [scriptTag, templateTag, styleTag];
	vueTags.sort((a, b) => a.startIndex - b.startIndex);

	return vueTags.reduce((acc: string, current:VueTag ): string => {
		return acc + current.content;
	}, '');
}

function getNewFilePath(StartClassName: string, editor: vscode.TextEditor): string{
	const newComponentStartClassNameInPascalCase = kebabToPascalCase(StartClassName);
	const folderPath = path.dirname(editor.document.uri.fsPath);
	return path.join(folderPath, `${newComponentStartClassNameInPascalCase}.vue`);
}

// This method is called when your extension is deactivated
export function deactivate() {}
