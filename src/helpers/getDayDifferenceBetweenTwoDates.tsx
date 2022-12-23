export default function getDayDifferenceBetweenTwoDates(
  day1: Date,
  day2: Date,
) {
  const daysBetween = (day1.getTime() - day2.getTime()) / (1000 * 60 * 60 * 24)
  return daysBetween < 28
}
