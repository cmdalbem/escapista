const AIRTABLE_API_KEY = 'keyitXI1MaCb75MYj';

const MAX_DURATION = 400;
const MIN_DURATION = 10;

class Database {
    static filterRecords(records) {
        const lengthBefore = records.length;

        // Filter those that don't have required fields
        records = records.filter(i => i.fields['duration']);
        
        // Filter out by duration range
        records = records.filter(i => 
            i.fields['duration'] < MAX_DURATION &&
            i.fields['duration'] > MIN_DURATION );
        
        if (records.length !== lengthBefore) {
            console.debug('Filtered out', lengthBefore - records.length ,'videos');
        }

        return records;
    }

    static get() {
        return fetch(
            `https://api.airtable.com/v0/app5PlDbzK24kIJtP/Videos?api_key=${AIRTABLE_API_KEY}`
            )
            .then(res => res.json())
            .then(res => {
                if (res.records && res.records.length > 0) {
                    res.records = this.filterRecords(res.records);

                    console.debug('airtable entries:',res.records);
        
                    return res.records;
                } else {
                    console.error('No records from Airtable.')
            }
        })
        .catch(error => console.log(error));
    }
}

export default Database;