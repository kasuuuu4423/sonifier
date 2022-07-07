import ddf.minim.analysis.*;

class AudioSpectrum{
    AudioOutput out;
    FFT fft;
    int w;

    AudioSpectrum(AudioOutput out){
        this.out = out;
        fft = new FFT(out.bufferSize(), out.sampleRate());
        //fft.logAverages(512, 16);
        //w=width/fft.avgSize();
    }
    
    void draw(){
        fft.forward(out.mix);
        int specSize = fft.specSize();

        for(int i = 0; i < specSize; i++){
            float x = map(i, 0, specSize, 0, width);
            stroke(white, 100);
            line(x, height, x, height - fft.getBand(i)*2);
        }
    }
}