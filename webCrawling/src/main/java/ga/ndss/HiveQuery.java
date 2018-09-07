package ga.ndss;

import java.io.*;
import java.util.*;
import java.sql.*;

public class HiveQuery {
    private String driverName = "org.apache.hive.jdbc.HiveDriver";
    private HashSet<String> scrapedPages = new HashSet<String>();
    private Connection con;    
    private Statement stmt;
    private Query query;
    private static String[] args;
    public static void setArgs(String[] mainArgs){
        args = mainArgs;
    }
    public void getScrapedPagesToSkip(String[] args) throws Exception {
        if(con==null || stmt==null){
            connect(args[2],args[3],args[4],args[5]);
            ArrayList<String> attirebutes = new ArrayList<String>();
            attirebutes.add("url string");
            attirebutes.add("page string");
            attirebutes.add("enneagram int");
            createTableQuery("pages",attirebutes);
            return;
        }
        ResultSet resultSet = stmt.executeQuery("select url from pages");
        if (resultSet.next()) {
            ResultSetMetaData metaData = resultSet.getMetaData();
            int numberOfColumns = metaData.getColumnCount();
            do {
                for (int i = 1; i <= numberOfColumns; i++) {                    
                    scrapedPages.add(resultSet.getObject(i)+"");
                }
            } while (resultSet.next());
        }
        close();
        con = null;
    }

    public void connect(String server, String database, String user, String password) throws Exception {
        Class.forName(driverName);
        // get connection
        con = DriverManager.getConnection("jdbc:hive2://"+server+":10000/"+database, user, password);
        // create statement
        stmt = con.createStatement();
        // Register driver and create driver instance
        System.out.println(server+"connected");
    }
    public void close() throws Exception {
        con.close();
    }

    public void createTableQuery(String table, ArrayList<String> attibutes) throws Exception {
        if(con==null || stmt==null){
            System.out.println("not connected");
            return;
        }
        stmt.execute("SET hive.auto.convert.join=false");
        stmt.execute("set hive.auto.convert.join.noconditionaltask=false");
        stmt.execute("create table if not exists "+table+" ("+String.join(",",attibutes)+")");
    }

    public void refineDataAndSave() throws Exception {
        if(con==null || stmt==null){
            System.out.println("not connected");
            return;
        }
        try {
            BufferedReader reader = new BufferedReader(new FileReader("../data/mapReduceQuery.txt"));
            BufferedWriter writer = new BufferedWriter(new FileWriter("../data/refineData.txt", false));
            String query = reader.readLine();
            String[] splitedQuery = query.split(" ");
            System.out.println(query);
            if(splitedQuery[0].equals("select")){
                ResultSet resultSet = stmt.executeQuery(query);
                if (resultSet.next()) {

                    ResultSetMetaData metaData = resultSet.getMetaData();
                    int numberOfColumns = metaData.getColumnCount();
                    // System.out.println("Database Records Listing");

/*                    for (int i = 1; i <= numberOfColumns; i++) {
                        System.out.print(metaData.getColumnLabel(i) + "\t");
                    }
                    System.out.println();*/
                    StringBuilder refineData = new StringBuilder();
                    do {
                        for (int i = 1; i <= numberOfColumns; i++) {
                            String result = resultSet.getObject(i)+"";
                            if(result.equals("null")){
                                result="0";
                            }
                            if(i==numberOfColumns){
                                refineData.append(result + "\n");
                            }
                            else{
                                refineData.append(result + ",");
                            }
                        }
                    } while (resultSet.next());
                    writer.write(refineData.toString());
                    writer.flush();

                } else {
                    System.out.println("No database records found");
                }
            }
            reader.close();
            writer.close();
        } catch (IOException e) {
            System.err.println(e);
            System.exit(1);
        }
    }

    public void insertQuery(String table,String url, String page, String enneagram, int batchsize) throws Exception {
        if(scrapedPages.contains(url)){
            return;
        }
        if(con==null || stmt==null){
            connect("192.168.8.101","default","hdfs","cloudera");
            ArrayList<String> attirebutes = new ArrayList<String>();
            attirebutes.add("url string");
            attirebutes.add("page string");
            attirebutes.add("enneagram int");
            createTableQuery("pages",attirebutes);
        }


        if(query == null){
            query = new Query(batchsize,table);
        }
        query.addQueryString(url,page,enneagram);
        if(query.getStacked() == batchsize){            
            stmt.execute(query.getQuery());
            query.reset(batchsize,table);
            con.close();
            con = null;
        }
    }
}

class Query{
    private int batchsize;
    private int stacked;
    private String table;
    private ArrayList<String> urls;
    private ArrayList<String> pages;
    private ArrayList<String> enneagrams;
    private StringBuilder queryString;
    public Query(int batchsize, String table){
        this.batchsize = batchsize;
        stacked = 0;
        this.table = table;
        urls = new ArrayList<String>();
        pages = new ArrayList<String>();
        enneagrams = new ArrayList<String>();
        queryString = new StringBuilder();
        queryString.append("insert into table "+table+" values ");
    }

    public void reset(int batchsize, String table){
        this.batchsize = batchsize;
        stacked = 0;
        this.table = table;
        urls = new ArrayList<String>();
        pages = new ArrayList<String>();
        enneagrams = new ArrayList<String>();
        queryString = new StringBuilder();
        queryString.append("insert into table "+table+" values ");
    }

    public void addQueryString(String url, String page, String enneagram){
        if(stacked>0){
            queryString.append(",");
        }
        queryString.append("('"+url+"','"+page+"',"+enneagram+")");
        stacked++;
    }

    public String getQuery(){
        String ret = queryString.toString();
        return ret;
    }
    public int getStacked(){
        return stacked;
    }
}
