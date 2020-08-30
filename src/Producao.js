class Producao {
    // Seed is based on current clock time, in seconds
    static getSeed() {
        return Math.floor((new Date().getTime())/1000);
    }

    static computeCurrentVideoAndOffset(records) {
        if (!records || records.length === 0) {
            console.error('computeCurrentVideoAndOffset(): empty records');
            return null;
        }
        
        const seed = this.getSeed();
    
        const lengths = records.map(i => i.fields['duration']*60);
        const totalLength = lengths.reduce((a, b) => a + b, 0);
        const normalizedSeed = seed % totalLength;
        
        let accumulatedLengths = [lengths[0]];
        for(let i=1; i<lengths.length; i++) {
          accumulatedLengths[i] = lengths[i] + accumulatedLengths[i-1];
        }
    
        let currentVideoIndex = 0;
        for(let i=0; normalizedSeed > accumulatedLengths[i]; i++) {
          currentVideoIndex = i+1;
          console.debug('currentVideoIndex',currentVideoIndex);
        }

        currentVideoIndex %= records.length;
        const nextVideoIndex = (currentVideoIndex+1) % records.length;
    
        const videoStart = Math.floor(normalizedSeed % lengths[currentVideoIndex]);
        
        console.debug('normalizedSeed',normalizedSeed);
        console.debug('accumulatedLengths',accumulatedLengths);
        console.debug('currentVideoIndex =',currentVideoIndex);
        console.debug('nextVideoIndex =',nextVideoIndex);
        console.debug('videoStart =',videoStart);
    
        return {
            currentVideoIndex: currentVideoIndex,
            nextVideoIndex: nextVideoIndex,
            videoStart: videoStart
        };
      }
}

export default Producao;