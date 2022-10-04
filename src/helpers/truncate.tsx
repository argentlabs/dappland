export default function truncate(str: string, length: number) {
  if (!str) return ""
  const splitStr = str.split(" ")

  const buildString = () => splitStr.splice(0, length).join(" ")

  if (splitStr.length > length) {
    return buildString() + "..."
  }

  return buildString()
}
