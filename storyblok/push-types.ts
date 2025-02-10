import { $, Glob } from 'bun'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { parseArgs } from 'util'

const BLOKS_DIR = join(import.meta.dir, './bloks/')
const TYPES_DIR = join(import.meta.dir, './types/')
const SPACE_ID = process.env?.SB_SPACE_ID

async function push(components: undefined | string[], all = false) {
    let files = all ? await readdir(BLOKS_DIR) : []
    if (components) {
        files = components.map((name) => `${name}-${SPACE_ID}.json`)
    }
    const filePaths = files.map((fn) => join(BLOKS_DIR, fn)).join(',') // returns a JS array of just short/local paths.
    const { stdout, stderr } =
        await $`storyblok push-components ${filePaths} --space ${SPACE_ID}`
}

async function main() {
    const { values, positionals } = parseArgs({
        args: Bun.argv,
        options: {
            comps: {
                type: 'string',
            },
            all: {
                type: 'boolean',
            },
        },
        strict: true,
        allowPositionals: true,
    })
    const components = values.comps ? values.comps?.split(',') : undefined
    const all_flag = values.all
    try {
        await push(components, all_flag)
    } catch (E) {
        console.log(`Error occured while trying to push: ${components}`)
    }
}

await main()
