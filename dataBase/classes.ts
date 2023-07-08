import { client } from "./client";
import { createClassList } from "./fetchAPIData";

export const insertClass = async() => {
  const classList = await createClassList();
  for(let i = 0; i < classList.length; i++){
    const { rows: [ aClass ] } = await client.query(`
    INSERT INTO classes(name, hit_die)
    VALUES('${classList[i].name}', ${classList[i].hit_die})
    RETURNING *;
  `);
  };
};

