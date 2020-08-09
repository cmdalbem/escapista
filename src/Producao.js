class Producao {
    static getSeed() {
        return Math.floor((new Date().getTime())/1000);
    }

    static computeCurrentVideoAndOffset(records) {
        if (!records || records.length == 0) {
            console.warn('computeCurrentVideoAndOffset(): empty records');
            return null;
        }
        
        const seed = this.getSeed();
    
        let accs = [];
        const lengths = records.map(i => i.fields['duration']*60);
        const totalLength = lengths.reduce((a, b) => a + b, 0);
        const normalizedSeed = seed % totalLength;
        
        let accumulatedLengths = [lengths[0]];
        for(let i=1; i<lengths.length; i++) {
          accumulatedLengths[i] = lengths[i] + accumulatedLengths[i-1];
        }
    
        let videoIndex = 0;
        for(let i=0; normalizedSeed > accumulatedLengths[i]; i++) {
          videoIndex = i+1;
          console.debug('videoIndex',videoIndex);
        }
    
        const videoStart = Math.floor(normalizedSeed % lengths[videoIndex]);
        
        console.debug('normalizedSeed',normalizedSeed);
        console.debug('accumulatedLengths',accumulatedLengths);
        console.debug('videoIndex =',videoIndex);
        console.debug('videoStart =',videoStart);
    
        return {
            videoIndex: videoIndex,
            videoStart: videoStart
        };
      }
}

export default Producao;