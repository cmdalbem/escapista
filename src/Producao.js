class Producao {
    // Seed is based on current clock time, in seconds
    static getSeed() {
        return Math.floor((new Date().getTime())/1000);
    }

    static computeTimes(currentVideo, videoStartSec) {
      const opts = {
        hour: '2-digit',
        minute: '2-digit'
      };
      const nowMs = Math.floor(Date.now());
      let time1, time2;

      time1 = nowMs - videoStartSec*1000;
      time2 = time1 + currentVideo.fields['duration']*60*1000;

      time1 = new Date(time1);
      time2 = new Date(time2);

      time1 = time1.toLocaleTimeString('pt-br', opts);
      time2 = time2.toLocaleTimeString('pt-br', opts);

      console.debug('time1 =',time1);
      console.debug('time2 =',time2);

      return {
        time1: time1,
        time2: time2
      }
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
        
        // Create array of accumulated lengths (in seconds)
        let accumulatedLengths = [0];
        for(let i=0; i<lengths.length; i++) {
          accumulatedLengths[i+1] = lengths[i] + accumulatedLengths[i];
        }
    
        // Compute index of currently playing video
        let currentVideoIndex = 0;
        for(let i=0; normalizedSeed > accumulatedLengths[i]; i++) {
          currentVideoIndex = i;
          // console.debug('currentVideoIndex',currentVideoIndex);
        }

        // Normalize final indexes
        currentVideoIndex %= records.length;
        const nextVideoIndex = (currentVideoIndex+1) % records.length;
    
        // Find starting point (in seconds) of current video
        const videoStartSec = Math.floor(normalizedSeed - accumulatedLengths[currentVideoIndex]);

        const currentVideo = records[currentVideoIndex];
        const nextVideo = records[nextVideoIndex];

        const { time1, time2 } = this.computeTimes(currentVideo, videoStartSec);
        
        // Print it all
        console.debug('normalizedSeed',normalizedSeed);
        console.debug('accumulatedLengths',accumulatedLengths);
        console.debug('currentVideoIndex =',currentVideoIndex);
        console.debug('nextVideoIndex =',nextVideoIndex);
        console.debug('videoStartSec =',videoStartSec);
    
        return {
            currentVideo: currentVideo,
            nextVideo: nextVideo,
            videoStart: videoStartSec,
            time1: time1,
            time2: time2
        };
      }
}

export default Producao;