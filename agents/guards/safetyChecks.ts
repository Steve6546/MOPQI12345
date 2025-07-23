import * as readline from 'readline';

export class SafetyChecks {
    async confirm(prompt: string): Promise<boolean> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            rl.question(`${prompt} (y/n): `, answer => {
                rl.close();
                resolve(answer.toLowerCase() === 'y');
            });
        });
    }

    async checkForSensitiveOperations(plan: any): Promise<boolean> {
        for (const task of plan.tasks) {
            if (task.action === 'delete' || task.action === 'refactor_global') {
                const confirmed = await this.confirm(`Are you sure you want to perform a global refactor or delete files?`);
                if (!confirmed) {
                    return false;
                }
            }
        }
        return true;
    }
}
