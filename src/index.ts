import * as fs from 'fs'
import * as path from 'path'

const dotenv = require('dotenv')

export class ConfigError extends Error {
  constructor(properties: string[]) {
    super()
    this.message = `add properties to .env file: ${properties.join(', ')}`
    this.name = ConfigError.name
  }
}

export type ConfigRequired<Keys extends readonly string[]> = Readonly<Record<Keys[number], string>>
export type ConfigOptional<Keys extends readonly string[]> = Readonly<Record<Keys[number], string | undefined>>

const loadConfig = <Keys extends readonly string[]>(
  keys: Keys, required: boolean, envFile = '.env'
) => {
  const config = dotenv.parse(
    fs.readFileSync(
      path.join(process.cwd(), envFile)
    )
  )

  if (required) {
    const propertiesNotFound: string[] = []

    for (const key of keys) {
      if (!(key in config)) {
        propertiesNotFound.push(key)
      }
    }

    if (propertiesNotFound.length) {
      throw new ConfigError(propertiesNotFound)
    }
  }

  return config
}

export const loadConfigRequired = <Keys extends readonly string[]>(keys: Keys, envFile?: string) => (
  loadConfig(keys, true, envFile) as ConfigRequired<Keys>
)

export const loadConfigOptional = <Keys extends readonly string[]>(keys: Keys, envFile?: string) => (
  loadConfig(keys, false, envFile) as ConfigOptional<Keys>
)

export const loadPropertyRequired = (key: string, envFile?: string) => (
  loadConfig([key], true, envFile)[key] as string
)

export const loadPropertyOptional = (key: string, envFile?: string) => (
  loadConfig([key], false, envFile)[key] as string | undefined
)
