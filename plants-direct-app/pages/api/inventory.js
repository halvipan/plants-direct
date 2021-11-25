import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  console.log(req.method + ' - inventory')

  if (req.method == 'GET') {
    const getRequest = await db
      .collection("inventory")
      .find({})
      .limit(20)
      .toArray();
    res.json(getRequest);
  }

  if (req.method == 'POST') {
    const createRequest = await db
      .collection("inventory")
      .insertOne(req.body)
    res.json(createRequest);
  }

  if (req.method == 'DELETE') {
    const deleteRequest = await db
      .collection("inventory")
      .deleteOne({_id: ObjectId(req.body._id)})
    res.json(deleteRequest);
  }

  if (req.method == 'PUT') {
    const putRequest = await db
      .collection("inventory")
      .replaceOne({_id: ObjectId(req.body._id)}, req.body.data)
    res.json(putRequest);
  }

};