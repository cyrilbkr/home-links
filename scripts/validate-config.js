import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { validateConfig } from '../src/utils/config-validator.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const configPath = join(__dirname, '../public/config.json')

try {
  const configContent = readFileSync(configPath, 'utf-8')
  const config = JSON.parse(configContent)

  const result = validateConfig(config)

  if (result.valid) {
    console.log('✅ Config is valid!')
    process.exit(0)
  } else {
    console.error('❌ Config validation failed:')
    result.errors.forEach(error => {
      console.error(`  - ${error}`)
    })
    process.exit(1)
  }
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`❌ Config file not found: ${configPath}`)
  } else if (error instanceof SyntaxError) {
    console.error(`❌ Invalid JSON in config file: ${error.message}`)
  } else {
    console.error(`❌ Error reading config: ${error.message}`)
  }
  process.exit(1)
}
