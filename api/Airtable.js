const fetch = require('node-fetch');
const slugify = require('./utils.js');


const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

class Airtable {
    categories = {};
    videos = []

    async fetchTable(tableName, view, offset, accumulator=[]) {
        let queryUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?api_key=${AIRTABLE_API_KEY}&view=${view}`;
        if (offset) {
            queryUrl += `&offset=${offset}`;
        }
        
        const response = await fetch(queryUrl);
        const data = await response.json();
        
        if (data.records && data.records.length > 0) {
            let accumulated = data.records;
    
            accumulated = accumulated.concat(accumulator);
    
            if (data.offset) {
                console.debug(`fetchTable(${tableName}/${view}): offset detected, recursing...`);
                return this.fetchTable(tableName, view, data.offset, accumulated);
            } else {
                console.debug(`fetchTable(${tableName}/${view}): end of pagination, returning.`);
                return accumulated;
            }
        } else {
            console.warn(`fetchTable(${tableName}/${view}): zero records`);
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
        let categories;

        // Query categories
        categories = await this.fetchTable('Categories','Gallery');
        if (categories && categories.length > 0) {
            // Fill our map of categories, still empty
            categories.forEach(record => {
                this.categories[record.id] = record;
                this.categories[record.id].videos = [];
            });
            // console.debug('categories', this.categories);
        } else {
            console.error('No categories from Airtable.')
        };

        // Query videos
        const still = await this.fetchTable('Videos','Still');
        
        // Override airtable-filled categories with only Still (to not mix with other categories)
        if (still && still.length > 0) {
            still.forEach(v => {
                v.fields.categories = ['reclgJFyr99pR9H3D'];
            })
        }
        
        const filtered = await this.fetchTable('Videos','Filtered');
        const videos = filtered.concat(still);

        if (videos && videos.length > 0) {
            // console.debug('airtable entries:', videos);

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

                        if (c) {
                            if (c.videos.filter(v => v.fields.id === r.fields.id).length > 0) {
                                console.debug(`[duplicate] ${r.fields.id} ${r.fields.title}`);
                            } else {
                                c.videos.push(r);
                                c.slug = slugify(c.fields.title);
                            }
                        }
                    });
                } else {
                    // console.debug(`[no category] ${r.fields.title}`);
                }
            });

            // this.printCategoriesContents();
            // this.printCategories();

            return {    
                videos: this.videos,
                categories: this.categories
            };
        } else {
            console.error('No videos from Airtable.')
        };
    }
}

module.exports = Airtable