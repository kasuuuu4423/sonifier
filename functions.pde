import java.io.File;
import java.util.Map;

HashMap<String, ArrayList<String>> getDirs(String path){
    HashMap<String, ArrayList<String>> dirs = new HashMap<String, ArrayList<String>>();
    File[] files = getFiles(path);
    for(File file: files){
        if(file.isDirectory()){
            HashMap<String, ArrayList<String>> tmpDirs = getDirs(file.getAbsolutePath());
            ArrayList<String> tmpDir = tmpDirs.get("/");
            dirs.put(file.getAbsolutePath(), tmpDir);
        }
        else{
            ArrayList<String> tmpDir = dirs.containsKey("/") ? dirs.get("/") : new ArrayList<String>();
            tmpDir.add(file.getAbsolutePath());
            dirs.put("/", tmpDir);
        }
    }
    return dirs;
}

File[] getFiles(String path) {
    File dir = new File(path);
    File[] list = dir.listFiles();
    return list;
}

boolean isExists(String str, String q){
    return str.indexOf(q) >= 0;
}

boolean isOdd(int num){
    return num % 2 == 1;
}

boolean isIgnore(ArrayList<String> ignores, String str){
    boolean isIgnore = false;
    for(String ignore: ignores){
        if(isExists(str, ignore)){
            isIgnore = true;
            return isIgnore;
        }
    }
    return isIgnore;
}

HashMap<String, ArrayList<String>> removeIgnore(HashMap<String, ArrayList<String>> dirs){
    ArrayList<String> removeDirKeys = new ArrayList<String>();
    HashMap<String, ArrayList<Integer>> removeFileKeys = new HashMap<String, ArrayList<Integer>>();
    for(String key: dirs.keySet()){
        if(isIgnore(ignores, key)){
            removeDirKeys.add(key);
        }
        else{
            for(String fileName: dirs.get(key)){
                if(isIgnore(ignores, fileName)){
                    if(removeFileKeys.containsKey(key)){
                        removeFileKeys.get(key).add(dirs.get(key).indexOf(fileName));
                    }
                    else{
                        ArrayList<Integer> tmp = new ArrayList<Integer>();
                        tmp.add(dirs.get(key).indexOf(fileName));
                        removeFileKeys.put(key, tmp);
                    }
                }
            }
        }
    }
    
    for(String key: removeDirKeys){
        dirs.remove(key);
    }
    
    for(String dirName: removeFileKeys.keySet()){
        ArrayList<String> tmpDirs = dirs.get(dirName);
        for(int key: removeFileKeys.get(dirName)){
            tmpDirs.remove(key);
        }
        dirs.replace(dirName, tmpDirs);
    }

    return dirs;
}

void addOvertone(AudioOutput out, float freq){
    out.addSignal(new SineWave(freq*2, 0.1f, out.sampleRate()));
    out.addSignal(new SineWave(freq*3, 0.08f, out.sampleRate()));
    //out.addSignal(new SineWave(freq*4, 0.03f, out.sampleRate()));
    //out.addSignal(new SineWave(freq*5, 0.01f, out.sampleRate()));
}
