//mvn exec:java -Dexec.mainClass="ga.ndss.TestQ" -Dexec.args="192.168.8.101 hdfs cloudera default"
package ga.ndss;

import java.util.*;

public class TestQ{
	public static void main(String args[]) throws Exception{
		HiveQuery hive = new HiveQuery(); 
		hive.connect(args[0],args[3],args[1],args[2]);
		ArrayList<String> attirebutes = new ArrayList<String>();
        attirebutes.add("url string");
        attirebutes.add("page string");
        attirebutes.add("enneagram int");
		hive.createTableQuery("pages",attirebutes);
	    hive.insertQuery("pages","page00001","something","1",2);
	    hive.insertQuery("pages","page00001","something","1",2);
	    hive.close();
	}
}
