import { debounce } from "lodash";
const auth = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=4308f071a3fc4a97a8e4323ab353284f`
  );
  if (response.status !== 200) this.auth();
  const body = await response.json();
  return body.guest_session_id;
};

const rate = async (id, score, sessionID) => {
  const req = new Request(
    `https://api.themoviedb.org/3/movie/${+id}/rating?api_key=4308f071a3fc4a97a8e4323ab353284f&guest_session_id=${sessionID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify({
        value: score,
      }),
    }
  );
  await fetch(req);
};

const search = async (title, page, setState) => {
  const getData = async (data = []) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4308f071a3fc4a97a8e4323ab353284f&query=${title
        .split(" ")
        .join("%20")}&page=${page}`
    );

    data = await res.json();
    return data;
  };
  const data = await getData();

  setState({
    movies: data.results,
    search: title,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  });
};

const debSearch = debounce(search, 250);
const debRate = debounce(rate, 250);
export { debRate, auth, debSearch };
