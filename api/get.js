const Airtable = require('./Airtable.js');
const GuideBuilder = require('./GuideBuilder.js');

export default async (req, res) => {
    let airtable = new Airtable();
    const database = await airtable.get();
    const guide = GuideBuilder.getGuide(database);
 
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.json({
        body: guide
    })
}