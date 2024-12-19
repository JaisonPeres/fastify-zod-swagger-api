import esbuild from 'esbuild';
import glob from 'tiny-glob';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const copyStaticFiles = require('esbuild-copy-static-files')

void (async () => {
  const entryPoints = await glob('./src/**/*.ts');
  await esbuild.build({
    entryPoints: entryPoints.filter((file: string) => !file.endsWith('.test.ts')),
    outdir: 'dist',
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node18',
    external: [
      'tedious',
      'pg-query-stream',
      'better-sqlite3',
      'mysql2',
      'sqlite3',
      'pg-native',
      'mysql',
      'oracledb',
      'sharp',
      '@aws-sdk/client-s3',
      'ioredis',
      'md5',
    ],
    // plugins: [copyStaticFiles({
    //   src: './src/infra/db/migrations',
    //   dest: './dist/infra/db/migrations',
    //   recursive: true
    // })],
  });
})();
