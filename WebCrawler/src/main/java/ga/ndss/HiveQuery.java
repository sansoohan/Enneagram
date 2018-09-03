package ga.ndss;

import java.util.*;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveQuery {
    private String driverName = "org.apache.hive.jdbc.HiveDriver";
    private Connection con;
    private Statement stmt;
    private Query query;

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

    public void createTableQuery(String table, String url, String page, String enneagram) throws Exception {
        if(con==null || stmt==null){
            System.out.println("not connected");
            return;
        }
        stmt.execute("SET hive.auto.convert.join=false");
        stmt.execute("set hive.auto.convert.join.noconditionaltask=false");
        stmt.execute("create table if not exists "+table+" ("+url+" string, "+page+" string, "+enneagram+" int)");
    }

    public void insertQuery(String table,String url, String page, String enneagram, int batchsize) throws Exception {
        if(con==null || stmt==null){
            System.out.println("not connected");
            return;
        }
        if(query == null){
            query = new Query(batchsize,table);
        }
        query.addQueryString(url,page,enneagram);
        if(query.getStacked() == batchsize){            
            stmt.execute(query.getQuery());
            query.reset(batchsize,table);
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
