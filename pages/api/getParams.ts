import { NextApiRequest, NextApiResponse } from "next";
import md5 from 'md5';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
    const timestamp = Number(new Date());

    res.status(200).json({
        timestamp: timestamp,
        hash: md5(`${timestamp}${privateKey}${publicKey}`),
    });
}