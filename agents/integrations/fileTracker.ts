export class FileTracker {
    private openFiles: Set<string> = new Set();
    private modifiedFiles: Set<string> = new Set();

    openFile(filePath: string): void {
        this.openFiles.add(filePath);
    }

    modifyFile(filePath: string): void {
        this.modifiedFiles.add(filePath);
    }

    getOpenFiles(): string[] {
        return Array.from(this.openFiles);
    }

    getModifiedFiles(): string[] {
        return Array.from(this.modifiedFiles);
    }
}
