import { connectToDatabase } from "../../util/mongodb";
import bcrypt from 'bcryptjs'

export default async (req, res) => {
    const { db } = await connectToDatabase();
    console.log(req.method + ' - authenticate')

    if (req.method == 'POST') {

        const admin = await db
            .collection("admins")
            .findOne({uid: req.body.uid})

        let authd = false
        let master = false
        if (admin) {
            authd = bcrypt.compareSync(req.body.pass, admin.pass)
            master = admin.uid == 'hvn01'
        }
        res.json({master: master, authd: authd});
  }

};