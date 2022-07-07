class CodeVisualizer{
    //HashMap<String, ArrayList<String>> dirs;
    HashMap<String, HashMap<String, ArrayList<String>>> fileContents;
    HashMap<String, ArrayList<String>> nowFileContents;
    FileIO io;  
    StringBuilder sb;
    String nowDirName = "";
    int nowLineCount = 0;
    int fontsize = 0;
    int columns = 3;
    int maxTexts = 0;
    int maxLines = 0;

    CodeVisualizer(int fontsize){
        //dirs = new HashMap<String, ArrayList<String>>();
        fileContents = new HashMap<String, HashMap<String, ArrayList<String>>>();
        io = new FileIO();
        this.fontsize = fontsize;
    }

    public void draw(){
        drawTitle();

        int countFile = 0;
        columns = nowFileContents.size();

        maxLines = height / fontsize;
        maxTexts = (width / columns) / fontsize;

        for(String fileName: nowFileContents.keySet()){
            ArrayList<String> nowFile = nowFileContents.get(fileName);
            int otherBreakTimes = 0;

            for(int countLine = 0; countLine < nowFile.size(); countLine++){
                boolean isNowLine = countLine == nowLineCount;
                int fontColor = isNowLine ? red : white;
                String line = nowFile.get(countLine);
                int breakTimes = line.length() / maxTexts;

                int offset = nowLineCount >  maxLines - maxLines + 5 ? 
                    -1 * (nowLineCount -  (maxLines - maxLines + 5)) * fontsize : 0;
                
                for(int i = 0; i < breakTimes; i++){
                    sb = new StringBuilder(line);
                    sb.insert(maxTexts*(i+1), "\n" + "      ");
                    line = sb.toString();
                }

                float x = (width / columns) * countFile;
                float y = margin_m + fontsize + offset + (fontsize * countLine) + (fontsize * otherBreakTimes);
                
                if(y > margin_m){
                    if(isNowLine){
                        fill(lightBlack);
                        noStroke();
                        rect(x, y+fontsize*breakTimes, width/columns, -fontsize*(breakTimes+1));
                    }

                    drawFileName(fileName, countFile);

                    fill(fontColor);
                    textSize(fontsize);
                    textLeading(fontsize);
                    text(line, x, y);
                }
                
                otherBreakTimes += breakTimes;
            }
            countFile++;
        }
    }

    private void drawFileName(String filePath, int countFile){
        float x = (width / columns) * countFile;
        float y = margin_m - fontsize;
        String[] fileNameSp = filePath.split("/");
        String fileName = fileNameSp[fileNameSp.length-1];

        textSize(h3);
        fill(blue);
        text(fileName, x, y);
    }

    private void drawTitle(){
        textSize(h3);
        fill(red);
        text("new", 0, 70);

        textSize(h1);
        fill(blue);
        String title = "Sonifier";
        float titleSize = textWidth(title);
        text(title, 30, 70);

        fill(yellow);
        text("(", titleSize + 35, 70);

        textSize(h2);
        fill(white);
        String vars = "code="+code+", version=";
        float varsSize = textWidth(vars);
        text(vars, titleSize + 35 + 40, 70);
        fill(purple);
        text(version, titleSize + 35 + 40 + varsSize, 70);

        textSize(h1);
        fill(yellow);
        text(")", titleSize + 35 + 40 + 395, 70);
        fill(white);
        text(";", titleSize + 35 + 40 + 395 + 30, 70);
    }

    public void setDirs(HashMap<String, ArrayList<String>> dirs){
        for (String key : dirs.keySet()) {
            HashMap<String, ArrayList<String>> tmpContents = new HashMap<String, ArrayList<String>>();
            for(String fileName: dirs.get(key)){
                tmpContents.put(fileName, io.read(fileName));
            }
            fileContents.put(key, tmpContents);
        }
    }

    public void setNowDirName(String name){
        nowDirName = name;
        nowFileContents = fileContents.get(name);
    }

    public void setNowLineCount(int lineCount){
        nowLineCount = lineCount;
    }
}