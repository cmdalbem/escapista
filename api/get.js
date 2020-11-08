const Airtable = require('./Airtable.js');

export default async (req, res) => {
    let airtable = new Airtable();
    const data = await airtable.get();
 
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.json({
        body: data
    })
}