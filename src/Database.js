const AIRTABLE_API_KEY = 'keyitXI1MaCb75MYj';
const AIRTABLE_BASE_ID = 'app5PlDbzK24kIJtP';

class Database {
    categories = {};
    videos = []

    async fetchTable(tableName, options = '') {
        let response, data
        response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?api_key=${AIRTABLE_API_KEY}${options}`);
        data = await response.json();
        return data.records;;
    }

    printCategories() {
        console.group('Categories');
        Object.keys(this.categories).forEach(key => {
            const c = this.categories[key]
            console.group(c.fields.title);
            c.videos.forEach(v => {
                console.log(v.fields.title);
            });
            console.groupEnd();
        });
        console.groupEnd();
    }

    async get() {
        let categories, videos;

        // Query categories
        categories = await this.fetchTable('Categories');
        if (categories && categories.length > 0) {
            // Fill our map of categories, still empty
            categories.forEach(record => {
                this.categories[record.id] = record;
                this.categories[record.id].videos = [];
            });
            console.debug('categories', this.categories);
        } else {
            console.error('No categories from Airtable.')
        };

        // Query videos
        videos = await this.fetchTable('Videos','&view=Filtered');
        if (videos && videos.length > 0) {
            console.debug('airtable entries:',videos);

            this.videos = videos;

            // Fill categories map
            videos.forEach(r => {
                let categories = r.fields.categories;
                if (categories) {
                    // Remove duplicates (damn, Airtable!)
                    categories = categories.filter( (value, index, self) => { 
                        return self.indexOf(value) === index;
                    })

                    categories.forEach(c => {
                        this.categories[c].videos.push(r);
                    });
                } else {
                    console.warn('Video',r.fields.title,'without any category');
                }
            });

            // this.printCategories();

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