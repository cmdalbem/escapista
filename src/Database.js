const AIRTABLE_API_KEY = 'keyitXI1MaCb75MYj';
const AIRTABLE_BASE_ID = 'app5PlDbzK24kIJtP';

class Database {
    base;
    categories = {};
    videos = []

    constructor() {
        this.base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);
    }

    async fetchTable(tableName) {
        let response, data
        response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?api_key=${AIRTABLE_API_KEY}`);
        data = await response.json();
        return data.records;;
    }

    async get() {
        let categories, videos;

        categories = await this.fetchTable('Categories');
        if (categories && categories.length > 0) {
            categories.forEach(record => {
                this.categories[record.id] = record;
                this.categories[record.id].videos = [];
            });
            console.debug('categories', this.categories);
        } else {
            console.error('No categories from Airtable.')
        };

        videos = await this.fetchTable('Videos');
        if (videos && videos.length > 0) {
            console.debug('airtable entries:',videos);

            this.videos = videos;

            videos.forEach(r => {
                const categories = r.fields.categories;
                if (categories) {
                    categories.forEach(c => {
                        this.categories[c].videos.push(r);
                    });
                } else {
                    console.warn('Video',r.fields.title,'without any category');
                }
            });

            return {    
                videos: this.videos,
                categories: this.categories,
                currentCategory: Object.keys(this.categories)[0]
            };
        } else {
            console.error('No videos from Airtable.')
        };
    }
}

export default Database;