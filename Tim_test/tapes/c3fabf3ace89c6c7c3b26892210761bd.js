var path = require("path");

/**
 * GET /
 *
 * host: api.flickr.com
 * connection: keep-alive
 * upgrade-insecure-requests: 1
 * user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip, deflate, sdch, br
 * accept-language: de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4
 */

module.exports = function (req, res) {
  res.statusCode = 301;

  res.setHeader("date", "Sat, 20 May 2017 13:37:14 GMT");
  res.setHeader("content-type", "text/html; charset=UTF-8");
  res.setHeader("content-length", "20");
  res.setHeader("p3p", "policyref=\"https://policies.yahoo.com/w3c/p3p.xml\", CP=\"CAO DSP COR CUR ADM DEV TAI PSA PSD IVAi IVDi CONi TELo OTPi OUR DELi SAMi OTRi UNRi PUBi IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC GOV\"");
  res.setHeader("set-cookie", ["BX=1ktircdci0hka&b=3&s=sr; expires=Tue, 21-May-2019 13:37:14 GMT; path=/; domain=.flickr.com","xb=695665; expires=Tue, 21-May-2019 13:37:14 GMT; path=/; domain=.flickr.com"]);
  res.setHeader("location", "https://www.flickr.com/");
  res.setHeader("cache-control", "private");
  res.setHeader("x-served-by", "www-bm009.flickr.bf1.yahoo.com");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("vary", "Accept-Encoding");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("age", "0");
  res.setHeader("via", "http/1.1 fts114.flickr.bf1.yahoo.com (ApacheTrafficServer [cMsSf ]), http/1.1 e4.ycpi.deb.yahoo.com (ApacheTrafficServer [cMsSf ])");
  res.setHeader("server", "ATS");
  res.setHeader("connection", "keep-alive");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAwMAAAAAAAAAAAA=", "base64"));
  res.end();

  return __filename;
};
