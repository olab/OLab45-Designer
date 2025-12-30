import createInstance from '../createCustomInstance';

const API = createInstance();

export async function exportFileDownload(mapId) {
  try {
    const response = await API.get(
      `/import4/export/${mapId}`,
      {
        responseType: "blob"
      });

    return response; // now you're returning the resolved value
  } catch (err) {
    console.error("Download failed", err);
    throw err;
  }
}
