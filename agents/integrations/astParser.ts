import * as ts from 'typescript';

export class AstParser {
    parse(content: string): ts.SourceFile {
        return ts.createSourceFile(
            'temp.ts',
            content,
            ts.ScriptTarget.ES2015,
            true
        );
    }
}
