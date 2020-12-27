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

    async buildCategories() {
        const categories = await this.fetchTable('Categories','Gallery');
        if (categories && categories.length > 0) {
            // Fill our map of categories, still empty
            categories.forEach(c => {
                this.categories[c.id] = c;
                this.categories[c.id].videos = [];
                this.categories[c.id].slug = slugify(c.fields.title);
            });
        } else {
            console.error('No categories from Airtable.')
        };
    }

    async fetchSpecialCategory(name) {
        const videos = await this.fetchTable('Videos', name);
        const catId = Object.keys(this.categories).filter(k => {
            return this.categories[k].fields['title-en'] === name;
        });
        
        this.categories[catId].videos = videos;
    }

    async get() {
        await this.buildCategories();

        for (const k of Object.keys(this.categories)) {
            const c = this.categories[k];
            if (c.fields.type === 'special') {
                const viewName = c.fields['title-en'];
                console.debug('Fetching special category:', viewName)
                await this.fetchSpecialCategory(viewName);
            }
        }

        const videos = await this.fetchTable('Videos','Filtered');
        if (videos && videos.length > 0) {
            // Fill categories map
            videos.forEach(r => {
                let vcats = r.fields.categories;
                if (vcats) {
                    // Remove duplicated categories (damn, Airtable!)
                    vcats = vcats.filter( (value, index, self) => { 
                        return self.indexOf(value) === index;
                    })

                    vcats.forEach(vc => {
                        const c = this.categories[vc];
                        if (c && c.fields.type === 'regular') {
                            if (c.videos.filter(v => v.fields.id === r.fields.id).length === 0) {
                                c.videos.push(r);
                            } else {
                                console.debug(`[duplicate] ${r.fields.id} ${r.fields.title}`);
                            }
                        }
                    });
                } else {
                    console.debug(`[no category] ${r.fields.title}`);
                }
            });

            // this.printCategoriesContents();
            // this.printCategories();

            return {    
                categories: this.categories
            };
        } else {
            console.error('No videos from Airtable.')
        };
    }
}

module.exports = Airtable