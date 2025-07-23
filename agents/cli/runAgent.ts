import { Analyzer } from '../agent_core/analyzer';
import { Planner } from '../agent_core/planner';
import { Executor } from '../agent_core/executor';
import { ContextManager } from '../agent_core/contextManager';
import { DecisionEngine } from '../agent_core/decisionEngine';
import { Logger } from '../agent_core/logger';
import { Rollback } from '../agent_core/rollback';

const command = process.argv[2];
const args = process.argv.slice(3);

const analyzer = new Analyzer();
const planner = new Planner();
const executor = new Executor();
const contextManager = new ContextManager();
const decisionEngine = new DecisionEngine();
const logger = new Logger();
const rollback = new Rollback();

switch (command) {
    case 'agent':
        if (args[0] === 'run') {
            const projectPath = process.cwd();

            rollback.createSnapshot(projectPath);
            logger.log({ action: 'snapshot_created' });

            const analysis = analyzer.analyzeProject(projectPath);
            contextManager.updateContext({ analysis });
            logger.log({ action: 'analysis_complete', analysis });

            const decision = decisionEngine.decide(analysis);
            logger.log({ action: 'decision_made', decision });

            if (decision === 'PROCEED') {
                const plan = planner.createPlan(analysis);
                contextManager.updateContext({ plan });
                logger.log({ action: 'plan_created', plan });

                executor.executePlan(plan);
                logger.log({ action: 'plan_executed' });
            } else {
                console.log('Agent decided to stop.');
            }
        }
        break;

    case 'assistant':
        // Placeholder for assistant logic
        console.log(`Assistant command: ${args.join(' ')}`);
        break;

    default:
        console.log('Unknown command');
        break;
}
