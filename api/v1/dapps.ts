import type { NextApiHandler } from "next"
import { readdirSync, readFileSync } from "node:fs"
import path from "path"
import { z } from "zod"

const contractAddressSchema = z.object({
  contractAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/, "Not a valid contract address"),
})

const hostSchema = z.object({
  host: z.string(),
})

const dappsPromise = getAllDapps() // share the same data for one instance and multiple requests

// accept ?host=xxx or ?contractAddress=xxx
const dappsHandler: NextApiHandler = async (req, res) => {
  const { host, contractAddress } = req.query

  if (host) {
    res.setHeader("Cache-Control", "s-maxage=86400")
    const result = hostSchema.safeParse({ host })
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message })
    }

    const dapp = await getDappByhost(result.data.host)

    if (!dapp) {
      return res.status(404).json({ error: "Dapp not found" })
    }

    return res.status(200).json(dapp)
  } else if (contractAddress) {
    res.setHeader("Cache-Control", "s-maxage=86400")
    const result = contractAddressSchema.safeParse({ contractAddress })
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message })
    }

    const dapp = await getDappByContractAddress(result.data.contractAddress)

    if (!dapp) {
      return res.status(404).json({ error: "Dapp not found" })
    }

    return res.status(200).json(dapp)
  } else {
    return res.status(400).json({ error: "Invalid query" })
  }
}

export default dappsHandler

function compareHost(host: string, dapp: DappInfo) {
  try {
    const dappHost = new URL(dapp.links.website).host
    return dappHost === host
  } catch (e) {
    return false
  }
}
async function getDappByhost(host: string) {
  const dapps = await dappsPromise
  return dapps.find((dapp) => compareHost(host, dapp))
}

function equalAddress(address1: string, address2: string) {
  return BigInt(address1) === BigInt(address2)
}
function compareContractAddress(contractAddress: string, dapp: DappInfo) {
  return (
    dapp.contracts?.some(({ address }) =>
      equalAddress(address, contractAddress),
    ) ||
    dapp.goerliContracts?.some(({ address }) =>
      equalAddress(address, contractAddress),
    )
  )
}
async function getDappByContractAddress(contractAddress: string) {
  const dapps = await dappsPromise
  return dapps.find((dapp) => compareContractAddress(contractAddress, dapp))
}

async function getAllDapps(): Promise<(DappInfo & { url: string })[]> {
  const dappsDirectory = path.join(process.cwd(), "data")
  const filenames = readdirSync(dappsDirectory)

  const paths = filenames
    .filter((filename) => {
      return filename.endsWith(".json")
    })
    .map((filename) => filename.replace(/\.json$/, ""))

  const dapps: (DappInfo & { url: string })[] = []

  for (const el of paths) {
    const dappFile = path.join(process.cwd(), "data", `${el}.json`)
    const content = readFileSync(dappFile, { encoding: "utf8" }).toString()

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
