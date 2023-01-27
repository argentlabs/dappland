export default function checkIfDateDifferenceIsLessThanValue(
  day1: Date,
  day2: Date,
  age = 28,
) {
  const daysBetween = (day1.getTime() - day2.getTime()) / (1000 * 60 * 60 * 24)
  return daysBetween < age
}
