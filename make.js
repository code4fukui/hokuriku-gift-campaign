import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const fetchData = async (fn) => {
  const csv = await CSV.fetch(fn);
  csv.splice(0, 1);
  return CSV.toJSON(csv);
};

const path = "daily";
const fns = await dir2array(path);
fns.sort();
const list = [];
for (const fn of fns) {
  console.log(fn);
  //const data = await CSV.fetchJSON(path + "/" + fn);
  const data = await fetchData(path + "/" + fn);
  data.forEach(i => list.push(i));
}
await Deno.writeTextFile("all.csv", CSV.stringify(list));


