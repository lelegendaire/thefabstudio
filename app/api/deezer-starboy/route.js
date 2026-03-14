export async function GET() {
  try {
    const res = await fetch("https://api.deezer.com/track/136886976");
    const data = await res.json();

    // data EST directement le track, pas data.data[0]
    return Response.json({
      title: data.title,
      artist: data.artist.name,
      cover: data.album.cover_big,
      preview: data.preview,
    });
  } catch (error) {
    return Response.json({ error: "Erreur Deezer API" }, { status: 500 });
  }
}