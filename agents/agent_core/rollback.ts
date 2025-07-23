import * as fs from 'fs';
import * as path from 'path';

export class Rollback {
    private snapshotDir: string;

    constructor(snapshotDir: string = '.snapshots') {
        this.snapshotDir = snapshotDir;
        if (!fs.existsSync(this.snapshotDir)) {
            fs.mkdirSync(this.snapshotDir);
        }
    }

    createSnapshot(projectPath: string): void {
        const snapshotId = new Date().toISOString().replace(/:/g, '-');
        const snapshotPath = path.join(this.snapshotDir, snapshotId);
        fs.mkdirSync(snapshotPath);

        const files = this.readDirectory(projectPath);
        files.forEach(file => {
            const destFile = path.join(snapshotPath, path.relative(projectPath, file));
            fs.copyFileSync(file, destFile);
        });
    }

    rollback(snapshotId: string, projectPath: string): void {
        const snapshotPath = path.join(this.snapshotDir, snapshotId);
        if (!fs.existsSync(snapshotPath)) {
            throw new Error(`Snapshot ${snapshotId} not found.`);
        }

        const files = this.readDirectory(snapshotPath);
        files.forEach(file => {
            const destFile = path.join(projectPath, path.relative(snapshotPath, file));
            fs.copyFileSync(file, destFile);
        });
    }

    private readDirectory(dir: string): string[] {
        return fs.readdirSync(dir).reduce((files, file) => {
            const name = path.join(dir, file);
            const isDirectory = fs.statSync(name).isDirectory();
            return isDirectory ? [...files, ...this.readDirectory(name)] : [...files, name];
        }, [] as string[]);
    }
}
