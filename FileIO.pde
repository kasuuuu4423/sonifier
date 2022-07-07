class FileIO{
    public ArrayList<String> read(String path, boolean isRemoveReturn) {
        ArrayList<String> result = new ArrayList<String>();
        String[] lines = loadStrings(path);
        for (int i = 0 ; i < lines.length; i++) {
            String line = lines[i];
            if(isRemoveReturn){
                line.replace(System.lineSeparator(), "");
            }
            result.add(line);
        }
        return result;
    }

    public ArrayList<String> read(String path) {
        return this.read(path, false);
    }
}