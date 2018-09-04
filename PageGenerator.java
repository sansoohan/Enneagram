import java.io.*;
import java.util.*;
import java.text.*;

public class PageGenerator {
	public static void main(String args[]) {
		generate();
	}
	public static WordData readWord(){
		WordData wd = new WordData();
		try {
			BufferedReader reader = new BufferedReader(new FileReader("words.txt"));
			String line;
			while ((line = reader.readLine()) != null) {
				String[] splitedLine = line.split(" ");
				wd.addWord(splitedLine[0]);
				wd.addType(Integer.parseInt(splitedLine[1]));
				wd.addRate(Double.parseDouble(splitedLine[2]));
			}
			reader.close();
	    } catch (IOException e) {
	        System.err.println(e);
	        System.exit(1);
	    }
	    return wd;
	}
	public static String generate(){
		BufferedWriter writer;
		DecimalFormat df = new DecimalFormat("00000");
		final int pageNum = 10000;
        try {
			File desti = new File("pages");
			if(!desti.exists()){
			    desti.mkdirs();
			}
			writer = new BufferedWriter(new FileWriter("pages/index.html",false));
			StringBuilder pageIntro = new StringBuilder();
			for(int i=0;i<pageNum;i++){
				pageIntro.append("<a href=\"page"+df.format(i)+".html\">page"+df.format(i)+"</a>");
			}
			writer.write(pageIntro.toString());
			writer.flush();
			writer.close();
			for(int i=0;i<pageNum;i++){
				WordData wd = readWord();
				String page = wd.makePage();
				writer = new BufferedWriter(new FileWriter("pages/page"+df.format(i)+".html",false));
				writer.write(page);
				writer.flush();
				writer.close();
			}	
        } catch (IOException e) {
	        System.err.println(e);
	        System.exit(1);
	    }
		return null;
	}
}

class WordData{
	private ArrayList<String> words = new ArrayList<String>();
	private ArrayList<Integer> types = new ArrayList<Integer>();
	private ArrayList<Double> rates = new ArrayList<Double>();
	private ArrayList<Double> terms = new ArrayList<Double>();
	private double rateSum = 0.0;
	private int enneagramNum;
	public WordData(){
		terms.add(0.0);
		enneagramNum = (int)(Math.random()*9)+1;
	}

	public String makePage(){
		double resetRate = 0.0;
		double minRate = 100000000.0;
		rateSum = 0.0;
		for(int j=0;j<getSize();j++){
			rateChangeByEnneagram(j);
			resetRate = getRate(j)*Math.random();
			setRate(j, resetRate);
			if(resetRate < minRate){
				minRate = resetRate;
			}
			rateSum += resetRate;
			terms.add(rateSum);
		}

		final int wordsNumPerPage=100000;
		StringBuilder page = new StringBuilder();
		for(int k=0;k<wordsNumPerPage;k++){
			if(k%20==0){
				page.append("<br> ");
			}
			page.append(getRandomWord()+" ");
		}
		page.append("<br>,"+enneagramNum);
		return page.toString();
	}
/*	word_type 				anneagram
	0 : anger 				: anneagram 8,9,1
	1 : shame				: anneagram 2,3,4
	2 : fear				: anneagram 5,6,7
	3 : active				: anneagram 3,7,8
	4 : passive				: anneagram 4,5,9
	5 : mood				: anneagram 1,2,6
	6 : negative/positive	: anneagram 7,9,2
	7 : trust/distrust		: anneagram 4,6,8
	8 : success/failure		: anneagram 1,3,5
*/				
	public void rateChangeByEnneagram(int index){
		int[] changeType = new int[3];
		switch(enneagramNum){
			case 1:
				changeType[0] = 0;
				changeType[1] = 5;
				changeType[2] = 8;
				break;
			case 2:
				changeType[0] = 1;
				changeType[1] = 5;
				changeType[2] = 6;
				break;
			case 3:
				changeType[0] = 1;
				changeType[1] = 3;
				changeType[2] = 8;
				break;
			case 4:
				changeType[0] = 1;
				changeType[1] = 4;
				changeType[2] = 7;
				break;
			case 5:
				changeType[0] = 2;
				changeType[1] = 4;
				changeType[2] = 8;
				break;
			case 6:
				changeType[0] = 2;
				changeType[1] = 5;
				changeType[2] = 7;
				break;
			case 7:
				changeType[0] = 3;
				changeType[1] = 4;
				changeType[2] = 6;
				break;
			case 8:
				changeType[0] = 0;
				changeType[1] = 3;
				changeType[2] = 7;
				break;
			case 9:
				changeType[0] = 0;
				changeType[1] = 4;
				changeType[2] = 6;
				break;
		}
		for(int i=0;i<changeType.length;i++){		
			if(types.get(index)==changeType[i]){
				rates.set(index,rates.get(index)*2);
			}
		}
	}

	public void addWord(String word){
		words.add(word);
	}
	public void addType(int type){
		types.add(type);
	}
	public void addRate(double rate){
		rates.add(rate);
	}
	public void addTerm(double rateSum){
		rates.add(rateSum);
	}

	public String getWord(int index){
		return words.get(index);
	}
	public int getType(int index){
		return types.get(index);
	}
	public double getRate(int index){
		return rates.get(index);
	}
	public String getRandomWord(){
		int index=0;
		double randValue = Math.random()*rateSum;
		for(int i=0;i<words.size();i++){
			if(terms.get(i)<randValue && randValue<=terms.get(i+1)){
				index = i;
			}
		}
		return words.get(index);
	}
	public int getEnneagramNum(){
		return enneagramNum;
	}

	public void setWord(int index, String word){
		words.set(index, word);
	}
	public void setType(int index, int type){
		types.set(index, type);
	}
	public void setRate(int index, double rate){
		rates.set(index, rate);
	}

	public int getSize(){
		return words.size();
	}
}