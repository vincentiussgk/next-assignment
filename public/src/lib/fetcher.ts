export const fetcher = (url: string) =>
  fetch(`http://localhost:8080/${url}`).then((res) => res.json());
