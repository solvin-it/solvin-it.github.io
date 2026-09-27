import { profile } from "./profile";

export const siteConfig = {
  name: profile.name,
  title: "Jose Fernando Gonzales — AI Developer | Professional Profile",
  description:
    "Professional profile and online CV of Jose Fernando Gonzales. AI development, enterprise data, FinTech experience, skills, education, and selected projects.",
  url: "https://solvin-it.github.io",
  studioUrl: "https://solvin.co",
  author: {
    name: profile.name,
    email: profile.email,
    linkedin: profile.linkedin,
    github: profile.github,
  },
  navigation: [
    { label: "Profile", href: "/" },
    { label: "Experience", href: "/experience/" },
    { label: "Projects", href: "/projects/" },
    { label: "Notes", href: "/notes/" },
  ],
  seo: {
    keywords: [
      "Jose Fernando Gonzales",
      "Solvin",
      "AI Developer",
      "Product Engineering",
      "RAG",
      "Python",
      "FinTech",
    ],
    ogImage: "/og-image.png",
  },
};
