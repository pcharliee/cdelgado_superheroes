export default function getCharacter (id) {
  return Promise.resolve({})
  .then(payload => {
    return fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        payload.character = data;
        return payload;
      })
      .catch((e) => console.log(e))
  })
  .then(payload => {
    return payload;
  });
};