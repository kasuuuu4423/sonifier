import ddf.minim.*;
import java.util.*;

class Sonifier{
    Minim minim;
    AudioOutput out;
    ArrayList<String> ignores;
    ArrayList<String> now;
    int gain = -20;

    HashMap<String, ArrayList<String>> dirs;
    String nowDirName = "";
    ArrayList<String> fileNames;
    Object[] keys;
    CWConverter cw;
    FileIO io;
    int directoryCount = 0;
    int lineCount = 0;
    int length = 0;
    ArrayList<Integer> indents;

    public Sonifier(Minim minim, HashMap<String, ArrayList<String>> dirs, ArrayList<String> ignores){
        this.minim = minim;
        this.ignores = ignores;

        minim = new Minim(this);
        out = minim.getLineOut();
        out.setGain(gain);
        cw = new CWConverter(out.sampleRate());
        io = new FileIO();
        this.dirs = dirs;
        keys = dirs.keySet().toArray();
        ignores = io.read(".ignore");

        cdNext();
    }

    public AudioOutput getOut(){
        return out;
    }

    public HashMap<String, ArrayList<String>> getDirs(){
        return dirs;
    }

    public String getNowDirName(){
        return nowDirName;
    }

    public int getNowLineCount(){
        return lineCount;
    }

    public ArrayList<String> getNowLines(){
        return now;
    }

    void sonify(){
        now = new ArrayList<String>();
        for(String fileName: fileNames){
            boolean ignore = isIgnore(ignores, fileName);
            if(!ignore){
                ArrayList<String> tmpLines = io.read(fileName);
                length = tmpLines.size() > length ? tmpLines.size() : length;
                if(tmpLines.size() > lineCount) now.add(tmpLines.get(lineCount));
            }
        }
        
        ArrayList<Float> freqs = new ArrayList<Float>();

        for(int j = 0; j < now.size(); j++){
            int countTab = (int) now.get(j).chars().filter(ch -> ch == '\t').count();
            int countSpace = (int) now.get(j).chars().filter(ch -> ch == ' ').count()/4;
            indents.set(j, Math.max(countTab, countSpace));
            // if(isExists(now.get(j), "(") && isExists(now.get(j), ")") && isExists(now.get(j), "{")){
            //     indents.set(j, Math.max());
            // }
            // else if(isExists(now.get(j), "}") && now.get(j).length() < 4){
            //     indents.set(j, indents.get(j)-1);
            // }
            //println(isExists(now.get(j), "\t") || isExists(now.get(j), "  "));

            ArrayList<SineWave> waves = cw.convert(now.get(j), j, indents.get(j));
            for(SineWave wave: waves){
                float freq = wave.frequency();
                if(!freqs.contains(freq)){
                    addOvertone(out, freq);
                    out.addSignal(wave);
                    freqs.add(freq);
                }
            }
        }
        lineCount++;
        if(lineCount-1 > length){
            cdNext();
        }
    }

    public int getDelay(){
        return cw.getTempo();
    }

    public void clearSignals(){
        out.clearSignals();
    }

    public void cdNext(){
        if(directoryCount < keys.length){
            lineCount = 0;
            nowDirName = String.valueOf(keys[directoryCount]);
            fileNames = dirs.get(keys[directoryCount]);

            indents = new ArrayList<Integer>(fileNames.size());
            for(String fileName: fileNames) indents.add(0);
            //println(indents);

            length = io.read(fileNames.get(0)).size();
            directoryCount++;
        }
    }
}
