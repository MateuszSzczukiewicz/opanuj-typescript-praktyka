import { startVitest } from 'vitest/node';

interface TestOptions {
  watch: boolean;
}

function getTaskName(pathToTask: string) {
  return pathToTask.split('/').pop();
}

async function runVitest(pathToTask: string, options: TestOptions) {
  const isReactTask = pathToTask.includes('react');
  const vitest = await startVitest('test', [pathToTask], {
    run: !options.watch,
    watch: options.watch,
    config: isReactTask ? 'vitest.config.react.ts' : 'vitest.config.node.ts',
  });

  if (!vitest) {
    throw new Error(`❌ Nie udało się uruchomić testów - poinformuj nas o tym."`);
  }

  const [fileTask] = vitest.state.getFiles() || [];
  const testFile = vitest.state.getReportedEntity(fileTask);
  const testResults = testFile?.task.result?.state;
  return testResults === 'pass';
}

export async function startTest(pathToTask: string, options: TestOptions = { watch: false }) {
  try {
    console.log(`\n👉 Sprawdzam zadanie "${pathToTask}"...`);

    const isTestPassed = await runVitest(pathToTask, options);

    if (isTestPassed) {
      console.log(`\n✅ Gratulacje! Zadanie "${getTaskName(pathToTask)}" zaliczone!`);
    } else {
      console.error(`\n❌ Zadanie nie zostało zaliczone :(`);
    }
  } catch (error) {
    console.error(`\n❌ Coś poszło nie tak :( \n\n`);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
