//mvn exec:java -Dexec.mainClass="ga.ndss.DataRefining" -Dexec.args="192.168.8.101 hdfs cloudera default"
package ga.ndss;

import java.util.*;

public class DataRefining{
	public static void main(String args[]) throws Exception{
		HiveQuery hive = new HiveQuery(); 
		hive.connect(args[0],args[3],args[1],args[2]);
		ArrayList<String> attirebutes = new ArrayList<String>();
        attirebutes.add("url string");
        attirebutes.add("page string");
        attirebutes.add("enneagram int");
		hive.createTableQuery("pages",attirebutes);
		hive.refineDataAndSave();
	    hive.close();
	}
}
