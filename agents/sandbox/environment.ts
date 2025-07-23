export class Sandbox {
    private allowedPaths: string[];

    constructor(allowedPaths: string[]) {
        this.allowedPaths = allowedPaths;
    }

    isPathAllowed(path: string): boolean {
        return this.allowedPaths.some(allowedPath => path.startsWith(allowedPath));
    }

    runInSandbox(callback: () => void): void {
        // This is a placeholder for sandboxing logic.
        // A real implementation would use a more robust sandboxing mechanism.
        console.log('Running in sandbox...');
        callback();
    }
}
