import * as ts from 'typescript';
import * as fs from 'fs';
import * a as path from 'path';

export class Analyzer {
    analyzeProject(projectPath: string): any {
        const fileNames = this.getProjectFiles(projectPath);
        const analysis: any = {};

        fileNames.forEach(fileName => {
            const content = fs.readFileSync(fileName, 'utf8');
            const sourceFile = ts.createSourceFile(
                fileName,
                content,
                ts.ScriptTarget.ES2015,
                true
            );

            analysis[fileName] = this.analyzeFile(sourceFile);
        });

        return analysis;
    }

    private getProjectFiles(projectPath: string): string[] {
        // For simplicity, we'll just read all .ts files in the project path
        // A more robust implementation would parse tsconfig.json
        return this.readDirectory(projectPath).filter(file => file.endsWith('.ts'));
    }

    private readDirectory(dir: string): string[] {
        return fs.readdirSync(dir).reduce((files, file) => {
            const name = path.join(dir, file);
            const isDirectory = fs.statSync(name).isDirectory();
            return isDirectory ? [...files, ...this.readDirectory(name)] : [...files, name];
        }, [] as string[]);
    }

    private analyzeFile(sourceFile: ts.SourceFile): any {
        const fileAnalysis: any = {
            imports: [],
            classes: [],
            functions: [],
        };

        ts.forEachChild(sourceFile, node => {
            if (ts.isImportDeclaration(node)) {
                fileAnalysis.imports.push(node.moduleSpecifier.getText(sourceFile));
            } else if (ts.isClassDeclaration(node)) {
                fileAnalysis.classes.push(node.name?.getText(sourceFile));
            } else if (ts.isFunctionDeclaration(node)) {
                fileAnalysis.functions.push(node.name?.getText(sourceFile));
            }
        });

        return fileAnalysis;
    }
}
