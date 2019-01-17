var express = require('express');
var port = Number(process.env.PORT || '3000');
var path = require('path');
var logger = require('morgan');
var index = require('./routes/index');
var firebase = require("firebase");
var app = express();

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));



// index page 
app.use('/', index);

// about page 
app.get('/views/about', function(req, res) {
    res.render('about');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });


//error handler
app.use(function(err, req, res, next) {
// render the error page
res.status(err.status || 500);
res.render('error', {status:err.status, message:err.message});
});
  
module.exports = app;


// require firebase-admin and firebase sdk
var admin = require("firebase-admin");
var serviceAccount = require("./newtest-ace1b-firebase-adminsdk-t4rq1-87f6ef350a");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newtest-ace1b.firebaseio.com"
});
var db = admin.database();

const puppeteer = require('puppeteer');


//index
// app.get('/', function(req, res){
//     res.render();
// })


//momo airpods
app.get('/momo/airpods', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        // const browser = await puppeteer.launch({headless:true, args: ['--no-sandbox', '--disable-setuid-sandbox']}); 
        const page = await browser.newPage();
        
        await page.goto('https://www.momoshop.com.tw/search/searchShop.jsp?keyword=airpods&searchType=1&curPage=1&_isFuzzy=0&showType=chessboardType');
        
        const result = await page.evaluate(() => {
            let title_data = [];
            let price_data = [];
            let titles  = document.querySelectorAll('.searchPrdListArea .listArea ul li .prdName'); 
                
                for (var element of titles){ 
                    let title = element.innerText; 
                    title_data.push({title}); 
            }
            let prices = document.querySelectorAll(".searchPrdListArea .listArea ul li .money .price");

                

                for (var element of prices) {
                    let price = element.innerText;
                    price = price.replace(',', '');
                    price = price.replace('$', '');
                    price_data.push({ price });
                }
            return {title_data,price_data}; 
        });

        browser.close();

        var products = new Array();
        for (r in result.title_data) {
            products.push({ title: result.title_data[r].title, price: result.price_data[r].price, website: "Momo" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/momo/airpods");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})


//momo iphone
app.get('/momo/iphone', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        // const browser = await puppeteer.launch({headless:true, args: ['--no-sandbox', '--disable-setuid-sandbox']}); 
        const page = await browser.newPage();
        
        await page.goto('https://www.momoshop.com.tw/search/searchShop.jsp?keyword=iphone&searchType=1&curPage=1&_isFuzzy=0&showType=chessboardType');
        
        const result = await page.evaluate(() => {
            let title_data = [];
            let price_data = [];
            let titles  = document.querySelectorAll('.searchPrdListArea .listArea ul li .prdName'); 
                
                for (var element of titles){ 
                    let title = element.innerText; 
                    title_data.push({title}); 
            }
            let prices = document.querySelectorAll(".searchPrdListArea .listArea ul li .money .price");

                for (var element of prices) {
                    let price = element.innerText;
                    price = price.replace(',', '');
                    price = price.replace('$', '');
                    price_data.push({ price });
                }
            return {title_data,price_data}; 
        });

        browser.close();

        var products = new Array();
        for (r in result.title_data) {
            products.push({ title: result.title_data[r].title, price: result.price_data[r].price, website: "Momo" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/momo/iphone");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})

//momo ps4
app.get('/momo/ps4', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        // const browser = await puppeteer.launch({headless:true, args: ['--no-sandbox', '--disable-setuid-sandbox']}); 
        const page = await browser.newPage();
        
        await page.goto('https://www.momoshop.com.tw/search/searchShop.jsp?keyword=ps4%20%E4%B8%BB%E6%A9%9F%20pro&searchType=1&curPage=1&_isFuzzy=0&showType=chessboardType');
        
        const result = await page.evaluate(() => {
            let title_data = [];
            let price_data = [];
            let titles  = document.querySelectorAll('.searchPrdListArea .listArea ul li .prdName'); 
                
                for (var element of titles){ 
                    let title = element.innerText; 
                    title_data.push({title}); 
            }
            let prices = document.querySelectorAll(".searchPrdListArea .listArea ul li .money .price");

                for (var element of prices) {
                    let price = element.innerText;
                    price = price.replace(',', '');
                    price = price.replace('$', '');
                    price_data.push({ price });
                }
            return {title_data,price_data}; 
        });

        browser.close();

        var products = new Array();
        for (r in result.title_data) {
            products.push({ title: result.title_data[r].title, price: result.price_data[r].price, website: "Momo" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/momo/ps4");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})


// friday airpods
app.get('/friday/airpods', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://shopping.friday.tw/ec2/search?sid=&hotNum=0&search=airpods');
        const result = await page.evaluate(() => {
    
            let title_data = [];
            let titles = document.querySelectorAll(".searchlist_area .prodname h3");
            for (var element of titles) {
                let text = element.title;
                title_data.push({ text });
            }
    
            let price_data = [];
            let prices = document.querySelectorAll(".searchlist_area .price-table span strong");
    
            for (var element of prices) {
                let text = element.innerText;
                text = text.replace(',', '');
                text = text.replace('$', '');
                price_data.push({ text });
            }
    
    
            return { title_data, price_data};
        
        });

        browser.close();
        var products = new Array();

        for (r in result.title_data) {
            products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "Friday" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/friday/airpods");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})

//friday iphone
app.get('/friday/iphone', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://shopping.friday.tw/ec2/search?sid=&hotNum=0&search=iphone');
        const result = await page.evaluate(() => {
    
            let title_data = [];
            let titles = document.querySelectorAll(".searchlist_area .prodname h3");
            for (var element of titles) {
                let text = element.title;
                title_data.push({ text });
            }
    
            let price_data = [];
            let prices = document.querySelectorAll(".searchlist_area .price-table span strong");
    
            for (var element of prices) {
                let text = element.innerText;
                text = text.replace(',', '');
                text = text.replace('$', '');
                price_data.push({ text });
            }
    
    
            return { title_data, price_data};
        
        });

        browser.close();
        var products = new Array();

        for (r in result.title_data) {
            products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "Friday" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/friday/iphone");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})


//friday ps4
app.get('/friday/ps4', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://shopping.friday.tw/ec2/search?sid=&hotNum=0&search=ps4%E4%B8%BB%E6%A9%9F');
        const result = await page.evaluate(() => {
    
            let title_data = [];
            let titles = document.querySelectorAll(".searchlist_area .prodname h3");
            for (var element of titles) {
                let text = element.title;
                title_data.push({ text });
            }
    
            let price_data = [];
            let prices = document.querySelectorAll(".searchlist_area .price-table span strong");
    
            for (var element of prices) {
                let text = element.innerText;
                text = text.replace(',', '');
                text = text.replace('$', '');
                price_data.push({ text });
            }
    
    
            return { title_data, price_data};
        
        });

        browser.close();
        var products = new Array();

        for (r in result.title_data) {
            products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "Friday" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/friday/ps4");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})


//myfone airpods
app.get('/myfone/airpods', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://search.myfone.com.tw/searchResult.php?sort_id=&keyword=airpods&source_id=1');

        const result = await page.evaluate(() => {
            let title_data = [];
            let titles = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .title");
            for (var element of titles) {
                let text = element.innerText;
                title_data.push({ text });
            }

            let price_data = [];
            let prices = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .price");

            for (var element of prices) {
                let text = element.innerText;
                text = text.replace(',', '');
                text = text.replace('$', '');
                price_data.push({ text });
            }


            return { title_data, price_data};
        });
        browser.close();
        var products = new Array();
        for (r in result.title_data) {
            products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "myfone" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/myfone/airpods");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})

//myfone iphone
app.get('/myfone/iphone', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://search.myfone.com.tw/searchResult.php?sort_id=&keyword=iphone&source_id=1');

        const result = await page.evaluate(() => {
            let title_data = [];
            let titles = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .title");
            for (var element of titles) {
                let text = element.innerText;
                title_data.push({ text });
            }

            let price_data = [];
            let prices = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .price");

            for (var element of prices) {
                let text = element.innerText;
                text = text.replace(',', '');
                text = text.replace('$', '');
                price_data.push({ text });
            }


            return { title_data, price_data};
        });
        browser.close();
        var products = new Array();

        for (r in result.title_data) {
            products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "myfone" });
        }
        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/myfone/iphone");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})

//myfone ps4
app.get('/myfone/ps4', function (req, res) {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://search.myfone.com.tw/searchResult.php?keyword=ps4%E4%B8%BB%E6%A9%9F&source_id=1&show_type=1&order_type=1&min_price=&max_price=&sort_id=ID_4726_12138_12141_22829');

        const result = await page.evaluate(() => {
            let title_data = [];
            let titles = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .title");
            for (var element of titles) {
                let text = element.innerText;
                title_data.push({ text });
            }

            let price_data = [];
            let prices = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .price");

            for (var element of prices) {
                let text = element.innerText;
                text = text.replace(',', '');
                text = text.replace('$', '');
                price_data.push({ text });
            }


            return { title_data, price_data};
        });
        browser.close();
        var products = new Array();
        for (r in result.title_data) {
            products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "myfone" });
        }

        return products;
    }

    scrape().then((value) => {
        var ref = db.ref("/myfone/ps4");
        ref.set(value);
            ref.once("value", function(snapshot) {
                console.log(snapshot.val());
            });
        res.send(value);
    });
})

//offer top 10 cheapest airpods infor
app.get('/airpodsTop10Cheapest', function (req, res){
    var products = new Array();

    var dataMomoAirpods = db.ref('/momo/airpods').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });

    var dataFridayAirpods = db.ref('/friday/airpods').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });

    var dataMyfoneAirpods = db.ref('/myfone/airpods').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });


    var temp;
    for(var i = 0; i < products.length; i++){
        for(var j = 0; j < products.length-1; j++){
            if(products[j].price > products[j+1].price){
                temp = products[j+1];
                products[j+1] = products[j];
                products[j] = temp;
            }
        }
    }

    for(var k = products.length; products.length-1 > 9 ; k--){
        products.pop();
    }

    res.send(products);
     
});

//offer top 10 cheapest iphone infor
app.get('/iphoneTop10Cheapest', function (req, res){
    var products = new Array();

    var dataMomoAirpods = db.ref('/momo/iphone').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });

    var dataFridayAirpods = db.ref('/friday/iphone').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });

    var dataMyfoneAirpods = db.ref('/myfone/iphone').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });


    var temp;
    for(var i = 0; i < products.length; i++){
        for(var j = 0; j < products.length-1; j++){
            if(products[j].price > products[j+1].price){
                temp = products[j+1];
                products[j+1] = products[j];
                products[j] = temp;
            }
        }
    }

    for(var k = products.length; products.length-1 > 9 ; k--){
        products.pop();
    }

    res.send(products);
      
});

//offer top 10 cheapest ps4 infor
app.get('/ps4Top10Cheapest', function (req, res){
    var products = new Array();

    var dataMomoAirpods = db.ref('/momo/ps4').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });

    var dataFridayAirpods = db.ref('/friday/ps4').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });

    var dataMyfoneAirpods = db.ref('/myfone/ps4').on('value', function(snapshot){
        var data = snapshot.val();

        for(var k = 0; k < data.length; k++){
            products.push({title: data[k].title, price: data[k].price, website: data[k].website});
        }

        for(var l = 0; l < products.length; l++){
            var obj = products[l];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
    });


    var temp;
    for(var i = 0; i < products.length; i++){
        for(var j = 0; j < products.length-1; j++){
            if(products[j].price > products[j+1].price){
                temp = products[j+1];
                products[j+1] = products[j];
                products[j] = temp;
            }
        }
    }

    for(var k = products.length; products.length-1 > 9 ; k--){
        products.pop();
    }

    res.send(products);
});

app.listen(port);