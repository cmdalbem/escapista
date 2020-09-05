import { slugify } from './utils.js';

const AIRTABLE_API_KEY = 'keyitXI1MaCb75MYj';
const AIRTABLE_BASE_ID = 'app5PlDbzK24kIJtP';

class Database {
    categories = {};
    videos = []

    async fetchTable(tableName, view) {
        let response, data
        response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?api_key=${AIRTABLE_API_KEY}&view=${view}`);
        data = await response.json();

        if (data.offset) {
            let response2, data2;
            response2 = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?api_key=${AIRTABLE_API_KEY}&view=${view}&offset=${data.offset}`);
            data2 = await response2.json();

            return data.records.concat(data2.records);
        } else {
            return data.records;
        }
    }

    printCategoriesContents() {
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

    printCategories() {
        Object.keys(this.categories).forEach(key => {
            const c = this.categories[key]
            console.debug(c.fields.title, '\t\t', c.videos.length)
        });
    }

    async get() {
        let categories, videos;

        // Query categories
        categories = await this.fetchTable('Categories','Gallery');
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
        videos = await this.fetchTable('Videos','Filtered');
        if (videos && videos.length > 0) {
            console.debug('airtable entries:',videos);

            this.videos = videos;

            // Fill categories map
            videos.forEach(r => {
                let categories = r.fields.categories;
                if (categories) {
                    // Remove duplicated categories (damn, Airtable!)
                    categories = categories.filter( (value, index, self) => { 
                        return self.indexOf(value) === index;
                    })

                    categories.forEach(i => {
                        const c = this.categories[i];

                        if (c.videos.filter(v => v.fields.id === r.fields.id).length > 0) {
                            console.debug('Found duplicated video!', r.fields.id, r.fields.title);
                        } else {
                            c.videos.push(r);
                            c.slug = slugify(c.fields.title);
                        }
                    });
                } else {
                    console.debug('Video',r.fields.title,'without any category');
                }
            });

            // this.printCategoriesContents();
            this.printCategories();

            return {    
                videos: this.videos,
                categories: this.categories
            };
        } else {
            console.error('No videos from Airtable.')
        };
    }
}

export default Database;