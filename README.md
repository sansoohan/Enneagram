Enneagram - BigData Project for Analyzing Natural Language
==========================================================

result
------
1. Crawl and scrap the web page and save it on hive database.
![hadoop](result/hadoop.png)

2. MapReduce all the page for refinining.
![mapreduce](result/mapreduce.png)

3. Refine data for maching learning.
![refining](result/refining.png)

4. Make a classification model using tensorflow.
![execution](result/execution.png)
![costGraph](result/costGraph.png)



webCrawling
----------
This is not only crawl but also scrap.<br>
It also has library for hive jdbc for saving web page.<br>
TestQ.java : Test Simple hive query.<br>
Query.java : It stack the page until the number of column user set.<br>
BasicCrawler.java : Make hive jdbc Connection and Table if not exists. And it config before query.<br>
HiveQuery.java : Run query here.<br>
DataRefining.java : Data Refining with mapReduceQuery.txt after the Crawling.

wordGenerating
--------------
WordGenerator.java<br>
It generate words like Natural Language.<br>
Generated words and attributes are saved on words.txt.<br>
It also make a long query on mapReduceQuery.txt. This query is used after finishing WebCrawling.

pageGenerating
--------------
PageGenerator.java<br>
It generate page using words.txt.<br>
It also generate a-tags that linked into each pages on index.html for crawling.

training
--------
It train the model with the data 'refineData.txt'<br>
It reached at 99 percent accuracy so that you can predict the character of the page using this.

nextReserch
-----------
I made word_list that assumed natural language.<br>
So i will try to make a real word_list from now on.

Contact
----------
name : SanSoo Han<br>
email : sansoo2002@naver.com<br>
phone : +82 10-8835-9229