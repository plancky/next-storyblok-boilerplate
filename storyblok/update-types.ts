import { $, Glob } from 'bun'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const BLOKS_DIR = join(import.meta.dir, './bloks/')
const TYPES_DIR = join(import.meta.dir, './types/')
const SPACE_ID = process?.env?.SB_SPACE_ID

async function pull(sep = true) {
    const sepfiles_flag = sep ? '--separate-files' : ''
    const { stdout, stderr } = await $`
    storyblok pull-components \
        --space ${SPACE_ID} \
        --path ${BLOKS_DIR} ${sepfiles_flag} -ppn`
}

async function generate() {
    const fileNames = (await readdir(BLOKS_DIR))
        .filter((fn) => !fn.includes('preset'))
        .map((fn) => join(BLOKS_DIR, fn))
        .join(',') // returns a JS array of just short/local paths.
    const { stdout, stderr } = await $`
    storyblok generate-typescript-typedefs \
        --sourceFilePaths ${fileNames} \
        --destinationFilePath ${join(TYPES_DIR, 'sb-types.d.ts')}`
}

async function main() {
    await pull(true)
    await generate()
}

await main()
