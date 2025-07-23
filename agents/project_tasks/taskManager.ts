import * as fs from 'fs';
import * as yaml from 'js-yaml';

export class TaskManager {
    private tasksFile: string;

    constructor(tasksFile: string = 'project_tasks.yaml') {
        this.tasksFile = tasksFile;
    }

    getTasks(): any {
        try {
            const data = fs.readFileSync(this.tasksFile, 'utf8');
            return yaml.load(data);
        } catch (error) {
            return { tasks: [] };
        }
    }

    updateTask(taskId: number, status: string): void {
        const tasks = this.getTasks();
        const task = tasks.tasks.find((t: any) => t.id === taskId);

        if (task) {
            task.status = status;
            this.saveTasks(tasks);
        }
    }

    addTask(task: any): void {
        const tasks = this.getTasks();
        tasks.tasks.push(task);
        this.saveTasks(tasks);
    }

    private saveTasks(tasks: any): void {
        const yamlStr = yaml.dump(tasks);
        fs.writeFileSync(this.tasksFile, yamlStr, 'utf8');
    }
}
