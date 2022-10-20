import bridges from "../assets/icons/bridges.svg"
import bridgesLight from "../assets/icons/bridgesLight.svg"
import card from "../assets/icons/card.svg"
import cardLight from "../assets/icons/cardLight.svg"
import contacts from "../assets/icons/contacts.svg"
import contactsLight from "../assets/icons/contactsLight.svg"
import ballLight from "../assets/icons/crystal-ball-light.svg"
import ball from "../assets/icons/crystal-ball.svg"
import database from "../assets/icons/database.svg"
import databaseLight from "../assets/icons/databaseLight.svg"
import dotw from "../assets/icons/dotw.svg"
import dotwLight from "../assets/icons/dotwLight.svg"
import gallery from "../assets/icons/gallery.svg"
import galleryLight from "../assets/icons/galleryLight.svg"
import gaming from "../assets/icons/gaming.svg"
import gamingLight from "../assets/icons/gamingLight.svg"
import heart from "../assets/icons/heart.svg"
import heartLight from "../assets/icons/heartLight.svg"
import legal from "../assets/icons/legal.svg"
import legalLight from "../assets/icons/legalLight.svg"
import profile from "../assets/icons/profile.svg"
import profileLight from "../assets/icons/profileLight.svg"
import starknet from "../assets/icons/starknet.svg"
import starknetLight from "../assets/icons/starknetLight.svg"
import swap from "../assets/icons/swap.svg"
import swapLight from "../assets/icons/swapLight.svg"

export const categories = [
  { key: "onramps", name: "Onramps", icon: card, iconDark: cardLight },
  { key: "bridges", name: "Bridges", icon: bridges, iconDark: bridgesLight },
  { key: "defi", name: "DeFi", icon: swap, iconDark: swapLight },
  { key: "games", name: "Games", icon: gaming, iconDark: gamingLight },
  { key: "nfts", name: "NFTs", icon: gallery, iconDark: galleryLight },
  { key: "social", name: "Social", icon: heart, iconDark: heartLight },
  {
    key: "infrastructure",
    name: "Infrastructure",
    icon: database,
    iconDark: databaseLight,
  },
  { key: "daos", name: "DAOs", icon: contacts, iconDark: contactsLight },
]

export const reputation = [
  { key: "doxxed", name: "Public team", icon: profile, iconDark: profileLight },
  { key: "audited", name: "Audited", icon: legal, iconDark: legalLight },
]

export const chain = [
  {
    key: "starknet",
    name: "StarkNet",
    icon: starknet,
    iconDark: starknetLight,
  },
]

export const allCategories = [...categories, ...reputation, ...chain]

export const changeTagsToCategoriesSlug = (tags: string[]) => {
  let categories: Array<string> = []
  const categoriesNames = allCategories.map((category) => category.name)
  tags.forEach((tag) => {
    if (categoriesNames.includes(tag)) {
      const categorySlug = allCategories.find((item) => item.name === tag)?.key
      if (categorySlug) categories.push(categorySlug)
    }
  })
  return categories
}
