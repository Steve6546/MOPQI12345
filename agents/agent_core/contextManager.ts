export class ContextManager {
    private context: any = {};

    updateContext(newContext: any): void {
        this.context = { ...this.context, ...newContext };
    }

    getContext(): any {
        return this.context;
    }
}
