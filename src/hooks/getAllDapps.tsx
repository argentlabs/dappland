import fs from "fs"
import { readdir } from "fs/promises"
import path from "path"

export const getAllDapps = async () => {
  const dappsDirectory = path.join(process.cwd(), "data")
  const filenames = await readdir(dappsDirectory)

  const paths = filenames
    .filter((filename) => {
      return filename.endsWith(".json")
    })
    .map((filename) => filename.replace(/\.json$/, ""))

  let dapps = []

  for (const el of paths) {
    const dappFile = path.join(process.cwd(), "data", `${el}.json`)
    const content = fs.readFileSync(dappFile, { encoding: "utf8" }).toString()

    if (content) {
      const parsedContent = JSON.parse(content)
      dapps.push({
        ...parsedContent,
        url: `${el.toLowerCase()}`,
      })
    }
  }

  return dapps
}
