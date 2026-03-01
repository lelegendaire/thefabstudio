// app/api/deezer-albums/route.js
import { NextResponse } from "next/server"

// Remplace par l'ID artiste Deezer que tu veux
const ARTIST_ID = "4050205" // exemple : Daft Punk

export async function GET() {
  try {
    // Deezer API : albums d'un artiste
    const res = await fetch(
      `https://api.deezer.com/artist/${ARTIST_ID}/albums?limit=50`,
      { next: { revalidate: 3600 } } // cache 1h
    )

    if (!res.ok) throw new Error(`Deezer API error: ${res.status}`)

    const data = await res.json()

    // Mapping vers le format attendu par buildAlbumAtlas :
    // { url, title, year }
    const albums = data.data
      .filter((album) => album.cover_xl) // garde uniquement ceux avec cover
      .map((album) => ({
        url:   album.cover_xl,                          // image 1000x1000
        title: album.title,
        year:  album.release_date?.split("-")[0] ?? "", // "2001-01-01" → "2001"
      }))

    return NextResponse.json(albums)
  } catch (err) {
    console.error("[deezer-albums]", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}