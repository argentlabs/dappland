import { readdir, readFile } from "fs/promises"
import path from "path"

export const getAllDapps = async (): Promise<
  (DappInfo & { url: string })[]
> => {
  const dappsDirectory = path.join(process.cwd(), "data")
  const filenames = await readdir(dappsDirectory)

  const paths = filenames
    .filter((filename) => {
      return filename.endsWith(".json")
    })
    .map((filename) => filename.replace(/\.json$/, ""))

  const dapps: (DappInfo & { url: string })[] = []

  for (const el of paths) {
    const dappFile = path.join(process.cwd(), "data", `${el}.json`)
    const content = await readFile(dappFile, { encoding: "utf8" }).then((x) =>
      x.toString(),
    )

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
