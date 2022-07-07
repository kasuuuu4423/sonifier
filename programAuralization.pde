import ddf.minim.*;
import java.util.*;

int fontsize = 10;

CodeVisualizer cv;
AudioSpectrum as;
Minim minim;
ArrayList<String> ignores;

HashMap<String, ArrayList<String>> dirs;
FileIO io;
Sonifier sonifier;

PFont text;

int start = 0;
int progress = 0;

void setup(){
    size(1000, 800);
    text = createFont("NotoSansJP-Bold.otf", 100);
    textFont(text);
    textMode(SHAPE);

    minim = new Minim(this);
    io = new FileIO();
    // dirs = getDirs(dataPath("hokkaido-beatbox"));
    // dirs = getDirs(dataPath("novis"));
    dirs = getDirs(dataPath("novis"));
    ignores = io.read(".ignore", true);
    
    dirs = removeIgnore(dirs);

    sonifier = new Sonifier(minim, dirs, ignores);
    cv = new CodeVisualizer(fontsize);
    cv.setDirs(dirs);

    as = new AudioSpectrum(sonifier.getOut());
    start = millis();
}

void draw(){
    background(#272822);

    progress = millis();

    if(progress - start > 200){
        sonifier.clearSignals();
        sonifier.sonify();
        start = millis();
    }

    as.draw();
    cv.setNowDirName(sonifier.getNowDirName());
    cv.setNowLineCount(sonifier.getNowLineCount());
    cv.draw();
    //delay(sonifier.getDelay());
}

void stop(){
    minim.stop();
    super.stop();
}
