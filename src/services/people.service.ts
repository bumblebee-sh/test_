async function getRandomPeople({ pageParam }: { pageParam: number }) {
  const res = await fetch(`https://randomuser.me/api/?page=${pageParam}&results=5&seed=abc`).then(
    (res) => res.json(),
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    data: res.results,
    cursor: pageParam + 1,
  };
}

async function getRandomPerson() {
  const res = await fetch(`https://randomuser.me/api/`).then((res) => res.json());
  return res.results[0];
}

async function addNewPersonMock(person: any) {
  return Promise.resolve(person);
}

export default {
  getRandomPeople,
  addNewPersonMock,
  getRandomPerson,
};
