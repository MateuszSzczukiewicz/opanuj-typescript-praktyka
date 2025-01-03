import { spawn } from 'child_process';
import { Command } from 'commander';
import { glob } from 'glob';

const program = new Command();

program
  .name('dev')
  .description('Aplikacja do pracy z zadaniami React Pro')
  .argument('[task]', 'Nazwa zadania, nad którym chcesz pracować')
  .action(async (task?: string) => {
    try {
      let viteArgs = ['utils/react', '--open'];

      if (task) {
        const paths = await glob(`tasks/react-pro/${task}`);
        const taskWithoutNumber = task.replace(/^\d+-/, '');
        const alternativePaths = await glob(`tasks/react-pro/*-${taskWithoutNumber}`);

        let allPaths = [...new Set([...paths, ...alternativePaths])].map((path) =>
          path.replace('tasks/react-pro/', ''),
        );

        if (allPaths.length !== 0) {
          viteArgs.push('--open');
          viteArgs.push(allPaths[0]);
        } else {
          console.error(
            `🔍 Upewnij się, że zadanie o nazwie "${task}" lub "*-${taskWithoutNumber}" istnieje`,
          );
          console.info('👉 Uruchamiamy bazową aplikację z listą wszystkich zadań');
        }
      }

      const viteProcess = spawn('vite', viteArgs, {
        stdio: 'inherit',
        shell: true,
      });

      viteProcess.on('error', (err) => {
        console.error('Failed to start Vite:', err);
        process.exit(1);
      });

      process.on('SIGINT', () => {
        viteProcess.kill();
        process.exit();
      });
    } catch (error) {
      console.error(`\n❌ Unexpected error:\n\n ${error}`);
      process.exit(1);
    }
  });

program.parse();
