
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter; 
 
public class WordGenerator {
    public static void main(String[] args) {
        String fileName = "./words.txt" ;
        String queryName = "./mapReduceQuery.txt" ;
        try{
            File file = new File(fileName) ;
            FileWriter fw = new FileWriter(file, false) ;
            fw.write(wordGenerator());
            fw.flush();

            File file = new File(queryName) ;
            FileWriter fw = new FileWriter(file, false) ;
            fw.write(queryGenerator());
            fw.flush();

            fw.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public static String wordGenerator(){
    	StringBuilder out = new StringBuilder();
    	int type = 0;
    	double rate = 0.0; 
    	for(char i='a';i<='z';i++){
    		for(char j='a';j<='z';j++){
    			type = (int)(Math.random()*9);
    			rate = Math.exp(Math.random()*5)-1;
    			out.append(String.valueOf(i) + String.valueOf(j) + " "+type+" "+rate+"\n");
    		}
    	}
    	return out.toString();
    }

    public static String queryGenerator(){
        StringBuilder out = new StringBuilder();
        out.append("select");
        for(char i='a';i<='z';i++){
            for(char j='a';j<='z';j++){
                String word = String.valueOf(i) + String.valueOf(j);
                out.append(" sum(t2.group_map['"+word+"']) as word_"+word+",");
            }
        }
        out.append(" enneagram from ( select url, enneagram, map(t1.word, t1.count) as group_map from ( select url, word, enneagram, count(1) as count from pages LATERAL VIEW explode(split(page, ' ')) `_words` AS word where word!='<br>' group by url, word, enneagram order by url ) t1 ) t2 group by t2.url, t2.enneagram");
        return out.toString();
    }
}