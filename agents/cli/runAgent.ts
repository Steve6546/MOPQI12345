// TODO: implement
// TODO: Implement CLI
import { Command } from 'commander';

const program = new Command();

program
    .command('agent <action>')
    .description('Run the agent')
    .action((action) => {
        console.log(`Agent action: ${action}`);
    });

program.parse(process.argv);
