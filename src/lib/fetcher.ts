export const fetcher = (url: string) =>
  fetch(`https://next-be-samuel.vercel.app/${url}`).then((res) => res.json());
