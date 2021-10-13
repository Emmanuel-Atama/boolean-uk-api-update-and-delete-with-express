const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM pets;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM pets
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

const updateOneById = async (req, res) => {
  console.log("Pets Router [UPDATE]", {params: req.params, body: req.body})
  
  const idToUpdate = {
    id: req.params.id,
    ...req.body,
  }
  
  const updateOneByIdSQL = `
  UPDATE pets 
  (name, age, type, breed, microchip)
  VALUES ($1, $2, $3, $4, $5)
  WHERE id = $6
  RETURNING *
  `;
  
  try {
    const result = await db.query(updateOneByIdSQL, [idToUpdate.name, idToUpdate.age, idToUpdate.type, idToUpdate.breed, idToUpdate.microchip])
    res.json ({data: result.rows[0]})
  } catch (error) {
    console.error ("[ERROR updateOneById: ", {error: error.message});
  
    res.status(500).json({ error: error.message });
  }
  }

  const patchOneById = async (req, res) => {
    const id = req.params.id
    const petToUpdate  = req.body
  
    let updateOneByTitleSQL = `
    UPDATE books SET
    `;
  
    const sqlParams = [];
  
    let i = 1;
    for (const key in petToUpdate) {
      updateOneByTitleSQL += `${key} =$`;
      updateOneByTitleSQL += i;
      updateOneByTitleSQL += ','
      sqlParams.push(petToUpdate[key])
      i = i + 1;
    }
    sqlParams.push(id);
  
    updateOneByTitleSQL = updateOneByTitleSQL.slice(0, sqlTemplate.length -1);
    updateOneByTitleSQL += ` where id = $`;
    updateOneByTitleSQL += i;
    updateOneByTitleSQL += `RETURNING *`
  
    console.log("updateOneByTitleSQL", updateOneByTitleSQL)
    console.log("sqlParams", sqlParams);
  
    try {
      const result = await db.query(updateOneByTitleSQL, [sqlParams])
      res.json ({data: result.rows[0]})
    } catch (error) {
      console.error ("ERROR patchOneById: ", {error: error.message});
    
      res.status(500).json({ error: error.message });
    }
  }
  
    const deleteOneById = async(req, res) => {
  
      const idToDelete = req.params.id;

      
      const deleteOneByIdSQL = `
      DELETE FROM pets 
      WHERE id = $1
      `;
      
      try {
        const result = await db.query(deleteOneByIdSQL, [idToDelete.id])
        res.json ({message: "Delete Successful"})
      } catch (error) {
        console.error ("[ERROR deleteOneById: ", {error: error.message});
      
        res.status(500).json({ error: error.message });
      }
    }
  

module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  patchOneById,
  deleteOneById
};
