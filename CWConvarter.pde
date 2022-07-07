import ddf.minim.*;
import ddf.minim.ugens.*;
import ddf.minim.signals.*;

class CWConverter{
    float basePitch = 164.814;
    ArrayList<String> lines;
    float sampleRate = 0;
    int tempo = 500;
    //int baseTempo = 100;

    CWConverter(float sampleRate){
        this.sampleRate = sampleRate;
    }

    void setCode(ArrayList<String> codeLines){
        lines = codeLines;
    }

    ArrayList<SineWave> convert(String line, int indent){
        boolean isEnd = false;
        return convert(line, 0, indent, isEnd);
    }

    ArrayList<SineWave> convert(String line, int column, int indent){
        boolean isEnd = false;
        return convert(line, column, indent, isEnd);
    }

    ArrayList<SineWave> convert(String line, int column, int indent, boolean isEnd){
        float pitch = basePitch;
        //pitch = changePitch(pitch, isOdd(line.length())?line.length()/2-1:line.length()/2);

        ArrayList<SineWave> waves = new ArrayList<SineWave>();
        waves.add(genWave(changePitch(pitch, column*2+indent*2)));
        // if(isExists(line, "(") && isExists(line, ")") && isExists(line, "{")){
        //     waves.add(genWave(changePitch(pitch, -4+column*2)));
        // }
        // else if(isExists(line, "}")) for(int i = 0; i < 3; i++){
        //     waves.add(genWave(changePitch(pitch, column*2)));
        // }

        //waves.add(genWave(changePitch(pitch, isOdd(line.length())?line.length()-1:line.length())));

        // if("".equals(line)) waves.add(genWave(0));
        // else waves.add(genWave(pitch));

        // if(isExists(line, "{") || isExists(line, "}")){
        //     for(int i = 0; i < 3; i++) waves.add(genWave(10+i));
        // }
        // else if(isExists(line, ";")){
        //     waves.add(genWave(changePitch(pitch, -12)));
        // }
        // else if(isExists(line, ",")) waves.add(genWave(changePitch(pitch, -12)));
        // // if(isExists(line, "{")) tempo /= 0.875;
        // // else if(isExists(line, "}")) tempo *= 0.875;

        // else if(isExists(line, "(") || isExists(line, ")")) waves.add(genWave(changePitch(pitch, -4)));

        // else if(isExists(line, "if")){
        //     waves.add(genWave(changePitch(pitch, -4)));
        //     waves.add(genWave(changePitch(pitch, 4)));
        // }

        // else if(isExists(line, "for")){
        //     waves.add(genWave(changePitch(pitch, 2)));
        //     //waves.add(genWave(changePitch(pitch, 10)));
        //     //waves.add(genWave(changePitch(pitch, 18)));
        // }

        // else if(isExists(line, "let")) waves.add(genWave(changePitch(pitch, 6)));
        // else if(isExists(line, "const")) waves.add(genWave(changePitch(pitch, 2)));
        
        // if(isEnd){
        //     waves = new ArrayList<SineWave>();
        //     waves.add(genWave(changePitch(basePitch, 6)));
        //     waves.add(genWave(changePitch(basePitch, 8)));
        //     waves.add(genWave(changePitch(basePitch, 16)));
        // }

        return waves;
    }

    SineWave genWave(float freq){
        SineWave wave = new SineWave(freq, 0.3f, sampleRate);
        return wave;
    }

    float changePitch(float pitch, int interval){
        return (float)(basePitch * Math.pow(pow(2, interval), (double)1/12));
    }
    
    int getTempo(){
        return tempo;
    }
}
