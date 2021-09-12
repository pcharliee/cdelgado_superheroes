export default function getCharacter (id) {
  const character = []
  return fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
    .then((res) => res.json())
    .then((data) => {
      character.push(data);
      return character;
    })
    .catch((e) => console.log(e))
};