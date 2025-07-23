export interface Plugin {
    name: string;
    description: string;
    execute(context: any): Promise<any>;
}
