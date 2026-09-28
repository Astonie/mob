// Professional mining images - Unsplash (free, CDN, optimized)
export const miningImages = {
  hero: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&auto=format&fit=crop&q=80", // open pit
  hero2: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&auto=format&fit=crop&q=80", // drill core
  core: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
  pit: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
  graphite: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
  lab: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
  truck: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80",
};

export const projectImages: Record<string, string> = {
  "kasiya-rutile-graphite": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&auto=format&fit=crop&q=80",
  "kayelekera-uranium": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
  "songwe-hill-ree": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
  "kansanshi-copper-gold-mine": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&auto=format&fit=crop&q=80",
  "kolwezi-cobalt-copper": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80",
  "balama-graphite": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
  "mushima-exploration": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&auto=format&fit=crop&q=80",
};

export const mineralImages: Record<string, string> = {
  copper: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&auto=format&fit=crop&q=80",
  graphite: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&auto=format&fit=crop&q=80",
  "rare-earths": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
  cobalt: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80",
  gold: "https://images.unsplash.com/photo-1610377100276-c0ebd8d595cb?w=600&auto=format&fit=crop&q=80",
  uranium: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
};

export function getProjectImage(slug: string) {
  return projectImages[slug] || projectImages.default;
}
