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
	index: number
	content: string;
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
            // const selectedRange = new vscode.Range(selection.start, selection.end);
						const selectedRange = editor.document.getText(editor.selection);
						const vueContent = editor.document.getText();

						const newVueContent = getNewContent(vueContent, selectedRange);

						const classProperty = extractFirstHTMLTagClassProperty(selectedRange);

						if (classProperty) {
							const pascalCaseClass = kebabToPascalCase(classProperty);
							const folderPath = path.dirname(editor.document.uri.fsPath);
							const newFilePath = path.join(folderPath, `${pascalCaseClass}.vue`);

							if (!fs.existsSync(newFilePath)) {
								fs.writeFileSync(newFilePath, newVueContent);
								vscode.window.showInformationMessage(`New file created at: ${newFilePath}`);
							} else {
								vscode.window.showWarningMessage(`File ${newFilePath} already exists`);
							}

							const selectedText = editor.document.getText(selection);
							vscode.window.showInformationMessage(`Selected range: ${selectedText}`);
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

function getNewContent(content: string, selectedRange: string): string {
	const scriptStart: VueTag = {id: MainHTMLTag.Script, index: content.indexOf('<script'), content: `<script> </script> \n`};
	const templateStart: VueTag = {id: MainHTMLTag.Template, index: content.indexOf('<template'), content: `<template> \n ${selectedRange} \n </template> \n`};
	const styleStart: VueTag = {id: MainHTMLTag.Style, index: content.indexOf('<style'), content: `<style> </style> \n`};
	
	const vueTags: VueTag[] = [scriptStart, templateStart, styleStart];
	vueTags.sort((a, b) => a.index - b.index);

	return vueTags.reduce((acc: string, current:VueTag ): string => {
		return acc + current.content;
	}, '');
}

// This method is called when your extension is deactivated
export function deactivate() {}
