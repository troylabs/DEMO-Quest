import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DEMO Quest",
    short_name: "DEMO Quest",
    description: "Explore startup booths and win prizes at DEMO!",
    start_url: "/",
    display: "standalone",
    background_color: "#6d28d9",
    theme_color: "#6d28d9",
  }
}

