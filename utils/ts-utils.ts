import { readdirSync } from 'fs';
import path from 'path';
import {
  CompilerOptions,
  createProgram,
  DiagnosticCategory,
  getPreEmitDiagnostics,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

const getTsConfig = (searchPath?: string): CompilerOptions => {
  // Try to find tsconfig in the file's directory first
  let configPath = searchPath
    ? path.resolve(path.dirname(searchPath), 'tsconfig.json')
    : path.resolve(process.cwd(), 'tsconfig.json');

  // Check if it's a react-pro task, and if so, try to find the tsconfig in react-pro dir
  if (!sys.fileExists(configPath) && searchPath?.includes('react-pro')) {
    const reactProPath = searchPath.split('react-pro')[0] + 'react-pro';
    configPath = path.resolve(reactProPath, 'tsconfig.json');
  }

  // If local tsconfig doesn't exist, fall back to root tsconfig
  if (searchPath && !sys.fileExists(configPath)) {
    configPath = path.resolve(process.cwd(), 'tsconfig.json');
  }

  const { config, error } = readConfigFile(configPath, sys.readFile);

  if (error) {
    throw new Error(`Failed to read tsconfig.json: ${error.messageText}`);
  }

  const { options } = parseJsonConfigFileContent(config, sys, path.dirname(configPath));

  return options;
};

export function getCompilerDiagnostics(
  pathToFile: string,
  inlineOptions?: CompilerOptions,
): string[] {
  const tsConfigOptions = getTsConfig(pathToFile);
  const fileDir = path.dirname(pathToFile);
  const declarationFiles = readdirSync(fileDir)
    .filter((file) => file.endsWith('.d.ts'))
    .map((file) => path.join(fileDir, file));

  const filesToInclude = [pathToFile, ...declarationFiles];

  const program = createProgram(filesToInclude, {
    ...tsConfigOptions,
    ...inlineOptions,
  });
  const diagnostics = getPreEmitDiagnostics(program);
  return diagnostics
    .filter((diagnostic) => diagnostic.category === DiagnosticCategory.Error)
    .map((diagnostic) => {
      if (typeof diagnostic.messageText === 'string') {
        return diagnostic.messageText;
      }
      return diagnostic.messageText.messageText;
    });
}
