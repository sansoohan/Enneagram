/*
args[0] = crawlStorageFolder
args[1] = numOfCrawler
args[2] = hiveServer2 IP
args[3] = hiveServer2 Database
args[4] = hiveServer2 ID
args[5] = hiveServer2 PASS
args[6] = domain(sendbox)
args[7] ~ args[...]= seed page
*/

//mvn exec:java -e -Dexec.mainClass="ga.ndss.BasicCrawlController" -Dexec.args="crawling 1 '192.168.8.101' 'default' 'hdfs' 'cloudera' 'http://192.168.9.9/' 'http://192.168.9.9/IT/Enneagram/pages/'"

package ga.ndss;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import edu.uci.ics.crawler4j.crawler.CrawlConfig;
import edu.uci.ics.crawler4j.crawler.CrawlController;
import edu.uci.ics.crawler4j.fetcher.PageFetcher;
import edu.uci.ics.crawler4j.robotstxt.RobotstxtConfig;
import edu.uci.ics.crawler4j.robotstxt.RobotstxtServer;
import edu.uci.ics.crawler4j.crawler.WebCrawler;
/**
 * @author Yasser Ganjisaffar
 */
public class BasicCrawlController {
    private static final Logger logger = LoggerFactory.getLogger(BasicCrawlController.class);
    public static <T extends WebCrawler> void main(String[] args) throws Exception {
        int numOfSeeds = args.length - 7;
        if(numOfSeeds <= 0){
            logger.info("args[0] = crawlStorageFolder");
            logger.info("args[1] = numOfCrawler");
            logger.info("args[2] = hiveServer2 IP");
            logger.info("args[3] = hiveServer2 Database");
            logger.info("args[4] = hiveServer2 ID");
            logger.info("args[5] = hiveServer2 PASS");
            logger.info("args[6] = domain(sendbox)");
            logger.info("args[7] ~ args[...]= seed page");
            return;
        }
    /*
     * crawlStorageFolder is a folder where intermediate crawl data is
     * stored.
     */
        String crawlStorageFolder = args[0];

    /*
     * numberOfCrawlers shows the number of concurrent threads that should
     * be initiated for crawling.
     */
        int numberOfCrawlers = Integer.parseInt(args[1]);

        CrawlConfig config = new CrawlConfig();

        config.setCrawlStorageFolder(crawlStorageFolder);

    /*
     * Be polite: Make sure that we don't send more than 1 request per
     * second (1000 milliseconds between requests).
     */
        config.setPolitenessDelay(1);

    /*
     * You can set the maximum crawl depth here. The default value is -1 for
     * unlimited depth
     */
        config.setMaxDepthOfCrawling(-1);

    /*
     * You can set the maximum number of pages to crawl. The default value
     * is -1 for unlimited number of pages
     */
        config.setMaxPagesToFetch(-1);

        /**
         * Do you want crawler4j to crawl also binary data ?
         * example: the contents of pdf, or the metadata of images etc
         */
        config.setIncludeBinaryContentInCrawling(false);

    /*
     * Do you need to set a proxy? If so, you can use:
     * config.setProxyHost("proxyserver.example.com");
     * config.setProxyPort(8080);
     *
     * If your proxy also needs authentication:
     * config.setProxyUsername(username); config.getProxyPassword(password);
     */

    /*
     * This config parameter can be used to set your crawl to be resumable
     * (meaning that you can resume the crawl from a previously
     * interrupted/crashed crawl). Note: if you enable resuming feature and
     * want to start a fresh crawl, you need to delete the contents of
     * rootFolder manually.
     */
        config.setResumableCrawling(false);



        config.setMaxOutgoingLinksToFollow(20000);
    /*
     * Instantiate the controller for this crawl.
     */
        PageFetcher pageFetcher = new PageFetcher(config);
        RobotstxtConfig robotstxtConfig = new RobotstxtConfig();
        RobotstxtServer robotstxtServer = new RobotstxtServer(robotstxtConfig, pageFetcher);
        CrawlController controller = new CrawlController(config, pageFetcher, robotstxtServer);
    /*
     * For each crawl, you need to add some seed urls. These are the first
     * URLs that are fetched and then the crawler starts following links
     * which are found in these pages
     */


        for(int i=0;i<numOfSeeds;i++){
            controller.addSeed(args[7+i]);
        }

    /*
     * Start the crawl. This is a blocking operation, meaning that your code
     * will reach the line after this only when crawling is finished.
     */

        BasicCrawler.setArgs(args);
        controller.start(BasicCrawler.class, numberOfCrawlers);
    }
}