import { connectToDatabase } from "../../util/mongodb";
import bcrypt from 'bcryptjs'

export default async (req, res) => {
    const { db } = await connectToDatabase();
    console.log(req.method + ' - admins')

    if (req.method == 'POST') {

        req.body.pass = bcrypt.hashSync(req.body.pass, 10);

        const createRequest = await db
            .collection("admins")
            .insertOne(req.body)
        res.json(createRequest);
    }
};