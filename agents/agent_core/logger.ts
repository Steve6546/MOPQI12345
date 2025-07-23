import * as fs from 'fs';

export class Logger {
    private logFile: string;

    constructor(logFile: string = 'agent_log.json') {
        this.logFile = logFile;
    }

    log(entry: any): void {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...entry,
        };

        const logs = this.readLogs();
        logs.push(logEntry);

        fs.writeFileSync(this.logFile, JSON.stringify(logs, null, 2));
    }

    private readLogs(): any[] {
        try {
            const data = fs.readFileSync(this.logFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
}
