Enneagram - BigData Project for Analyzing Natural Language
==========================================================

webCrawling
----------
This is not only crawl but also scrap.<br>
It also has library for hive jdbc for saving web page.<br>
TestQ.java : Test Simple hive query.<br>
Query.java : It stack the page until the number of column user set.<br>
BasicCrawler.java : Make hive jdbc Connection and Table if not exists. And it config before query.<br>
HiveQuery.java : Run query here.<br>
DataRefining.java : Data Refining with mapReduceQuery.txt after the Crawling.

WordGenerator.java
------------------
It generate words like Natural Language.<br>
Generated words and attributes are saved on words.txt.<br>
It also make a long query on mapReduceQuery.txt. This query is used after finishing WebCrawling.

PageGenerator.java
------------------
It generate page using words.txt.<br>
It also generate a-tags that linked into each pages on index.html for crawling.

Contact
----------
name : SanSoo Han<br>
email : sansoo2002@naver.com<br>
phone : +82 10-8835-9229