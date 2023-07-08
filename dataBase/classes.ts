import { client } from "./client";
import { createClassList } from "./fetchAPIData";

export const insertClasses = async() => {
  const classList = await createClassList();
  for(let i = 0; i < classList.length; i++){
    const { rows: [ aClass ] } = await client.query(`
    INSERT INTO classes(name, hit_die)
    VALUES('${classList[i].name}', ${classList[i].hit_die})
    RETURNING *;
  `);
  };
};

export const getAllClasses = async() => {
  const { rows: classes } = await client.query(`
    SELECT * FROM classes;
  `)
  return classes;
};

export const getClassById = async(classId: number) =>{
  const  { rows: [ thisClass ] } = await client.query(`
    SELECT * FROM classes 
    WHERE id = $1;
  `, [classId]);
  return thisClass;
};

export const getClassByName = async(className: string) =>{
  const  { rows: [ thisClass ] } = await client.query(`
    SELECT * FROM classes 
    WHERE name = $1;
  `, [className]);
  console.log(thisClass);
  return thisClass;
};