import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publish = path.join(root, 'dist')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const apps = [
  ['portal', '/'],
  ['proposta-1', '/proposta-1/'],
  ['proposta-2', '/proposta-2/'],
  ['proposta-3', '/proposta-3/'],
  ['proposta-4', '/proposta-4/'],
  ['proposta-5', '/proposta-5/'],
]

function run(args, cwd, env) {
  const result = spawnSync(npm, args, { cwd, env, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

rmSync(publish, { recursive: true, force: true })
mkdirSync(publish, { recursive: true })

for (const [dir, base] of apps) {
  const cwd = path.join(root, dir)
  run(['ci'], cwd, process.env)
  run(['run', 'build'], cwd, { ...process.env, VITE_BASE: base })
  const target = dir === 'portal' ? publish : path.join(publish, dir)
  cpSync(path.join(cwd, 'dist'), target, { recursive: true })
}
